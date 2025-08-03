import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Loader2, Search, UserPlus, Users } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

export default function SearchPatientLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero Section */}
      <div className="space-y-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Buscar Pacientes</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Encontre rapidamente os pacientes pelo número do prontuário ou nome
          completo
        </p>
      </div>

      {/* Search Form */}
      <Card className="border-0 bg-gradient-to-br from-background to-muted/20 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              placeholder="Digite o número do prontuário ou nome do paciente..."
              className="h-14 w-full border-2 bg-background/50 pl-12 pr-32 text-lg backdrop-blur-sm transition-all duration-200 focus:border-primary/50"
              disabled
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button className="h-10 px-6 font-medium" size="sm" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Resultados da busca
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (Carregando...)
            </span>
          </h2>
          <Button variant="outline" size="sm" className="gap-2" disabled>
            <UserPlus className="h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="border-0 bg-gradient-to-br from-background to-muted/10 shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="mb-1 h-3 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div>
                    <Skeleton className="mb-1 h-3 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 w-10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
