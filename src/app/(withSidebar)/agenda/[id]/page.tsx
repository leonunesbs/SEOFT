import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  MapPin,
  StickyNote,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { AppointmentDetailWrapper } from "~/components/organisms/appointment-detail-wrapper";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/server";

interface AppointmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Utility functions
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Reusable components
const InfoField = ({
  label,
  icon: Icon,
  children,
  className = "",
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  </div>
);

const NotesSection = ({
  title,
  notes,
  icon: Icon,
  variant = "default",
}: {
  title?: string;
  notes: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "highlighted";
}) => {
  const isHighlighted = variant === "highlighted";

  return (
    <div className="space-y-2">
      {title && (
        <label
          className={`flex items-center gap-2 text-sm font-medium ${isHighlighted ? "text-foreground" : "text-muted-foreground"}`}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="break-words">{title}</span>
        </label>
      )}
      <div
        className={`rounded-md p-3 ${isHighlighted ? "bg-card" : "bg-muted"}`}
      >
        <p className="break-words text-sm leading-relaxed">{notes}</p>
      </div>
      {isHighlighted && (
        <div className="text-xs text-muted-foreground">
          <FileText className="mr-1 inline h-3 w-3" />
          Estas observações foram definidas durante a avaliação anterior
        </div>
      )}
    </div>
  );
};

const extractReturnNotes = (notes: string) => {
  if (!notes?.includes("Notas para retorno:")) return null;
  return (
    notes.split("Notas para retorno:")[1]?.split(".")[0] ||
    "Informações de retorno disponíveis"
  );
};

export default async function AppointmentDetailPage({
  params,
}: AppointmentDetailPageProps) {
  const { id } = await params;

  const appointment = await api.appointment.getById({
    id,
  });

  if (!appointment) {
    return <div>Agendamento não encontrado</div>;
  }

  const returnNotesFromAppointment = extractReturnNotes(
    appointment.notes || "",
  );

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Button variant="ghost" size="sm" asChild className="w-fit">
            <Link href="/agenda">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Agenda
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
              Detalhes do Agendamento
            </h1>
            <p className="truncate text-muted-foreground">
              #{appointment.patient.refId} - {appointment.patient.name}
            </p>
          </div>
        </div>
      </div>

      {/* Informações principais */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Informações do agendamento */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg sm:text-xl">
                Informações do Agendamento
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoField label="Data e Hora" icon={Clock}>
                <div className="break-words">
                  {formatDate(appointment.scheduledDate)} às{" "}
                  {formatTime(appointment.scheduledDate)}
                </div>
              </InfoField>

              <InfoField label="Clínica" icon={MapPin}>
                <div className="break-words">
                  {appointment.clinic?.name || "Não especificada"}
                </div>
              </InfoField>

              <InfoField label="Profissional" icon={User}>
                <div className="break-words">
                  {appointment.collaborator.name}
                  {appointment.collaborator.crm && (
                    <span className="text-muted-foreground">
                      {" "}
                      (CRM: {appointment.collaborator.crm})
                    </span>
                  )}
                </div>
              </InfoField>
            </div>

            {appointment.notes && (
              <NotesSection
                title="Observações do Agendamento"
                notes={appointment.notes}
                icon={FileText}
              />
            )}

            {/* Mostrar returnNotes se não houver avaliação associada */}
            {!appointment.evaluation && returnNotesFromAppointment && (
              <NotesSection
                title="Observações para o Retorno"
                notes={returnNotesFromAppointment}
                icon={StickyNote}
              />
            )}
          </CardContent>
        </Card>

        {/* Informações do paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-lg sm:text-xl">
                Informações do Paciente
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoField label="Nome" icon={User}>
              <div className="break-words">{appointment.patient.name}</div>
            </InfoField>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                ID de Referência
              </label>
              <Badge variant="outline" className="break-all">
                #{appointment.patient.refId}
              </Badge>
            </div>

            {appointment.patient.birthDate && (
              <InfoField label="Idade" icon={User}>
                {calculateAge(appointment.patient.birthDate)} anos
              </InfoField>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Avaliação associada */}
      {appointment.evaluation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Avaliação Associada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-x-2 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Status da Avaliação
                </label>
                <Badge>
                  {appointment.evaluation.done ? "Concluída" : "Pendente"}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Ações
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none"
                  >
                    <Link href={`/evaluations/${appointment.evaluation.id}`}>
                      Ver Avaliação
                    </Link>
                  </Button>
                  {!appointment.evaluation.done && (
                    <Button size="sm" asChild className="flex-1 sm:flex-none">
                      <Link href={`/evaluations/${appointment.evaluation.id}`}>
                        Continuar Avaliação
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {appointment.evaluation.diagnosis && (
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Diagnóstico
                  </label>
                  <p className="break-words rounded-md bg-muted p-3 text-sm">
                    {appointment.evaluation.diagnosis}
                  </p>
                </div>
              )}

              {appointment.evaluation.treatment && (
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Tratamento
                  </label>
                  <p className="break-words rounded-md p-3 text-sm">
                    {appointment.evaluation.treatment}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notas para o Retorno - Seção destacada */}
      {appointment.evaluation?.returnNotes && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              <span className="text-lg sm:text-xl">
                Observações para o Retorno
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NotesSection
              notes={appointment.evaluation.returnNotes}
              icon={StickyNote}
              variant="highlighted"
            />
          </CardContent>
        </Card>
      )}

      {/* Seção Interativa - Client Components */}
      <AppointmentDetailWrapper appointment={appointment} />
    </div>
  );
}
