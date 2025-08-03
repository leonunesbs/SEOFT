import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Skeleton } from "~/components/ui/skeleton";

export default function PatientHistoryLoading() {
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
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Summary Cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Separator skeleton */}
      <Skeleton className="h-px w-full" />

      {/* Tabs skeleton */}
      <Tabs value="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <TabsTrigger key={i} value={`tab-${i}`} disabled>
              <Skeleton className="h-4 w-4" />
              <Skeleton className="ml-2 h-4 w-16" />
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Cards skeleton */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-32" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="w-18 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
