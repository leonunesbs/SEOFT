"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  UserCheck,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { useState } from "react";

interface InjectionDayStepsProps {
  currentStep: number;
  selectedDate: Date;
  onStepComplete: (stepId: number) => void;
  onStepSelect: (stepId: number) => void;
  onStepBack: (stepId: number) => void;
}

interface InjectionData {
  id: string;
  indication: {
    id: string;
    swalisClassification: string;
    medication: string;
    patient: {
      id: string;
      name: string;
      refId: string;
    };
  };
  scheduledDate: Date;
  status: string;
  eye: "OD" | "OE";
  lateralityConfirmed: boolean;
  patientAttended: boolean;
}

interface StaffData {
  id: string;
  name: string;
  crm: string;
  role: string;
  clinics: string[];
}

export function InjectionDaySteps({
  currentStep,
  selectedDate,
  onStepComplete,
  onStepBack,
}: InjectionDayStepsProps) {
  const [confirmedLaterality, setConfirmedLaterality] = useState<
    Record<string, "OD" | "OE">
  >({});
  const [attendedPatients, setAttendedPatients] = useState<
    Record<string, boolean>
  >({});
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  // Buscar injeções agendadas para o dia
  const { data: injections, isLoading: loadingInjections } =
    api.indication.getInjectionsByDate.useQuery(
      { date: selectedDate },
      { enabled: currentStep >= 1 },
    );

  // Buscar staff disponível
  const { data: staffMembers, isLoading: loadingStaff } =
    api.staff.list.useQuery(undefined, { enabled: currentStep >= 3 });

  // Mutations para atualizar status
  const updateLateralityMutation =
    api.indication.confirmLaterality.useMutation();
  const updateAttendanceMutation = api.indication.markAsAttended.useMutation();

  const handleLateralityConfirm = async (
    injectionId: string,
    eye: "OD" | "OE",
  ) => {
    try {
      await updateLateralityMutation.mutateAsync({
        injectionId,
        eye: eye === "OE" ? "OS" : "OD",
      });
      setConfirmedLaterality((prev) => ({ ...prev, [injectionId]: eye }));
    } catch (error) {
      console.error("Erro ao confirmar lateralidade:", error);
    }
  };

  const handlePatientAttendance = async (
    injectionId: string,
    attended: boolean,
  ) => {
    try {
      if (attended) {
        await updateAttendanceMutation.mutateAsync({
          injectionId,
        });
      }
      setAttendedPatients((prev) => ({ ...prev, [injectionId]: attended }));
    } catch (error) {
      console.error("Erro ao atualizar presença:", error);
    }
  };

  const handleStaffConfirm = async (staffId: string) => {
    try {
      // For now, we'll just set the selected staff and complete the step
      // In a real implementation, you might want to update the injection with staff information
      setSelectedStaff(staffId);
      onStepComplete(3);
    } catch (error) {
      console.error("Erro ao confirmar staff:", error);
    }
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          Passo 1: Confirmação de Lateralidade
        </CardTitle>
        <p className="text-sm text-gray-600">
          Verifique o prontuário e confirme o olho correto para cada injeção
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingInjections ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Carregando injeções...</div>
          </div>
        ) : injections && injections.length > 0 ? (
          <div className="space-y-4">
            {injections.map((injection: InjectionData) => (
              <Card key={injection.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {injection.indication.patient.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Prontuário: {injection.indication.patient.refId}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge variant="outline">
                          {injection.indication.swalisClassification}
                        </Badge>
                        <Badge variant="outline">
                          {injection.indication.medication}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <RadioGroup
                        value={
                          confirmedLaterality[injection.id] || injection.eye
                        }
                        onValueChange={(value) =>
                          handleLateralityConfirm(
                            injection.id,
                            value as "OD" | "OE",
                          )
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="OD"
                            id={`od-${injection.id}`}
                          />
                          <Label htmlFor={`od-${injection.id}`}>OD</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="OE"
                            id={`oe-${injection.id}`}
                          />
                          <Label htmlFor={`oe-${injection.id}`}>OE</Label>
                        </div>
                      </RadioGroup>
                      {confirmedLaterality[injection.id] && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button
                onClick={() => onStepComplete(1)}
                disabled={
                  Object.keys(confirmedLaterality).length < injections.length
                }
              >
                Confirmar Lateralidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">
                Nenhuma injeção agendada para este dia
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          Passo 2: Confirmação de Pacientes
        </CardTitle>
        <p className="text-sm text-gray-600">
          Confirme quais pacientes estão presentes para receber a injeção
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingInjections ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Carregando pacientes...</div>
          </div>
        ) : injections && injections.length > 0 ? (
          <div className="space-y-4">
            {injections.map((injection: InjectionData) => (
              <Card
                key={injection.id}
                className="border-l-4 border-l-green-500"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {injection.indication.patient.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Prontuário: {injection.indication.patient.refId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Olho:{" "}
                        {confirmedLaterality[injection.id] || injection.eye}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id={`attended-${injection.id}`}
                        checked={attendedPatients[injection.id] || false}
                        onCheckedChange={(checked) =>
                          handlePatientAttendance(
                            injection.id,
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor={`attended-${injection.id}`}>
                        Paciente Presente
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onStepBack(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                onClick={() => onStepComplete(2)}
                disabled={
                  Object.keys(attendedPatients).length < injections.length
                }
              >
                Confirmar Presenças
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">
                Nenhum paciente para confirmar
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-purple-600" />
          Passo 3: Confirmação de Colaborador
        </CardTitle>
        <p className="text-sm text-gray-600">
          Confirme o staff responsável pelas injeções do dia
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingStaff ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Carregando staff...</div>
          </div>
        ) : staffMembers && staffMembers.length > 0 ? (
          <div className="space-y-4">
            <RadioGroup
              value={selectedStaff || ""}
              onValueChange={setSelectedStaff}
            >
              {staffMembers.map((staff: StaffData) => (
                <Card key={staff.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={staff.id}
                        id={`staff-${staff.id}`}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`staff-${staff.id}`}
                          className="text-base font-semibold"
                        >
                          {staff.name}
                        </Label>
                        <p className="text-sm text-gray-600">
                          CRM: {staff.crm}
                        </p>
                        <p className="text-sm text-gray-600">
                          Função: {staff.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onStepBack(3)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                onClick={() =>
                  selectedStaff && handleStaffConfirm(selectedStaff)
                }
                disabled={!selectedStaff}
              >
                Confirmar Staff
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Nenhum staff disponível</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </div>
  );
}
