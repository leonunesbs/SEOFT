import {
  Activity,
  ArrowLeft,
  Calendar,
  Eye,
  FileText,
  Pill,
  Stethoscope,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { EvaluationHistoryList } from "~/components/organisms/evaluation-history-list";
import { HistoryStats } from "~/components/molecules/history-stats";
import Link from "next/link";
import { PageHeading } from "~/components/atoms/page-heading";
import { Separator } from "~/components/ui/separator";
import { TonometryChart } from "~/components/molecules/tonometry-chart";
import { api } from "~/trpc/server";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Mapeamento de acuidade visual para valores numéricos para comparação
const visualAcuityValues: { [key: string]: number } = {
  ">20/20": 24,
  "20/20": 23,
  "20/25": 22,
  "20/30": 21,
  "20/40": 20,
  "20/50": 19,
  "20/60": 18,
  "20/70": 17,
  "20/80": 16,
  "20/100": 15,
  "20/200": 14,
  "20/400": 13,
  "20/800": 12,
  "CD 4m": 11,
  "CD 3m": 10,
  "CD 2m": 9,
  "CD 1m": 8,
  "CD 0,5m": 7,
  "CD 30cm": 6,
  "CD 15cm": 5,
  "CD FF": 4,
  MM: 3,
  PL: 2,
  "PL fraco": 1,
  "PL duvidoso": 0,
  SPL: 0,
};

// Função para determinar a melhor refração com base na acuidade visual
const getBestRefraction = (refractions: any[]) => {
  return refractions.reduce((best, current) => {
    if (!current.visualAcuity) return best;

    const currentValue = visualAcuityValues[current.visualAcuity];
    if (currentValue === undefined) return best;

    if (!best || !best.visualAcuity) return current;

    const bestValue = visualAcuityValues[best.visualAcuity];
    if (bestValue === undefined) return current;

    // Maior valor numérico = melhor acuidade visual
    return currentValue > bestValue ? current : best;
  }, null);
};

// Função para gerar iniciais do nome
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Função para formatar data
function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

export default async function PatientHistoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const tabParam = (await searchParams).tab;
  const currentTab =
    typeof tabParam === "string"
      ? tabParam
      : Array.isArray(tabParam) && tabParam.length > 0
        ? tabParam[0]
        : "overview";

  const patient = await api.patient.getEvaluationHistory(id);

  if (!patient) {
    return (
      <div className="text-center text-lg text-gray-500">
        Patient not found.
      </div>
    );
  }

  const totalEvaluations = patient.evaluations.length;
  const lastEvaluationDate = patient.evaluations[0]?.createdAt || null;
  const lastEvaluationClinic = patient.evaluations[0]?.clinic?.name || "N/A";
  const initials = getInitials(patient.name);

  return (
    <div className="space-y-6">
      {/* Header com informações do paciente */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <PageHeading className="text-2xl">
              Histórico do Paciente
            </PageHeading>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{patient.name}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span>{totalEvaluations} avaliações</span>
              </div>
              {lastEvaluationDate && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Última: {formatDate(lastEvaluationDate)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline">
                  <Link href={`/patients/${patient.id}`}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Voltar</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voltar para detalhes do paciente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Estatísticas do histórico */}
      <HistoryStats
        patient={patient}
        stats={{
          totalEvaluations,
          lastEvaluationDate,
          lastEvaluationClinic,
          // Aqui você pode adicionar mais estatísticas quando disponíveis
        }}
      />

      <Separator />

      <Tabs value={currentTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" asChild>
            <Link
              href={`/patients/${id}/history?tab=overview`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="evaluations" asChild>
            <Link
              href={`/patients/${id}/history?tab=evaluations`}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Avaliações</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" asChild>
            <Link
              href={`/patients/${id}/history?tab=prescriptions`}
              className="flex items-center gap-2"
            >
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Prescrições</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="surgeries" asChild>
            <Link
              href={`/patients/${id}/history?tab=surgeries`}
              className="flex items-center gap-2"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Cirurgias</span>
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Card de Melhor Acuidade Visual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Melhor Acuidade Visual
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  // Coletar todas as refrações de todas as avaliações
                  const allRefractions = patient.evaluations.flatMap((ev) => [
                    ...(ev.eyes?.rightEye?.refraction?.map((r) => ({
                      ...r,
                      eye: "OD",
                    })) || []),
                    ...(ev.eyes?.leftEye?.refraction?.map((r) => ({
                      ...r,
                      eye: "OE",
                    })) || []),
                  ]);

                  if (allRefractions.length === 0) {
                    return (
                      <div className="py-8 text-center text-muted-foreground">
                        <Eye className="mx-auto mb-2 h-8 w-8 opacity-50" />
                        <p>Nenhuma refração registrada.</p>
                      </div>
                    );
                  }

                  // Encontrar a melhor refração para cada olho
                  const rightEyeRefractions = allRefractions.filter(
                    (r) => r.eye === "OD",
                  );
                  const leftEyeRefractions = allRefractions.filter(
                    (r) => r.eye === "OE",
                  );

                  const bestRightRefraction =
                    getBestRefraction(rightEyeRefractions);
                  const bestLeftRefraction =
                    getBestRefraction(leftEyeRefractions);

                  return (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Olho</TableHead>
                          <TableHead>Melhor Acuidade</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bestRightRefraction && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {bestRightRefraction.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                {bestRightRefraction.visualAcuity || "N/A"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {bestRightRefraction.recordedAt
                                ? formatDate(bestRightRefraction.recordedAt)
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        )}
                        {bestLeftRefraction && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {bestLeftRefraction.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                {bestLeftRefraction.visualAcuity || "N/A"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {bestLeftRefraction.recordedAt
                                ? formatDate(bestLeftRefraction.recordedAt)
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Card de Última Gonioscopia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Última Gonioscopia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const gonioscopies = patient.evaluations
                    .flatMap((ev) => [
                      ...(ev.eyes?.rightEye?.logs
                        .filter(
                          (log) =>
                            log.type === "GONIOSCOPY" && log.details?.trim(),
                        )
                        .map((log) => ({ ...log, eye: "OD" })) || []),
                      ...(ev.eyes?.leftEye?.logs
                        .filter(
                          (log) =>
                            log.type === "GONIOSCOPY" && log.details?.trim(),
                        )
                        .map((log) => ({ ...log, eye: "OE" })) || []),
                    ])
                    .sort(
                      (a, b) =>
                        new Date(b.recordedAt).getTime() -
                        new Date(a.recordedAt).getTime(),
                    );

                  if (gonioscopies.length === 0) {
                    return (
                      <div className="py-8 text-center text-muted-foreground">
                        <Eye className="mx-auto mb-2 h-8 w-8 opacity-50" />
                        <p>Nenhuma gonioscopia registrada.</p>
                      </div>
                    );
                  }

                  const lastGonioscopyOD = gonioscopies.find(
                    (g) => g.eye === "OD",
                  );
                  const lastGonioscopyOS = gonioscopies.find(
                    (g) => g.eye === "OE",
                  );

                  return (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Olho</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Resultado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lastGonioscopyOD && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {lastGonioscopyOD.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(lastGonioscopyOD.recordedAt)}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap text-sm">
                              {lastGonioscopyOD.details}
                            </TableCell>
                          </TableRow>
                        )}
                        {lastGonioscopyOS && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {lastGonioscopyOS.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(lastGonioscopyOS.recordedAt)}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap text-sm">
                              {lastGonioscopyOS.details}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Card de Última Paquimetria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Última Paquimetria
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const pachymetries = patient.evaluations
                    .flatMap((ev) => [
                      ...(ev.eyes?.rightEye?.logs
                        .filter(
                          (log) =>
                            log.type === "PACHYMETRY" && log.details?.trim(),
                        )
                        .map((log) => ({ ...log, eye: "OD" })) || []),
                      ...(ev.eyes?.leftEye?.logs
                        .filter(
                          (log) =>
                            log.type === "PACHYMETRY" && log.details?.trim(),
                        )
                        .map((log) => ({ ...log, eye: "OE" })) || []),
                    ])
                    .sort(
                      (a, b) =>
                        new Date(b.recordedAt).getTime() -
                        new Date(a.recordedAt).getTime(),
                    );

                  if (pachymetries.length === 0) {
                    return (
                      <div className="py-8 text-center text-muted-foreground">
                        <Eye className="mx-auto mb-2 h-8 w-8 opacity-50" />
                        <p>Nenhuma paquimetria registrada.</p>
                      </div>
                    );
                  }

                  const lastPachymetryOD = pachymetries.find(
                    (p) => p.eye === "OD",
                  );
                  const lastPachymetryOS = pachymetries.find(
                    (p) => p.eye === "OE",
                  );

                  return (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Olho</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Resultado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lastPachymetryOD && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {lastPachymetryOD.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(lastPachymetryOD.recordedAt)}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap text-sm">
                              {lastPachymetryOD.details}
                            </TableCell>
                          </TableRow>
                        )}
                        {lastPachymetryOS && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">
                                {lastPachymetryOS.eye}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(lastPachymetryOS.recordedAt)}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap text-sm">
                              {lastPachymetryOS.details}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Gráfico de Tonometria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TonometryChart evaluations={patient.evaluations} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Histórico de Prescrições
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const prescriptions = patient.evaluations
                  .filter(
                    (ev) => ev.prescriptions && ev.prescriptions.length > 0,
                  )
                  .flatMap((ev) =>
                    ev.prescriptions.map((prescription) => ({
                      ...prescription,
                      evaluationDate: ev.createdAt,
                      collaborator: ev.collaborator,
                    })),
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.evaluationDate).getTime() -
                      new Date(a.evaluationDate).getTime(),
                  );

                if (prescriptions.length === 0) {
                  return (
                    <div className="py-8 text-center text-muted-foreground">
                      <Pill className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>Nenhuma prescrição registrada.</p>
                    </div>
                  );
                }

                return (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Profissional</TableHead>
                          <TableHead>Olho</TableHead>
                          <TableHead>Medicamento</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Instruções</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescriptions.map((prescription) =>
                          prescription.prescriptionItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                {formatDate(prescription.evaluationDate)}
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">
                                  {prescription.collaborator.name}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{item.eye}</Badge>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">
                                  {item.medication?.name || "N/A"}
                                </span>
                              </TableCell>
                              <TableCell>
                                {item.quantity === 0 ? (
                                  <Badge variant="secondary">
                                    Uso contínuo
                                  </Badge>
                                ) : (
                                  <div className="space-y-1">
                                    <span className="font-medium">
                                      {item.quantity} {item.medication?.unit}
                                    </span>
                                    {item.daysOfUse && item.daysOfUse > 0 && (
                                      <span className="block text-xs text-muted-foreground">
                                        {item.daysOfUse} dia
                                        {item.daysOfUse > 1 ? "s" : ""}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="max-w-xs whitespace-pre-wrap text-sm">
                                {item.selectedMedicationInstruction ||
                                  item.customInstruction ||
                                  "-"}
                              </TableCell>
                            </TableRow>
                          )),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surgeries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Histórico de Cirurgias
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                type EyeSurgery = {
                  id: string;
                  procedure: string;
                  date: string | Date;
                  notes?: string | null;
                };
                type Eye = {
                  surgeries?: EyeSurgery[];
                };
                type EvaluationWithEyes =
                  (typeof patient.evaluations)[number] & {
                    eyes?: {
                      leftEye?: Eye;
                      rightEye?: Eye;
                    };
                  };
                const surgeries = (
                  (patient.evaluations as EvaluationWithEyes[]) || []
                )
                  .flatMap((ev) => [
                    ...(ev.eyes?.rightEye?.surgeries?.map((s: any) => ({
                      ...s,
                      eye: "OD",
                    })) || []),
                    ...(ev.eyes?.leftEye?.surgeries?.map((s: any) => ({
                      ...s,
                      eye: "OE",
                    })) || []),
                  ])
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  );
                if (surgeries.length === 0) {
                  return (
                    <div className="py-8 text-center text-muted-foreground">
                      <Stethoscope className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>Nenhuma cirurgia registrada.</p>
                    </div>
                  );
                }
                return (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Olho</TableHead>
                          <TableHead>Procedimento</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Notas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {surgeries.map((surgery, idx) => (
                          <TableRow key={surgery.id + surgery.eye + idx}>
                            <TableCell className="font-semibold">
                              <Badge variant="outline">{surgery.eye}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                {surgery.procedure || "N/A"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {surgery.date ? formatDate(surgery.date) : "N/A"}
                            </TableCell>
                            <TableCell className="max-w-xs whitespace-pre-wrap text-sm">
                              {surgery.notes || "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <EvaluationHistoryList evaluations={patient.evaluations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
