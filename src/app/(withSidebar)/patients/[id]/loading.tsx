import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Skeleton } from "~/components/ui/skeleton";

export default function PatientLoading() {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>
              <Skeleton className="h-8 w-8 rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Botões skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-20" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Formulário skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
