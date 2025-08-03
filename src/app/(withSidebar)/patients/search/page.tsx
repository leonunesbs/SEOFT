import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Search, Sparkles, UserPlus, Users } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Form from "next/form";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const searchSchema = z.object({
  search: z.string(),
});

export default async function SearchPatient({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q: queryString } = await searchParams;
  const patients = await api.patient.search(queryString as string);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
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
          <Form
            action={async (formData) => {
              "use server";
              const search = formData.get("search") as string;
              const { search: parsedSearch } = searchSchema.parse({ search });
              if (!parsedSearch) redirect("/patients/search");
              redirect(`/patients/search?q=${parsedSearch}`);
            }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                name="search"
                placeholder="Digite o número do prontuário ou nome do paciente..."
                className="h-14 w-full border-2 bg-background/50 pl-12 pr-32 text-lg backdrop-blur-sm transition-all duration-200 focus:border-primary/50"
                defaultValue={queryString}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button
                  type="submit"
                  className="h-10 px-6 font-medium"
                  size="sm"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {queryString && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Resultados da busca</h2>
              {patients.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {patients.length}{" "}
                  {patients.length === 1 ? "paciente" : "pacientes"}
                </Badge>
              )}
            </div>
            <Link href="/patients/add">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 sm:w-auto"
              >
                <UserPlus className="h-4 w-4" />
                Novo Paciente
              </Button>
            </Link>
          </div>

          {patients.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <Card className="border-2 border-dashed bg-muted/20">
              <CardContent className="p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">
                  Nenhum paciente encontrado
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Não encontramos pacientes com os termos pesquisados.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/patients/add">
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Adicionar Novo Paciente
                    </Button>
                  </Link>
                  <Button variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Tentar outra busca
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!queryString && (
        <Card className="border-2 border-dashed bg-muted/20">
          <CardContent className="p-12 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">Comece sua busca</h3>
            <p className="mb-6 text-muted-foreground">
              Digite o número do prontuário ou nome do paciente no campo acima
              para começar.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <strong>Dicas de busca:</strong>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Número do prontuário
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Nome completo
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Primeiro nome
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Sobrenome
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Patient Card Component
function PatientCard({
  patient,
}: {
  patient: { id: string; refId: string; name: string; birthDate: string };
}) {
  const age =
    new Date().getFullYear() - new Date(patient.birthDate).getFullYear();
  const birthDateFormatted = new Date(patient.birthDate).toLocaleDateString(
    "pt-BR",
    {
      timeZone: "UTC",
    },
  );

  return (
    <Card className="group border-0 bg-gradient-to-br from-background to-muted/10 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1 space-y-1">
            <CardTitle className="truncate text-lg font-semibold transition-colors group-hover:text-primary">
              {patient.name}
            </CardTitle>
            <CardDescription className="text-sm">
              Prontuário #{patient.refId}
            </CardDescription>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Ativo</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Idade
            </p>
            <p className="text-sm font-medium">{age} anos</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Nascimento
            </p>
            <p className="text-sm font-medium">{birthDateFormatted}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/patients/${patient.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              Ver Perfil
            </Button>
          </Link>
          <Link href={`/patients/${patient.id}/history`}>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 transition-colors group-hover:bg-muted"
            >
              <Users className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
