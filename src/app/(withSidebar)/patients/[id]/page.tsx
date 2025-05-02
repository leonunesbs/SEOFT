import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MdOutlineHistory, MdOutlineUploadFile } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Button } from "~/components/ui/button";
import { EvaluationList } from "~/components/organisms/evaluation-list";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PageHeading } from "~/components/atoms/page-heading";
import { PatientForm } from "~/components/organisms/patient-form";
import { TonometryChart } from "~/components/molecules/tonometry-chart";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export default async function Patient({
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

  const patient = await db.patient.findUnique({
    where: { id },
    include: {
      evaluations: {
        include: {
          collaborator: { select: { name: true, id: true } },
          clinic: { select: { name: true, id: true } },
          prescriptions: {
            include: {
              prescriptionItems: {
                include: {
                  medication: true,
                },
              },
            },
          },
          eyes: {
            include: {
              leftEye: {
                include: {
                  surgeries: true,
                  logs: true,
                },
              },
              rightEye: {
                include: {
                  surgeries: true,
                  logs: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 6,
      },
    },
  });

  if (!patient) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <PageHeading>Detalhes do Paciente</PageHeading>
        <div className="flex gap-2">
          <AddEvaluationButton
            patientId={patient.id}
            patientName={patient.name}
            variant={"default"}
            customChildren={
              <>
                <MdOutlineUploadFile />
                <span className="hidden sm:inline">Nova Avaliação</span>
              </>
            }
            customLoading={
              <>
                <Loader2 className="animate-spin" />
                Carregando...
              </>
            }
          />
          <Button asChild variant={"outline"}>
            <Link href={`/patients/${patient.id}/history`}>
              <MdOutlineHistory />
              <span className="hidden sm:inline">Histórico</span>
            </Link>
          </Button>
        </div>
      </div>

      <PatientForm
        initialData={{
          id: patient.id,
          refId: patient.refId,
          name: patient.name,
          birthDate: patient.birthDate.toISOString(),
        }}
      />

      <Tabs value={currentTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" asChild>
            <Link href={`/patients/${id}?tab=overview`}>Visão Geral</Link>
          </TabsTrigger>
          <TabsTrigger value="evaluations" asChild>
            <Link href={`/patients/${id}?tab=evaluations`}>Avaliações</Link>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" asChild>
            <Link href={`/patients/${id}?tab=prescriptions`}>Prescrições</Link>
          </TabsTrigger>
          <TabsTrigger value="surgeries" asChild>
            <Link href={`/patients/${id}?tab=surgeries`}>Cirurgias</Link>
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
                        .filter((log) => log.type === "GONIOSCOPY")
                        .map((log) => ({ ...log, eye: "OD" })) || []),
                      ...(ev.eyes?.leftEye?.logs
                        .filter((log) => log.type === "GONIOSCOPY")
                        .map((log) => ({ ...log, eye: "OS" })) || []),
                    ])
                    .sort(
                      (a, b) =>
                        new Date(b.recordedAt).getTime() -
                        new Date(a.recordedAt).getTime(),
                    );

                  const lastGonioscopyOD = gonioscopies.find(
                    (log) => log.eye === "OD",
                  );
                  const lastGonioscopyOS = gonioscopies.find(
                    (log) => log.eye === "OS",
                  );

                  if (!lastGonioscopyOD && !lastGonioscopyOS) {
                    return (
                      <div className="text-muted">
                        Nenhuma gonioscopia registrada.
                      </div>
                    );
                  }

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
                            <TableCell className="font-semibold">OD</TableCell>
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
                            <TableCell className="font-semibold">OS</TableCell>
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
                        .filter((log) => log.type === "PACHYMETRY")
                        .map((log) => ({ ...log, eye: "OD" })) || []),
                      ...(ev.eyes?.leftEye?.logs
                        .filter((log) => log.type === "PACHYMETRY")
                        .map((log) => ({ ...log, eye: "OS" })) || []),
                    ])
                    .sort(
                      (a, b) =>
                        new Date(b.recordedAt).getTime() -
                        new Date(a.recordedAt).getTime(),
                    );

                  const lastPachymetryOD = pachymetries.find(
                    (log) => log.eye === "OD",
                  );
                  const lastPachymetryOS = pachymetries.find(
                    (log) => log.eye === "OS",
                  );

                  if (!lastPachymetryOD && !lastPachymetryOS) {
                    return (
                      <div className="text-muted">
                        Nenhuma paquimetria registrada.
                      </div>
                    );
                  }

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
                            <TableCell className="font-semibold">OD</TableCell>
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
                            <TableCell className="font-semibold">OS</TableCell>
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
                  .flatMap((ev) => [
                    ...(ev.prescriptions?.map((prescription) => ({
                      ...prescription,
                      date: ev.createdAt,
                      collaborator: ev.collaborator,
                    })) || []),
                  ])
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
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
                        prescription.prescriptionItems.map((item, idx) => (
                          <TableRow key={item.id + idx}>
                            <TableCell>
                              {new Date(prescription.date).toLocaleDateString(
                                "pt-BR",
                              )}
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
                      eye: "OS",
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
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <EvaluationList
                evaluations={patient.evaluations}
                patientId={patient.id}
                patientName={patient.name}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
