import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PDFDocument, StandardFonts } from "pdf-lib";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { MdOutlinePrint } from "react-icons/md";
import { db } from "~/server/db";

type Params = Promise<{ id: string }>;

/**
 * Função auxiliar que divide um array em grupos de tamanho máximo "size"
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Preenche um template PDF (modelo) com os dados da receita.
 * Espera que os prescription items a serem impressos estejam em itemsOverride.
 * Essa função usa o template fornecido (ex: /assets/simples.pdf ou /assets/especial.pdf)
 * e retorna o PDF preenchido (geralmente com 1 página).
 */
async function fillPdfTemplateWithPrescription(
  prescription: any,
  modelPDFBytes: ArrayBuffer,
  doctorInfo?: { doctorName?: string; crm?: string },
  itemsOverride?: any[],
): Promise<Uint8Array> {
  // Carrega o template PDF
  const pdfDoc = await PDFDocument.load(modelPDFBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  // Usaremos somente a primeira página do template para desenhar as informações
  const page = pdfDoc.getPage(0);
  page.setFont(timesRomanFont);
  page.setFontSize(fontSize);

  // Define dimensões e margens (obtidas do template)
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  const leftMargin = 50;
  const rightMargin = 50;
  const usableWidth = pageWidth - leftMargin - rightMargin;

  // Posição vertical inicial (ajuste conforme o layout do template)
  let textY = pageHeight - 120;

  // Cabeçalho: Dados do paciente
  const patientName = prescription.evaluation?.patient?.name || "N/A";
  page.drawText(`Paciente: ${patientName}`, {
    x: leftMargin,
    y: textY,
    size: fontSize,
  });
  textY -= fontSize + 15;

  // Cabeçalho de uso:
  // Aqui definimos se é "USO EXTERNO" ou "USO INTERNO" com base no primeiro item do grupo
  let usageHeaderText = "USO EXTERNO"; // Valor padrão
  if (
    itemsOverride &&
    itemsOverride.length > 0 &&
    itemsOverride[0].medication
  ) {
    usageHeaderText = itemsOverride[0].medication.eyedrop
      ? "USO EXTERNO"
      : "USO INTERNO";
  }
  const usageHeaderWidth = timesRomanFont.widthOfTextAtSize(
    usageHeaderText,
    fontSize,
  );
  page.drawText(usageHeaderText, {
    x: (pageWidth - usageHeaderWidth) / 2,
    y: textY,
    size: fontSize,
  });
  textY -= fontSize + 10;

  // Lista de Items (cada item ocupa 2 linhas)
  // Usa os items passados (itemsOverride) que já são o grupo para essa página
  itemsOverride?.forEach((item: any, index: number) => {
    // Linha 1: "X) NomeDoMedicamento [----] Quantidade"
    const medicationName = item.medication?.name || "Medicamento não informado";
    // Se a quantidade for 0, exibe "Uso contínuo"
    const quantityVal = item.quantity ?? 1;
    const quantityText =
      quantityVal === 0
        ? "Uso contínuo"
        : `${quantityVal} ${item.medication?.unit}${quantityVal > 1 ? "s" : ""}`.toLocaleUpperCase();

    // Usa o índice global (caso seja necessário; aqui a numeração é relativa à página)
    const itemIndexAndName = `${index + 1}) ${medicationName}`;
    page.drawText(itemIndexAndName, {
      x: leftMargin,
      y: textY,
      size: fontSize,
    });

    const itemIndexAndNameWidth = timesRomanFont.widthOfTextAtSize(
      itemIndexAndName,
      fontSize,
    );
    const quantityTextWidth = timesRomanFont.widthOfTextAtSize(
      quantityText,
      fontSize,
    );
    const quantityX = leftMargin + usableWidth - quantityTextWidth;
    const dashStartX = leftMargin + itemIndexAndNameWidth;
    let dashSpaceWidth = quantityX - dashStartX;
    if (dashSpaceWidth < 0) dashSpaceWidth = 0;
    const dashOneWidth = timesRomanFont.widthOfTextAtSize("-", fontSize);
    const dashCount = Math.floor(dashSpaceWidth / dashOneWidth);
    const dashString = "-".repeat(dashCount);

    // Desenha os traços e o quantityText
    page.drawText(dashString, {
      x: dashStartX,
      y: textY,
      size: fontSize,
    });
    page.drawText(quantityText, {
      x: quantityX,
      y: textY,
      size: fontSize,
    });
    textY -= fontSize + 6;

    // Linha 2: Instrução (com recuo)
    const instructionText =
      item.selectedMedicationInstruction ||
      item.customInstruction ||
      "Instrução não informada";
    page.drawText(instructionText, {
      x: leftMargin + 20,
      y: textY,
      size: fontSize,
    });
    textY -= fontSize + 10;
  });

  // Rodapé: Assinatura, dados do médico, CRM e data
  textY -= 40;
  const signatureLine = "___________________________";
  const signatureLineWidth = timesRomanFont.widthOfTextAtSize(
    signatureLine,
    fontSize,
  );
  const signatureX = (pageWidth - signatureLineWidth) / 2;
  page.drawText(signatureLine, { x: signatureX, y: textY, size: fontSize });

  if (doctorInfo?.doctorName) {
    textY -= 20;
    const doctorText = doctorInfo.doctorName.toUpperCase();
    const doctorTextWidth = timesRomanFont.widthOfTextAtSize(
      doctorText,
      fontSize,
    );
    const doctorX = (pageWidth - doctorTextWidth) / 2;
    page.drawText(doctorText, { x: doctorX, y: textY, size: fontSize });
  }

  if (doctorInfo?.crm) {
    textY -= 20;
    const crmText = `CRM-CE: ${doctorInfo.crm.toUpperCase()}`;
    const crmTextWidth = timesRomanFont.widthOfTextAtSize(crmText, fontSize);
    const crmX = (pageWidth - crmTextWidth) / 2;
    page.drawText(crmText, { x: crmX, y: textY, size: fontSize });
  }

  textY -= 20;
  const dateText = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateTextWidth = timesRomanFont.widthOfTextAtSize(dateText, fontSize);
  const dateX = (pageWidth - dateTextWidth) / 2;
  page.drawText(dateText, { x: dateX, y: textY, size: fontSize });

  return await pdfDoc.save();
}

/**
 * Cria uma data URL a partir dos bytes do PDF.
 */
function createPdfDataUrl(pdfBytes: Uint8Array): string {
  const base64String = Buffer.from(pdfBytes).toString("base64");
  return `data:application/pdf;base64,${base64String}`;
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  // Busca a receita, incluindo a avaliação e os prescription items (com dados dos medicamentos)
  const prescription = await db.prescription.findUnique({
    where: { id },
    include: {
      evaluation: { include: { patient: true } },
      prescriptionItems: { include: { medication: true } },
    },
  });

  if (!prescription) {
    return <p>Receita não encontrada.</p>;
  }

  // Separa os items especiais dos simples
  const specialItems = prescription.prescriptionItems.filter(
    (item: any) => item.medication && item.medication.specialControl,
  );
  const simpleItems = prescription.prescriptionItems.filter(
    (item: any) => !item.medication?.specialControl,
  );

  if (!simpleItems.length && !specialItems.length) {
    return <p>Sem medicações para exibir.</p>;
  }

  const collaborator = await db.collaborator.findUnique({
    where: { id: prescription.evaluation.collaboratorId },
  });
  if (!collaborator) {
    return <p>Colaborador não encontrado.</p>;
  }

  const doctorInfo = {
    doctorName: collaborator.name,
    crm: collaborator.crm,
  };

  // Cria o documento PDF final que reunirá as páginas dos templates simples e especiais
  const mergedPdfDoc = await PDFDocument.create();

  // --- Processa os simples ---
  if (simpleItems.length > 0) {
    // Divide os simpleItems em grupos de até 5
    const simpleGroups = chunkArray(simpleItems, 5);
    // Para cada grupo, faz uma request ao modelo e preenche os dados
    for (const group of simpleGroups) {
      const responseSimples = await fetch(
        "https://seoft.com.br/assets/simples.pdf",
      );
      if (!responseSimples.ok) {
        return <p>Erro ao carregar o template do PDF simples.</p>;
      }
      const simplesPDFBytes = await responseSimples.arrayBuffer();
      const filledPdfBytes = await fillPdfTemplateWithPrescription(
        prescription,
        simplesPDFBytes,
        doctorInfo,
        group,
      );
      const pdfSimplesDoc = await PDFDocument.load(filledPdfBytes);
      const [page] = await mergedPdfDoc.copyPages(pdfSimplesDoc, [0]);
      mergedPdfDoc.addPage(page);
    }
  }

  // --- Processa os especiais (sem agrupamento) ---
  if (specialItems.length > 0) {
    const responseEspecial = await fetch(
      "https://seoft.com.br/assets/especial.pdf",
    );
    if (!responseEspecial.ok) {
      return <p>Erro ao carregar o template do PDF especial.</p>;
    }
    const especialPDFBytes = await responseEspecial.arrayBuffer();
    const filledPdfBytes = await fillPdfTemplateWithPrescription(
      prescription,
      especialPDFBytes,
      doctorInfo,
      specialItems,
    );
    const pdfEspecialDoc = await PDFDocument.load(filledPdfBytes);
    const [page] = await mergedPdfDoc.copyPages(pdfEspecialDoc, [0]);
    mergedPdfDoc.addPage(page);
  }

  // Gera a URL do PDF final consolidado
  const mergedPdfBytes = await mergedPdfDoc.save();
  const mergedPdfDataUrl = createPdfDataUrl(mergedPdfBytes);

  return (
    <div className="flex flex-col items-center space-y-4 py-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-end">
            <Link
              href={mergedPdfDataUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <MdOutlinePrint size={18} />
                Imprimir
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <iframe
            src={mergedPdfDataUrl}
            title="PDF Preview"
            className="h-[600px] w-full rounded-md border"
          />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informações Gerais da Receita</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Prontuário:</strong> {prescription.evaluation.patient.refId}
          </p>
          <p>
            <strong>Criada em:</strong>{" "}
            {new Date(prescription.createdAt).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
