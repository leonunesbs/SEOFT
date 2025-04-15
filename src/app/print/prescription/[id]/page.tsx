import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PDFDocument, StandardFonts } from "pdf-lib";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { MdOutlinePrint } from "react-icons/md";
import { db } from "~/server/db";

type Params = Promise<{ id: string }>;

// Função auxiliar para dividir um texto em linhas de acordo com a largura máxima
function splitTextIntoLines(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  words.forEach((word) => {
    const lineWithWord = currentLine ? `${currentLine} ${word}` : word;
    const lineWidth = font.widthOfTextAtSize(lineWithWord, fontSize);
    if (lineWidth < maxWidth) {
      currentLine = lineWithWord;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

// Função para preencher o template PDF com os dados da receita e um conjunto de itens opcional
async function fillPdfTemplateWithPrescription(
  prescription: any,
  modelPDFBytes: ArrayBuffer,
  doctorInfo?: { doctorName?: string; crm?: string },
  itemsOverride?: any[], // Se fornecido, usará este array em vez de prescription.prescriptionItems
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(modelPDFBytes);
  const page = pdfDoc.getPage(0);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  page.setFont(timesRomanFont);
  page.setFontSize(fontSize);

  // Define a área para escrita
  const maxWidth = 500;
  const textX = 50;
  let textY = 700;

  // Informações gerais da receita
  const introText = `Receita ID: ${prescription.id}
Criada em: ${new Date(prescription.createdAt).toLocaleString()}
Atualizada em: ${new Date(prescription.updatedAt).toLocaleString()}`;

  // Dados do paciente, se houver
  let patientText = "";
  if (prescription.evaluation && prescription.evaluation.patient) {
    const patient = prescription.evaluation.patient;
    patientText = `Paciente: ${patient.name || "N/A"}
Prontuário: ${patient.medicalRecord || "N/A"}`;
  }

  // Seleciona os itens – se houver uma sobreposição, usa-a; caso contrário, todos os itens
  const items = itemsOverride || prescription.prescriptionItems;

  // Detalhes dos itens da receita
  let itemsText = "Itens da Receita:\n";
  if (items && items.length > 0) {
    items.forEach((item: any) => {
      let itemText = `\nItem ID: ${item.id}\n`;
      if (item.medication) {
        itemText += `Medicamento: ${item.medication.name}\nCategoria: ${item.medication.category}\nUnidade: ${item.medication.unit}\n`;
        if (Array.isArray(item.medication.instructions)) {
          itemText += `Instruções: ${item.medication.instructions.join(", ")}\n`;
        }
        itemText += `Controle Especial: ${item.medication.specialControl ? "Sim" : "Não"}\nÉ Colírio: ${item.medication.eyedrop ? "Sim" : "Não"}\n`;
      } else {
        itemText += "Informações da medicação indisponíveis.\n";
      }
      if (item.selectedMedicationInstruction) {
        itemText += `Instrução Selecionada: ${item.selectedMedicationInstruction}\n`;
      }
      if (item.customInstruction) {
        itemText += `Instrução Personalizada: ${item.customInstruction}\n`;
      }
      if (item.quantity !== undefined && item.quantity !== null) {
        itemText += `Quantidade: ${item.quantity}\n`;
      }
      itemsText += itemText;
    });
  } else {
    itemsText += "Nenhum item na receita.\n";
  }

  // Concatena os textos e remove as quebras de linha para compatibilidade de codificação
  const fullText = introText + "\n\n" + patientText + "\n\n" + itemsText;
  const sanitizedText = fullText.replace(/\n/g, " ");

  // Quebra o texto em linhas para caber na área definida
  const lines = splitTextIntoLines(
    sanitizedText,
    timesRomanFont,
    fontSize,
    maxWidth,
  );
  for (const line of lines) {
    page.drawText(line, { x: textX, y: textY });
    textY -= fontSize + 4;
  }

  // Espaço para assinatura e demais informações
  textY -= 30;
  const pageWidth = page.getWidth();
  const signatureLine = "___________________________";
  const signatureLineWidth = timesRomanFont.widthOfTextAtSize(
    signatureLine,
    fontSize,
  );
  const signatureX = (pageWidth - signatureLineWidth) / 2;
  page.drawText(signatureLine, { x: signatureX, y: textY });

  if (doctorInfo?.doctorName) {
    textY -= 20;
    const doctorText = doctorInfo.doctorName.toUpperCase();
    const doctorTextWidth = timesRomanFont.widthOfTextAtSize(
      doctorText,
      fontSize,
    );
    const doctorX = (pageWidth - doctorTextWidth) / 2;
    page.drawText(doctorText, { x: doctorX, y: textY });
  }

  if (doctorInfo?.crm) {
    textY -= 20;
    const crmText = `CRM-CE: ${doctorInfo.crm.toUpperCase()}`;
    const crmTextWidth = timesRomanFont.widthOfTextAtSize(crmText, fontSize);
    const crmX = (pageWidth - crmTextWidth) / 2;
    page.drawText(crmText, { x: crmX, y: textY });
  }

  textY -= 20;
  const dateText = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateTextWidth = timesRomanFont.widthOfTextAtSize(dateText, fontSize);
  const dateX = (pageWidth - dateTextWidth) / 2;
  page.drawText(dateText, { x: dateX, y: textY });

  return await pdfDoc.save();
}

// Função para criar uma data URL a partir dos bytes do PDF
function createPdfDataUrl(pdfBytes: Uint8Array): string {
  const base64String = Buffer.from(pdfBytes).toString("base64");
  return `data:application/pdf;base64,${base64String}`;
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  // Busca a receita com avaliação e itens (incluindo os dados dos medicamentos)
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

  // Separa os itens especiais dos demais
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

  // Cria um novo documento PDF que reunirá as páginas
  const mergedPdfDoc = await PDFDocument.create();

  // Geração de página para itens simples (caso existam)
  if (simpleItems.length > 0) {
    const responseSimples = await fetch(
      "https://seoft.com.br/assets/simples.pdf",
    );
    if (!responseSimples.ok) {
      return <p>Erro ao carregar o template do PDF simples.</p>;
    }
    const simplesPDFBytes = await responseSimples.arrayBuffer();
    const pdfBytesSimples = await fillPdfTemplateWithPrescription(
      prescription,
      simplesPDFBytes,
      doctorInfo,
      simpleItems,
    );
    const pdfSimplesDoc = await PDFDocument.load(pdfBytesSimples);
    const [simplesPage] = await mergedPdfDoc.copyPages(pdfSimplesDoc, [0]);
    mergedPdfDoc.addPage(simplesPage);
  }

  // Geração de página para itens especiais (caso existam)
  if (specialItems.length > 0) {
    const responseEspecial = await fetch(
      "https://seoft.com.br/assets/especial.pdf",
    );
    if (!responseEspecial.ok) {
      return <p>Erro ao carregar o template do PDF especial.</p>;
    }
    const especialPDFBytes = await responseEspecial.arrayBuffer();
    const pdfBytesEspecial = await fillPdfTemplateWithPrescription(
      prescription,
      especialPDFBytes,
      doctorInfo,
      specialItems,
    );
    const pdfEspecialDoc = await PDFDocument.load(pdfBytesEspecial);
    const [especialPage] = await mergedPdfDoc.copyPages(pdfEspecialDoc, [0]);
    mergedPdfDoc.addPage(especialPage);
  }

  // Gera a URL do PDF consolidado
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
