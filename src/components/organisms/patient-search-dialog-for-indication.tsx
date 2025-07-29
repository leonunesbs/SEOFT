"use client";

import { Calendar, Search, User } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

import { AddPatientDialogForIndication } from "./add-patient-dialog-for-indication";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

interface Patient {
  id: string;
  refId: string;
  name: string;
  birthDate: string;
}

interface PatientSearchDialogForIndicationProps {
  onPatientSelect: (patient: Patient) => void;
  selectedPatientId?: string;
}

export function PatientSearchDialogForIndication({
  onPatientSelect,
  selectedPatientId,
}: PatientSearchDialogForIndicationProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Buscar pacientes
  const {
    data: patients = [],
    isLoading,
    refetch,
  } = api.patient.search.useQuery(searchQuery, {
    enabled: false, // Não buscar automaticamente
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite o número do prontuário ou nome do paciente",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      await refetch();
    } finally {
      setIsSearching(false);
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    onPatientSelect(patient);
    setOpen(false);
    setSearchQuery("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const formatAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          {selectedPatientId ? "Paciente selecionado" : "Selecionar paciente"}
        </Button>
      }
      title="Buscar Paciente"
      description="Digite o número do prontuário ou nome do paciente para buscar"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="space-y-4">
        {/* Campo de busca */}
        <div className="space-y-2">
          <Label htmlFor="patient-search">Buscar paciente</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="patient-search"
                placeholder="Nº prontuário ou nome do paciente"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-9"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching || isLoading}
              size="sm"
            >
              {isSearching || isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Resultados da busca */}
        {searchQuery && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Resultados</Label>
              {patients.length > 0 && (
                <Badge variant="secondary">
                  {patients.length} encontrado(s)
                </Badge>
              )}
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Buscando pacientes...
              </div>
            ) : patients.length > 0 ? (
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {patients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPatientId === patient.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Prontuário: {patient.refId}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(patient.birthDate)}
                          </div>
                          <div>{formatAge(patient.birthDate)} anos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3 py-8 text-center">
                <div className="text-muted-foreground">
                  Nenhum resultado para &quot;{searchQuery}&quot;
                </div>
                <div className="text-sm text-muted-foreground">
                  Tente buscar por outro termo ou crie um novo paciente
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botão para criar novo paciente */}
        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Não encontrou o paciente?
          </Label>
          <AddPatientDialogForIndication
            onSuccess={(patient) => {
              toast({
                title: "Paciente criado!",
                description:
                  "Paciente criado com sucesso. Você pode buscá-lo agora.",
                variant: "default",
              });
              // Selecionar automaticamente o paciente criado
              handlePatientSelect(patient);
              // Recarregar a busca após criar o paciente
              if (searchQuery) {
                refetch();
              }
            }}
          />
        </div>
      </div>
    </ResponsiveDialog>
  );
}
