import { Card, CardContent, CardHeader } from "~/components/ui/card";

import { Skeleton } from "~/components/ui/skeleton";

interface AntivegfLoadingProps {
  variant?: "table" | "form" | "page";
  showNavigation?: boolean;
}

function TableLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FormLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PageLoadingSkeleton() {
  return (
    <>
      <TableLoadingSkeleton />
      <FormLoadingSkeleton />
    </>
  );
}

export function AntivegfLoading({
  variant = "page",
  showNavigation = true,
}: AntivegfLoadingProps) {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Navigation skeleton */}
      {showNavigation && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg border p-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded" />
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content skeleton */}
      {variant === "table" && <TableLoadingSkeleton />}
      {variant === "form" && <FormLoadingSkeleton />}
      {variant === "page" && <PageLoadingSkeleton />}
    </div>
  );
}
