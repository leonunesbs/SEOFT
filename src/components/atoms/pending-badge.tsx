"use client";

import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react";
import { api } from "~/trpc/react";

export function PendingBadge({ collaboratorId }: { collaboratorId: string }) {
  const { data: pendingEvaluations, isLoading } =
    api.evaluation.pendingEvaluations.useQuery(collaboratorId, {
      refetchInterval: 60000, // Refresh every 60 seconds
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    });

  return isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin" /> // Placeholder while loading
  ) : (
    <Badge
      variant={
        pendingEvaluations
          ? pendingEvaluations > 0
            ? "default"
            : "outline"
          : "outline"
      }
      className="flex size-4 justify-center px-0 text-center"
    >
      {pendingEvaluations}
    </Badge>
  );
}
