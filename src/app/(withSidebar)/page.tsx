// app/dashboard/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Link from "next/link";
import { db } from "~/server/db";
import { HydrateClient } from "~/trpc/server";

export default async function Dashboard() {
  const patientsCount = await db.patient.count();
  const clinicsCount = await db.clinic.count();
  const collaboratorsCount = await db.collaborator.count();
  const evaluationsCount = await db.evaluation.count();

  const recentEvaluations = await db.evaluation.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      patient: { select: { name: true } },
      collaborator: { select: { name: true } },
      clinic: { select: { name: true } },
    },
  });

  return (
    <HydrateClient>
      <div className="space-y-4 sm:space-y-6">
        {/* Estatísticas Resumidas */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="font-medium">Pacientes</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{patientsCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="font-medium">Ambulatórios</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{clinicsCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="font-medium">Médicos</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{collaboratorsCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="font-medium">Avaliações</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{evaluationsCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Avaliações Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Ambulatório</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Avaliação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell>
                      <Link
                        href={`/patients/${evaluation.patientId}`}
                        aria-label={`Ver detalhes do paciente ${evaluation.patient?.name || "N/A"}`}
                        className="font-semibold hover:underline"
                      >
                        {evaluation.patient?.name || "N/A"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {evaluation.collaborator?.name || "N/A"}
                    </TableCell>
                    <TableCell>{evaluation.clinic?.name ?? "N/A"}</TableCell>
                    <TableCell>
                      {new Date(evaluation.createdAt).toLocaleDateString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/evaluations/${evaluation.id}`}
                        aria-label={`Ver detalhes da avaliação ${evaluation.id}`}
                        className="font-semibold hover:underline"
                      >
                        {evaluation.done ? "Finalizada" : "Pendente"}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </HydrateClient>
  );
}
