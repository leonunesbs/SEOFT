"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { useComprehensiveErrorHandler } from "~/hooks/use-error-handler";
import { useErrorTracking } from "~/lib/analytics";
import { useState } from "react";

// ============================================================================
// EXEMPLO DE USO DO SISTEMA DE TRATAMENTO DE ERROS
// ============================================================================

export function ErrorHandlingExample() {
  const [patientRefId, setPatientRefId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientBirthDate, setPatientBirthDate] = useState("");

  // Hook combinado para tratamento de erros
  const {
    handleError,
    handleSuccess,
    handleWarning,
    handleMutationError,
    handleMutationSuccess,
    handleFormError,
    handleQueryError,
  } = useComprehensiveErrorHandler();

  // Hook para tracking de erros no componente
  const { trackError, trackUserAction } = useErrorTracking();

  // ============================================================================
  // MUTAÇÕES COM TRATAMENTO DE ERRO AUTOMÁTICO
  // ============================================================================

  // Criar paciente
  const createPatientMutation = api.patient.create.useMutation({
    onError: (error) => {
      handleMutationError(error, {
        operation: "create_patient",
        userId: "current_user_id", // Em produção, pegar do contexto de auth
      });
    },
    onSuccess: () => {
      handleMutationSuccess("Paciente criado com sucesso!", {
        action: "create_patient",
        resource: "patient",
        userId: "current_user_id",
      });

      // Limpa o formulário
      setPatientRefId("");
      setPatientName("");
      setPatientBirthDate("");
    },
  });

  // Buscar paciente
  const getPatientQuery = api.patient.get.useQuery(
    { refId: patientRefId },
    {
      enabled: false, // Só executa quando chamado manualmente
    },
  );

  // ============================================================================
  // HANDLERS DE EVENTOS
  // ============================================================================

  const handleCreatePatient = () => {
    // Validação básica
    if (
      !patientRefId.trim() ||
      !patientName.trim() ||
      !patientBirthDate.trim()
    ) {
      handleFormError(
        new Error("Todos os campos são obrigatórios"),
        "form_validation",
      );
      return;
    }

    // Track ação do usuário
    trackUserAction("create_patient_attempt", true, "patient");

    // Executa a mutação
    createPatientMutation.mutate({
      refId: patientRefId.trim(),
      name: patientName.trim(),
      birthDate: patientBirthDate,
    });
  };

  const handleSearchPatient = async () => {
    if (!patientRefId.trim()) {
      handleFormError(new Error("Número de prontuário é obrigatório"), "refId");
      return;
    }

    // Track ação do usuário
    trackUserAction("search_patient_attempt", true, "patient");

    try {
      // Refetch da query
      await getPatientQuery.refetch();
    } catch (error) {
      handleQueryError(error, {
        operation: "get_patient",
        userId: "current_user_id",
      });
    }
  };

  const handleTestError = () => {
    // Simula diferentes tipos de erro para teste
    const errorTypes = [
      new Error("Erro de validação"),
      { code: "AUTH_001", message: "Sessão expirada" },
      { code: "DB_002", message: "Erro de banco de dados" },
      { code: "RES_001", message: "Paciente não encontrado" },
    ];

    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];

    // Track erro de teste
    trackError(randomError, "test_error");

    handleError(randomError, {
      operation: "test_error",
      userId: "current_user_id",
    });
  };

  const handleTestSuccess = () => {
    handleSuccess(
      {
        message: "Operação de teste realizada com sucesso!",
        action: "test_success",
        resource: "test",
      },
      { userId: "current_user_id" },
    );
  };

  const handleTestWarning = () => {
    handleWarning(
      {
        message: "Este é um aviso de teste para demonstrar o sistema.",
        action: "test_warning",
      },
      { userId: "current_user_id" },
    );
  };

  // ============================================================================
  // RENDERIZAÇÃO
  // ============================================================================

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sistema de Tratamento de Erros</h1>
        <p className="text-muted-foreground">
          Exemplo de uso do sistema profissional de gerenciamento de erros
        </p>
      </div>

      {/* Formulário de Paciente */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Pacientes</CardTitle>
          <CardDescription>
            Teste as operações CRUD com tratamento automático de erros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="refId">Número de Prontuário</Label>
              <Input
                id="refId"
                value={patientRefId}
                onChange={(e) => setPatientRefId(e.target.value)}
                placeholder="Ex: 12345"
              />
            </div>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={patientBirthDate}
                onChange={(e) => setPatientBirthDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCreatePatient}
              disabled={createPatientMutation.isPending}
            >
              {createPatientMutation.isPending
                ? "Criando..."
                : "Criar Paciente"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSearchPatient}
              disabled={getPatientQuery.isFetching}
            >
              {getPatientQuery.isFetching ? "Buscando..." : "Buscar Paciente"}
            </Button>
          </div>

          {/* Resultado da busca */}
          {getPatientQuery.data && (
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Paciente Encontrado:
              </h4>
              <p className="text-green-700 dark:text-green-300">
                {getPatientQuery.data.name} - Prontuário:{" "}
                {getPatientQuery.data.refId}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Testes de Erro */}
      <Card>
        <CardHeader>
          <CardTitle>Testes de Sistema</CardTitle>
          <CardDescription>
            Teste diferentes tipos de erro e sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleTestError}>
              Testar Erro
            </Button>
            <Button variant="default" onClick={handleTestSuccess}>
              Testar Sucesso
            </Button>
            <Button variant="outline" onClick={handleTestWarning}>
              Testar Aviso
            </Button>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">
              Funcionalidades Demonstradas:
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Tratamento automático de erros tRPC</li>
              <li>• Validação de formulários</li>
              <li>• Notificações toast personalizadas</li>
              <li>• Tracking para Vercel Analytics</li>
              <li>• Logs estruturados para debugging</li>
              <li>• Diferentes tipos de erro (validação, auth, DB, etc.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Status das Operações */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Operações</CardTitle>
          <CardDescription>
            Monitoramento em tempo real das operações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Criar Paciente:</span>
              <span
                className={
                  createPatientMutation.isPending
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {createPatientMutation.isPending ? "Executando..." : "Pronto"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Buscar Paciente:</span>
              <span
                className={
                  getPatientQuery.isFetching
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {getPatientQuery.isFetching ? "Executando..." : "Pronto"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
