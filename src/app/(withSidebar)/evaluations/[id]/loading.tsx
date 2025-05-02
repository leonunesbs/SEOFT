import { PageHeading } from "~/components/atoms/page-heading";
import { Skeleton } from "~/components/ui/skeleton";

export default function EvaluationLoading() {
  return (
    <div>
      <div className="flex justify-between">
        <PageHeading>Avaliação</PageHeading>
      </div>
      <div className="mt-6 space-y-8">
        {/* Patient Information Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>

        {/* Eyes Information Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Eye */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
            {/* Right Eye */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
