"use client";

import { ArrowLeft, FileText, Pill, Save, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";

// Dados mockados para demonstração
const mockIndication = {
  id: "1",
  patientName: "Maria Silva",
  patientId: "P001",
  patientAge: "65",
  patientPhone: "(11) 99999-9999",
  diagnosis: "DMRI Exsudativa",
  medication: "Aflibercept (Eylea)",
  priority: "high",
  observations:
    "Paciente com DMRI exsudativa em olho direito. Primeira aplicação de AntiVEGF.",
  previousInjections: "0",
  lastInjectionDate: "",
  nextInjectionDate: "2024-02-20",
  doctor: "Dr. João Santos",
  urgency: true,
  bilateral: false,
  contraindications: "Nenhuma contraindicação conhecida",
  allergies: "Nenhuma alergia conhecida",
};

const medications = [
  "Aflibercept (Eylea)",
  "Ranibizumab (Lucentis)",
  "Bevacizumab (Avastin)",
  "Faricimab (Vabysmo)",
  "Brolucizumab (Beovu)",
];

const diagnoses = [
  "DMRI Exsudativa",
  "Edema Macular Diabético",
  "Oclusão de Veia Retiniana",
  "Oclusão de Artéria Retiniana",
  "Retinopatia da Prematuridade",
  "Neovascularização de Coroide",
  "Outros",
];

export default function EditIndicationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { id: indicationId } = useParams();

  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    patientAge: "",
    patientPhone: "",
    diagnosis: "",
    medication: "",
    priority: "medium",
    observations: "",
    previousInjections: "",
    lastInjectionDate: "",
    nextInjectionDate: "",
    doctor: "",
    urgency: false,
    bilateral: false,
    contraindications: "",
    allergies: "",
  });

  useEffect(() => {
    // Simular carregamento dos dados da indicação
    setFormData({
      patientName: mockIndication.patientName,
      patientId: mockIndication.patientId,
      patientAge: mockIndication.patientAge,
      patientPhone: mockIndication.patientPhone,
      diagnosis: mockIndication.diagnosis,
      medication: mockIndication.medication,
      priority: mockIndication.priority,
      observations: mockIndication.observations,
      previousInjections: mockIndication.previousInjections,
      lastInjectionDate: mockIndication.lastInjectionDate,
      nextInjectionDate: mockIndication.nextInjectionDate,
      doctor: mockIndication.doctor,
      urgency: mockIndication.urgency,
      bilateral: mockIndication.bilateral,
      contraindications: mockIndication.contraindications,
      allergies: mockIndication.allergies,
    });
  }, [indicationId]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implementar mutation para atualizar indicação quando o router estiver disponível
    // Por enquanto, usando dados mockados
    console.log("Dados atualizados da indicação:", formData);

    // Simular sucesso
    toast({
      title: "Sucesso!",
      description: "Indicação atualizada com sucesso",
      variant: "default",
    });

    router.push(`/antivegf/indications/${indicationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/antivegf/indications/${indicationId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Editar Indicação #{indicationId}
          </h2>
          <p className="mt-1 text-gray-600">
            Atualize os dados da indicação de injeção intravítrea
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados do Paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Dados do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label htmlFor="patientName">Nome Completo *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) =>
                    handleInputChange("patientName", e.target.value)
                  }
                  placeholder="Nome do paciente"
                  required
                />
              </div>

              <div>
                <Label htmlFor="patientId">ID do Paciente *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) =>
                    handleInputChange("patientId", e.target.value)
                  }
                  placeholder="P001"
                  required
                />
              </div>

              <div>
                <Label htmlFor="patientAge">Idade</Label>
                <Input
                  id="patientAge"
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) =>
                    handleInputChange("patientAge", e.target.value)
                  }
                  placeholder="65"
                />
              </div>

              <div>
                <Label htmlFor="patientPhone">Telefone</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) =>
                    handleInputChange("patientPhone", e.target.value)
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="doctor">Médico Responsável *</Label>
                <Input
                  id="doctor"
                  value={formData.doctor}
                  onChange={(e) => handleInputChange("doctor", e.target.value)}
                  placeholder="Dr. Nome"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnóstico e Medicamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Diagnóstico e Tratamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="diagnosis">Diagnóstico *</Label>
                <Select
                  value={formData.diagnosis}
                  onValueChange={(value) =>
                    handleInputChange("diagnosis", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o diagnóstico" />
                  </SelectTrigger>
                  <SelectContent>
                    {diagnoses.map((diagnosis) => (
                      <SelectItem key={diagnosis} value={diagnosis}>
                        {diagnosis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="medication">Medicamento *</Label>
                <Select
                  value={formData.medication}
                  onValueChange={(value) =>
                    handleInputChange("medication", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o medicamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map((medication) => (
                      <SelectItem key={medication} value={medication}>
                        {medication}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgency"
                  checked={formData.urgency}
                  onCheckedChange={(checked) =>
                    handleInputChange("urgency", checked as boolean)
                  }
                />
                <Label htmlFor="urgency">Urgência</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bilateral"
                  checked={formData.bilateral}
                  onCheckedChange={(checked) =>
                    handleInputChange("bilateral", checked as boolean)
                  }
                />
                <Label htmlFor="bilateral">Bilateral</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Injeções */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5" />
              Histórico de Injeções
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="previousInjections">
                  Número de Injeções Anteriores
                </Label>
                <Input
                  id="previousInjections"
                  type="number"
                  value={formData.previousInjections}
                  onChange={(e) =>
                    handleInputChange("previousInjections", e.target.value)
                  }
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="lastInjectionDate">
                  Data da Última Injeção
                </Label>
                <Input
                  id="lastInjectionDate"
                  type="date"
                  value={formData.lastInjectionDate}
                  onChange={(e) =>
                    handleInputChange("lastInjectionDate", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="nextInjectionDate">
                  Data Prevista para Próxima Injeção
                </Label>
                <Input
                  id="nextInjectionDate"
                  type="date"
                  value={formData.nextInjectionDate}
                  onChange={(e) =>
                    handleInputChange("nextInjectionDate", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observações e Contraindicações */}
        <Card>
          <CardHeader>
            <CardTitle>Observações e Contraindicações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="observations">Observações Clínicas</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) =>
                    handleInputChange("observations", e.target.value)
                  }
                  placeholder="Observações importantes sobre o caso..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contraindications">Contraindicações</Label>
                <Textarea
                  id="contraindications"
                  value={formData.contraindications}
                  onChange={(e) =>
                    handleInputChange("contraindications", e.target.value)
                  }
                  placeholder="Contraindicações conhecidas..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) =>
                    handleInputChange("allergies", e.target.value)
                  }
                  placeholder="Alergias conhecidas..."
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/antivegf/indications/${indicationId}`}>Cancelar</Link>
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
