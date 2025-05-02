import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-semibold text-primary">Carregando</p>
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
