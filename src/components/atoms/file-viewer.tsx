"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  MdClose,
  MdFullscreen,
  MdFullscreenExit,
  MdVisibility,
} from "react-icons/md";
import { useEffect, useState } from "react";

import { AccessFileButton } from "./access-file-button";
import { Button } from "../ui/button";
import Image from "next/image";

type FileViewerProps = {
  fileName: string;
  title?: string;
  className?: string;
};

export function FileViewer({ fileName, title, className }: FileViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthenticatedUrl = async () => {
    if (!fileName || fileName.length < 20) {
      setError("Nome do arquivo inválido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/s3?action=download&fileName=${encodeURIComponent(fileName)}`,
      );

      if (!response.ok) {
        throw new Error(`Erro ao obter URL: ${response.statusText}`);
      }

      const { downloadUrl } = (await response.json()) as {
        downloadUrl: string;
      };

      if (!downloadUrl) {
        throw new Error("URL de download não foi retornada");
      }

      setDownloadUrl(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !downloadUrl) {
      void fetchAuthenticatedUrl();
    }
  }, [isOpen, downloadUrl]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Extrair extensão do arquivo, considerando URLs
  const fileNameParts = fileName.split("/");
  const lastPart = fileNameParts[fileNameParts.length - 1] || "";
  const fileExtension = lastPart.split(".").pop()?.toLowerCase();

  const isPdf = fileExtension === "pdf";
  const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
    fileExtension || "",
  );

  // Determinar se o arquivo pode ser visualizado
  const canPreview = isPdf || isImage;

  return (
    <>
      {canPreview ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className={className}
        >
          <MdVisibility className="mr-1 h-3 w-3" />
          Ver
        </Button>
      ) : (
        <AccessFileButton fileName={fileName}>
          <div className="flex items-center">
            <MdVisibility className="mr-1 h-3 w-3" />
            <span className="text-xs">Ver</span>
          </div>
        </AccessFileButton>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`max-w-4xl ${
            isFullscreen ? "h-screen w-screen max-w-none" : ""
          }`}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg">
              {title || `Visualizar ${fileName.split("/").pop()}`}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <MdFullscreenExit className="h-4 w-4" />
                ) : (
                  <MdFullscreen className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                <MdClose className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div
            className={`relative ${
              isFullscreen
                ? "h-[calc(100vh-120px)]"
                : "h-[calc(100vh-200px)] min-h-[400px]"
            }`}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <div className="text-center">
                  <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">
                    Carregando arquivo...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <div className="text-center">
                  <p className="text-sm text-destructive">{error}</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => void fetchAuthenticatedUrl()}
                    className="mt-2"
                  >
                    Tentar novamente
                  </Button>
                </div>
              </div>
            )}

            {downloadUrl && !loading && !error && (
              <>
                {isPdf && (
                  <iframe
                    src={downloadUrl}
                    className="h-full w-full rounded-md border"
                    title={title || "Visualizador de PDF"}
                  />
                )}
                {isImage && (
                  <div className="flex h-full items-center justify-center">
                    <Image
                      src={downloadUrl}
                      alt={title || "Imagem"}
                      className="max-h-full max-w-full rounded-md object-contain"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
