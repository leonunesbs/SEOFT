import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Eye, FileText, Pill, Stethoscope } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { EvaluationHistoryList } from "~/components/organisms/evaluation-history-list";
import Link from "next/link";
import { PageHeading } from "~/components/atoms/page-heading";
import { Separator } from "~/components/ui/separator";
import { TonometryChart } from "~/components/molecules/tonometry-chart";
import { api } from "~/trpc/server";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

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
  const lastEvaluationDate = patient.evaluations[0]?.createdAt || "N/A";
  const lastEvaluationClinic = patient.evaluations[0]?.clinic?.name || "N/A";

  return (
    <div className="space-y-4">
      <PageHeading>Histórico do Paciente</PageHeading>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            Total de Avaliações
          </h2>
          <p className="text-right text-lg">{totalEvaluations}</p>
        </Card>
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            Útima Avaliação
          </h2>
          <p className="text-right text-sm">{lastEvaluationClinic}</p>
          <p className="text-right text-sm">
            {new Date(lastEvaluationDate).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
        </Card>
        <Card className="flex flex-col justify-between p-4">
          <h2 className="font-semibold text-muted-foreground">
            ID do Paciente
          </h2>
          <Link
            className="text-right hover:underline"
            href={`/patients/${patient.id}`}
            aria-label="Ver detalhes do paciente"
          >
            {patient.id}
          </Link>
        </Card>
      </div>

      <Separator />

      <Tabs value={currentTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" asChild className="w-full sm:w-auto">
            <Link
              href={`/patients/${id}/history?tab=overview`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Visão Geral</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="evaluations" asChild className="w-full sm:w-auto">
            <Link
              href={`/patients/${id}/history?tab=evaluations`}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Avaliações</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="prescriptions"
            asChild
            className="w-full sm:w-auto"
          >
            <Link
              href={`/patients/${id}/history?tab=prescriptions`}
              className="flex items-center gap-2"
            >
              <Pill className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Prescrições</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="surgeries" asChild className="w-full sm:w-auto">
            <Link
              href={`/patients/${id}/history?tab=surgeries`}
              className="flex items-center gap-2"
            >
              <Stethoscope className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Cirurgias</span>
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Card de Última Gonioscopia */}
            <Card>
              <CardHeader>
                <CardTitle>Última Gonioscopia</CardTitle>
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
                    return null;
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
                              {lastGonioscopyOD.eye}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                lastGonioscopyOD.recordedAt,
                              ).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap">
                              {lastGonioscopyOD.details}
                            </TableCell>
                          </TableRow>
                        )}
                        {lastGonioscopyOS && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              {lastGonioscopyOS.eye}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                lastGonioscopyOS.recordedAt,
                              ).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap">
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
                <CardTitle>Última Paquimetria</CardTitle>
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
                    return null;
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
                              {lastPachymetryOD.eye}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                lastPachymetryOD.recordedAt,
                              ).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap">
                              {lastPachymetryOD.details}
                            </TableCell>
                          </TableRow>
                        )}
                        {lastPachymetryOS && (
                          <TableRow>
                            <TableCell className="font-semibold">
                              {lastPachymetryOS.eye}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                lastPachymetryOS.recordedAt,
                              ).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap">
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
              <CardTitle>Gráfico de Tonometria</CardTitle>
            </CardHeader>
            <CardContent>
              <TonometryChart evaluations={patient.evaluations} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Prescrições</CardTitle>
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
                    <div className="text-muted">
                      Nenhuma prescrição registrada.
                    </div>
                  );
                }

                return (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Profissional</TableHead>
                        <TableHead>Olho</TableHead>
                        <TableHead>Medicamento</TableHead>
                        <TableHead>Instruções</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescriptions.map((prescription) =>
                        prescription.prescriptionItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {new Date(
                                prescription.evaluationDate,
                              ).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>
                              {prescription.collaborator.name}
                            </TableCell>
                            <TableCell>{item.eye}</TableCell>
                            <TableCell>
                              {item.medication?.name || "N/A"}
                            </TableCell>
                            <TableCell className="whitespace-pre-wrap">
                              {item.selectedMedicationInstruction ||
                                item.customInstruction ||
                                "-"}
                            </TableCell>
                          </TableRow>
                        )),
                      )}
                    </TableBody>
                  </Table>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surgeries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Cirurgias</CardTitle>
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
                    <div className="text-muted">
                      Nenhuma cirurgia registrada.
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
                              {surgery.eye}
                            </TableCell>
                            <TableCell>{surgery.procedure || "N/A"}</TableCell>
                            <TableCell>
                              {surgery.date
                                ? new Date(surgery.date).toLocaleDateString(
                                    "pt-BR",
                                  )
                                : "N/A"}
                            </TableCell>
                            <TableCell>{surgery.notes || "-"}</TableCell>
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
