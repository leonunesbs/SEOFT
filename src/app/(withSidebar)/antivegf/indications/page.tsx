import { Calendar, Edit, Eye, Plus } from "lucide-react";
import {
  STATUS_COLORS,
  getStatusText,
  getSwalisColor,
  getSwalisText,
} from "~/lib/utils/antivegf";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "~/server/db";

// Componente para a tabela de indicações
async function IndicationsTable() {
  // Buscar indicações do banco de dados
  const indications = await db.intravitrealInjectionIndication.findMany({
    include: {
      patient: true,
      collaborator: true,
      clinic: true,
      injections: {
        orderBy: {
          scheduledDate: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-card dark:border-border/50 dark:bg-card/50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 dark:border-border/30">
                <TableHead className="text-foreground dark:text-foreground/90">
                  Paciente
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Data da Indicação
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Classificação SWALIS
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Status
                </TableHead>
                <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                  Clínica
                </TableHead>
                <TableHead className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                  Colaborador
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Injeções
                </TableHead>
                <TableHead className="text-right text-foreground dark:text-foreground/90">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indications.map((indication) => (
                <TableRow
                  key={indication.id}
                  className="border-border/30 hover:bg-muted/50 dark:border-border/20 dark:hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-foreground dark:text-foreground/90">
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {indication.patient.name}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">
                        Prontuário: {indication.patient.refId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground dark:text-foreground/90">
                    {new Date(indication.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getSwalisColor(indication.swalisClassification)} dark:border-border/50`}
                    >
                      {getSwalisText(indication.swalisClassification)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${STATUS_COLORS[indication.status as keyof typeof STATUS_COLORS]} dark:border-border/50`}
                    >
                      {getStatusText(indication.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                    {indication.clinic?.name}
                  </TableCell>
                  <TableCell className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {indication.collaborator.name}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">
                        {indication.collaborator.role}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground dark:text-foreground/90">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {indication.injections.length}
                      </span>
                      <Calendar className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                      >
                        <Link href={`/antivegf/indications/${indication.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Ver</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                      >
                        <Link
                          href={`/antivegf/indications/${indication.id}/edit`}
                        >
                          <Edit className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Editar</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Componente Loading para a tabela
function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-card dark:border-border/50 dark:bg-card/50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 dark:border-border/30">
                <TableHead className="text-foreground dark:text-foreground/90">
                  Paciente
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Data da Indicação
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Classificação SWALIS
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Status
                </TableHead>
                <TableHead className="hidden text-foreground dark:text-foreground/90 lg:table-cell">
                  Clínica
                </TableHead>
                <TableHead className="hidden text-foreground dark:text-foreground/90 md:table-cell">
                  Colaborador
                </TableHead>
                <TableHead className="text-foreground dark:text-foreground/90">
                  Injeções
                </TableHead>
                <TableHead className="text-right text-foreground dark:text-foreground/90">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow
                  key={i}
                  className="border-border/30 dark:border-border/20"
                >
                  <TableCell>
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                      <div className="h-3 w-24 animate-pulse rounded bg-muted/70 dark:bg-muted/30"></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="h-4 w-28 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-2">
                      <div className="h-4 w-24 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                      <div className="h-3 w-20 animate-pulse rounded bg-muted/70 dark:bg-muted/30"></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-12 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-16 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                      <div className="h-8 w-16 animate-pulse rounded bg-muted dark:bg-muted/50"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default function IndicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
            Indicações de Injeções Intravítreas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Gerencie todas as indicações de tratamento
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/antivegf/indications/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Indicação
          </Link>
        </Button>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <IndicationsTable />
      </Suspense>
    </div>
  );
}
