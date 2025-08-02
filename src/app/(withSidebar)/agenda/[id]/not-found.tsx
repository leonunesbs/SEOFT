import { ArrowLeft, Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function AppointmentNotFound() {
  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/agenda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Agenda
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Agendamento não encontrado</h1>
          <p className="text-muted-foreground">
            O agendamento solicitado não foi encontrado ou pode ter sido
            removido.
          </p>
        </div>
      </div>

      {/* Card de erro */}
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Agendamento não encontrado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            O agendamento que você está procurando não existe ou pode ter sido
            removido do sistema.
          </p>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/agenda">
                <Calendar className="mr-2 h-4 w-4" />
                Voltar para Agenda
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/patients/search">
                <Search className="mr-2 h-4 w-4" />
                Buscar Pacientes
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
