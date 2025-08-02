"use client";

import { Button } from "../ui/button";
import { MdVisibility } from "react-icons/md";

type EyeFileViewerProps = {
  fileName: string;
  title?: string;
  eye: "OD" | "OE";
  className?: string;
};

export function EyeFileViewer({
  fileName,
  eye,
  className,
}: EyeFileViewerProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className={className}
      onClick={() => {
        // Aqui você pode abrir o FileViewer ou fazer download
        // Por enquanto, vou usar o AccessFileButton logic
        const handleGenerateAndOpenUrl = async () => {
          if (!fileName || fileName.length < 5) {
            console.error("O nome do arquivo não foi fornecido.");
            return;
          }

          const newTab = window.open(
            "",
            "_blank",
            "location=yes,height=720,width=1280,scrollbars=yes,status=yes",
          );

          if (!newTab) {
            console.error("Não foi possível abrir uma nova aba.");
            return;
          }

          try {
            const response = await fetch(
              `/api/s3?action=download&fileName=${encodeURIComponent(fileName)}`,
            );

            if (!response.ok) {
              console.error(
                `Erro ao obter URL pré-assinada: ${response.statusText}`,
              );
              newTab.close();
              return;
            }

            const { downloadUrl } = (await response.json()) as {
              downloadUrl: string;
            };

            if (!downloadUrl) {
              console.error("URL de download não foi retornada pela API.");
              newTab.close();
              return;
            }

            newTab.location.href = downloadUrl;
          } catch (error) {
            console.error("Erro ao gerar ou acessar o arquivo:", error);
            newTab.close();
          }
        };

        void handleGenerateAndOpenUrl();
      }}
    >
      <MdVisibility className="mr-1 h-3 w-3" />
      <span className="text-xs">Ver {eye}</span>
    </Button>
  );
}
