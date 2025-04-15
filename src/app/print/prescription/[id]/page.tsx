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
 * Preenche um template PDF SIMPLES com os dados da receita.
 * Usa os prescription items passados em itemsOverride e exibe,
 * além dos dados do paciente, também o cabeçalho de uso (USO INTERNO ou USO EXTERNO)
 * e as informações do médico, CRM e data.
 */
async function fillPdfTemplateWithPrescription(
  prescription: any,
  modelPDFBytes: ArrayBuffer,
  doctorInfo?: { doctorName?: string; crm?: string },
  itemsOverride?: any[],
  categoryHeader?: string,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(modelPDFBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  const page = pdfDoc.getPage(0);
  page.setFont(timesRomanFont);
  page.setFontSize(fontSize);

  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  const leftMargin = 50;
  const rightMargin = 50;
  const usableWidth = pageWidth - leftMargin - rightMargin;

  let textY = pageHeight - 120;

  // Cabeçalho: Exibe "Paciente: <nome do paciente>"
  const patientName = prescription.evaluation?.patient?.name || "N/A";
  page.drawText(`Paciente: ${patientName}`, {
    x: leftMargin,
    y: textY,
    size: fontSize,
  });
  textY -= fontSize + 15;

  // Cabeçalho de uso: Se categoryHeader for passado, usa-o; senão, deriva do primeiro item.
  let usageHeaderText = "";
  if (categoryHeader) {
    usageHeaderText = categoryHeader;
  } else if (
    itemsOverride &&
    itemsOverride.length > 0 &&
    itemsOverride[0].medication
  ) {
    usageHeaderText = itemsOverride[0].medication.external
      ? "USO EXTERNO"
      : "USO INTERNO";
  } else {
    usageHeaderText = "USO EXTERNO";
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

  // Lista de Items – Cada item ocupa 2 linhas (nome + traços/quantidade; e instrução)
  itemsOverride?.forEach((item: any, index: number) => {
    const medicationName = item.medication?.name || "Medicamento não informado";
    const quantityVal = item.quantity ?? 1;
    const quantityText =
      quantityVal === 0
        ? "Uso contínuo"
        : `${quantityVal} ${item.medication?.unit}${quantityVal > 1 ? "s" : ""}`.toLocaleUpperCase();
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

  // Rodapé: Exibe assinatura, dados do médico, CRM e data
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
 * Preenche o template PDF ESPECIAL com dados da receita.
 * – Não exibe informações do médico, apenas a data no rodapé.
 * – Exibe “Paciente: <nomePaciente>” na mesma linha.
 * – Exibe “Prescrição: USO EXTERNO/USO INTERNO” em outra linha.
 * – Lista as medicações logo abaixo, em duas vias (lado a lado).
 */
async function fillPdfTemplateWithPrescriptionEspecial(
  prescription: any,
  modelPDFBytes: ArrayBuffer,
  itemsOverride?: any[],
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(modelPDFBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  const page = pdfDoc.getPage(0);
  page.setFont(timesRomanFont);
  page.setFontSize(fontSize);

  // Dividimos a página em duas colunas para representar as duas vias
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  const halfWidth = pageWidth / 2;

  // Defina as margens e coordenadas para cada coluna (ajuste conforme seu layout)
  const leftMargin = 40;
  const rightMargin = 30;
  const leftColumnX = leftMargin;
  const rightColumnX = halfWidth + rightMargin;

  let textYLeft = pageHeight - 264;
  let textYRight = pageHeight - 264;

  // 1) Exibe “Paciente: <nomePaciente>” na mesma linha em ambas as vias
  const patientName = prescription.evaluation?.patient?.name || "N/A";
  const patientLine = `             ${patientName}`;
  page.drawText(patientLine, {
    x: leftColumnX,
    y: textYLeft,
    size: fontSize,
  });
  page.drawText(patientLine, {
    x: rightColumnX,
    y: textYRight,
    size: fontSize,
  });
  textYLeft -= 2 * (fontSize + 10);
  textYRight -= 2 * (fontSize + 10);

  // 2) Exibe “Prescrição: USO EXTERNO/USO INTERNO”
  let usage = "USO EXTERNO";
  if (itemsOverride && itemsOverride.length > 0) {
    usage = itemsOverride[0].medication?.external
      ? "USO EXTERNO"
      : "USO INTERNO";
  }
  const dateText = new Date().toLocaleDateString("pt-BR", {
    dateStyle: "short",
  });
  const prescricaoLine = `                    ${usage}                      ${dateText}`;
  page.drawText(prescricaoLine, {
    x: leftColumnX,
    y: textYLeft,
    size: fontSize,
  });
  page.drawText(prescricaoLine, {
    x: rightColumnX,
    y: textYRight,
    size: fontSize,
  });
  textYLeft -= fontSize + 10;
  textYRight -= fontSize + 10;

  // 3) Lista de medicações – cada item é impresso em ambas as vias
  itemsOverride?.forEach((item: any, index: number) => {
    const medicationName = item.medication?.name || "Medicamento não informado";
    const quantityVal = item.quantity ?? 1;
    const quantityText =
      quantityVal === 0
        ? "Uso contínuo"
        : `${quantityVal} ${item.medication?.unit}${quantityVal > 1 ? "s" : ""}`.toLocaleUpperCase();
    const instructionText =
      item.selectedMedicationInstruction ||
      item.customInstruction ||
      "Instrução não informada";
    const itemLine = `${index + 1}) ${medicationName} - ${quantityText}`;

    // Coluna esquerda (1ª via)
    page.drawText(itemLine, {
      x: leftColumnX,
      y: textYLeft,
      size: fontSize,
    });
    textYLeft -= fontSize + 10;
    page.drawText(`  ${instructionText}`, {
      x: leftColumnX,
      y: textYLeft,
      size: fontSize,
    });
    textYLeft -= fontSize + 10;

    // Coluna direita (2ª via)
    page.drawText(itemLine, {
      x: rightColumnX,
      y: textYRight,
      size: fontSize,
    });
    textYRight -= fontSize + 10;
    page.drawText(`  ${instructionText}`, {
      x: rightColumnX,
      y: textYRight,
      size: fontSize,
    });
    textYRight -= fontSize + 10;
  });

  // // 4) Apenas a data no rodapé (sem dados do médico)
  // textYLeft -= 40;
  // textYRight -= 40;
  // const dateText = new Date().toLocaleDateString("pt-BR", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });
  // page.drawText(`Data: ${dateText}`, {
  //   x: leftColumnX,
  //   y: textYLeft,
  //   size: fontSize,
  // });
  // page.drawText(`Data: ${dateText}`, {
  //   x: rightColumnX,
  //   y: textYRight,
  //   size: fontSize,
  // });

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

  // Busca a receita com avaliação e os prescription items (incluindo os dados dos medicamentos)
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

  // Separa as medicações simples em duas categorias: internas e externas
  const internalItems = simpleItems.filter(
    (item: any) => item.medication && !item.medication.external,
  );
  const externalItems = simpleItems.filter(
    (item: any) => item.medication && item.medication.external,
  );

  // Obter dados do médico para o SIMPLES (se necessário)
  const collaborator = await db.collaborator.findUnique({
    where: { id: prescription.evaluation.collaboratorId },
  });
  const doctorInfo = collaborator
    ? { doctorName: collaborator.name, crm: collaborator.crm }
    : undefined;

  // Cria o documento PDF final
  const mergedPdfDoc = await PDFDocument.create();

  // --- Receituário SIMPLES (interno) ---
  if (internalItems.length > 0) {
    const internalGroups = chunkArray(internalItems, 5);
    for (const group of internalGroups) {
      const responseSimples = await fetch(
        "https://seoft.com.br/assets/simples.pdf",
      );
      if (!responseSimples.ok) {
        return <p>Erro ao carregar o template do PDF simples.</p>;
      }
      const templateBytes = await responseSimples.arrayBuffer();
      const filledPdfBytes = await fillPdfTemplateWithPrescription(
        prescription,
        templateBytes,
        doctorInfo,
        group,
        "USO INTERNO",
      );
      const pdfSimplesDoc = await PDFDocument.load(filledPdfBytes);
      const [page] = await mergedPdfDoc.copyPages(pdfSimplesDoc, [0]);
      mergedPdfDoc.addPage(page);
    }
  }

  // --- Receituário SIMPLES (externo) ---
  if (externalItems.length > 0) {
    const externalGroups = chunkArray(externalItems, 5);
    for (const group of externalGroups) {
      const responseSimples = await fetch(
        "https://seoft.com.br/assets/simples.pdf",
      );
      if (!responseSimples.ok) {
        return <p>Erro ao carregar o template do PDF simples.</p>;
      }
      const templateBytes = await responseSimples.arrayBuffer();
      const filledPdfBytes = await fillPdfTemplateWithPrescription(
        prescription,
        templateBytes,
        doctorInfo,
        group,
        "USO EXTERNO",
      );
      const pdfSimplesDoc = await PDFDocument.load(filledPdfBytes);
      const [page] = await mergedPdfDoc.copyPages(pdfSimplesDoc, [0]);
      mergedPdfDoc.addPage(page);
    }
  }

  // --- Receituário ESPECIAL (ex: 3 itens por página) ---
  if (specialItems.length > 0) {
    const specialGroups = chunkArray(specialItems, 2);
    for (const group of specialGroups) {
      const responseEspecial = await fetch(
        "https://seoft.com.br/assets/especial.pdf",
      );
      if (!responseEspecial.ok) {
        return <p>Erro ao carregar o template do PDF especial.</p>;
      }
      const templateBytes = await responseEspecial.arrayBuffer();
      // Preenche o template ESPECIAL (sem dados do médico, somente data)
      const filledPdfBytes = await fillPdfTemplateWithPrescriptionEspecial(
        prescription,
        templateBytes,
        group,
      );
      const pdfEspecialDoc = await PDFDocument.load(filledPdfBytes);
      const [page] = await mergedPdfDoc.copyPages(pdfEspecialDoc, [0]);
      mergedPdfDoc.addPage(page);
    }
  }

  const finalBytes = await mergedPdfDoc.save();
  const mergedPdfDataUrl = createPdfDataUrl(finalBytes);

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
            className="min-h-[600px] w-full rounded-md border"
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
