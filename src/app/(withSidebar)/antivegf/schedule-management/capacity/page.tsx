"use client";

import {
  Calendar,
  Clock,
  Edit,
  Plus,
  Save,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

interface CapacityConfig {
  id: string;
  dayOfWeek: "MONDAY" | "TUESDAY" | "THURSDAY";
  shift: "MORNING" | "AFTERNOON";
  capacity: number;
  overbook: number;
}

const dayOfWeekLabels = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  THURSDAY: "Quinta-feira",
};

const shiftLabels = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
};

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Segunda-feira" },
  { value: "TUESDAY", label: "Terça-feira" },
  { value: "THURSDAY", label: "Quinta-feira" },
];

const shiftOptions = [
  { value: "MORNING", label: "Manhã" },
  { value: "AFTERNOON", label: "Tarde" },
];

export default function CapacityManagementPage() {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCapacity, setEditingCapacity] = useState<CapacityConfig | null>(
    null,
  );
  const [formData, setFormData] = useState({
    dayOfWeek: "MONDAY" as "MONDAY" | "TUESDAY" | "THURSDAY",
    shift: "AFTERNOON" as "MORNING" | "AFTERNOON",
    capacity: 30,
    overbook: 2,
  });

  // Query para buscar configurações de capacidade
  const capacityQuery = api.schedule.getCapacityConfigs.useQuery();

  // Mutation para criar/atualizar configuração de capacidade
  const upsertCapacityMutation = api.schedule.upsertCapacityConfig.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Configuração de capacidade salva com sucesso",
        variant: "default",
      });
      setIsEditDialogOpen(false);
      setEditingCapacity(null);
      capacityQuery.refetch();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation para deletar configuração de capacidade
  const deleteCapacityMutation = api.schedule.deleteCapacityConfig.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Configuração de capacidade removida com sucesso",
        variant: "default",
      });
      capacityQuery.refetch();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (capacity: CapacityConfig) => {
    setEditingCapacity(capacity);
    setFormData({
      dayOfWeek: capacity.dayOfWeek,
      shift: capacity.shift,
      capacity: capacity.capacity,
      overbook: capacity.overbook,
    });
    setIsEditDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCapacity(null);
    setFormData({
      dayOfWeek: "MONDAY",
      shift: "AFTERNOON",
      capacity: 30,
      overbook: 2,
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCapacity) {
      // Atualizar configuração existente
      upsertCapacityMutation.mutate({
        id: editingCapacity.id,
        dayOfWeek: formData.dayOfWeek,
        shift: formData.shift,
        capacity: formData.capacity,
        overbook: formData.overbook,
      });
    } else {
      // Criar nova configuração
      upsertCapacityMutation.mutate({
        dayOfWeek: formData.dayOfWeek,
        shift: formData.shift,
        capacity: formData.capacity,
        overbook: formData.overbook,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover esta configuração?")) {
      deleteCapacityMutation.mutate({ id });
    }
  };

  const capacities = capacityQuery.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
            Gerenciamento de Horários e Capacidades
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Configure os horários disponíveis e capacidades para agendamentos
            AntiVEGF
          </p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Nova Configuração</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      {/* Resumo das configurações */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground dark:text-foreground/90">
            <Settings className="mr-2 h-5 w-5" />
            Resumo das Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50/50 p-4 dark:border-blue-800/30 dark:bg-blue-950/20">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    {capacities.length}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    Configurações Ativas
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-green-50/50 p-4 dark:border-green-800/30 dark:bg-green-950/20">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                    {capacities.reduce((sum, cap) => sum + cap.capacity, 0)}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    Capacidade Total
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-purple-50/50 p-4 dark:border-purple-800/30 dark:bg-purple-950/20">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                    {capacities.reduce((sum, cap) => sum + cap.overbook, 0)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-300">
                    Vagas Extras (Overbook)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de configurações */}
      <Card className="border-border/50 bg-card dark:border-border/30 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-foreground/90">
            Configurações de Capacidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          {capacityQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground dark:text-muted-foreground/70">
                Carregando configurações...
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 dark:border-border/30">
                    <TableHead className="text-foreground dark:text-foreground/90">
                      Dia da Semana
                    </TableHead>
                    <TableHead className="text-foreground dark:text-foreground/90">
                      Turno
                    </TableHead>
                    <TableHead className="text-foreground dark:text-foreground/90">
                      Capacidade
                    </TableHead>
                    <TableHead className="text-foreground dark:text-foreground/90">
                      Vagas Extras
                    </TableHead>
                    <TableHead className="text-foreground dark:text-foreground/90">
                      Capacidade Total
                    </TableHead>
                    <TableHead className="text-right text-foreground dark:text-foreground/90">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {capacities.map((capacity) => (
                    <TableRow
                      key={capacity.id}
                      className="border-border/30 hover:bg-muted/50 dark:border-border/20 dark:hover:bg-muted/30"
                    >
                      <TableCell className="text-foreground dark:text-foreground/90">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                          {dayOfWeekLabels[capacity.dayOfWeek]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-border/50 dark:border-border/30"
                        >
                          {shiftLabels[capacity.shift]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-foreground/90">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground dark:text-muted-foreground/70" />
                          {capacity.capacity} pacientes
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="border-border/50 dark:border-border/30"
                        >
                          +{capacity.overbook} vagas
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-foreground/90">
                        <div className="font-medium">
                          {capacity.capacity + capacity.overbook} pacientes
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(capacity)}
                            className="border-border/50 hover:bg-muted/50 dark:border-border/30 dark:hover:bg-muted/30"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border/50 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-border/30 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                            onClick={() => handleDelete(capacity.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {capacities.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center">
                        <div className="text-muted-foreground dark:text-muted-foreground/70">
                          Nenhuma configuração encontrada. Clique em &quot;Nova
                          Configuração&quot; para começar.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para editar/criar configuração */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="border-border/50 bg-background dark:border-border/30 dark:bg-background/50 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-foreground/90">
              {editingCapacity ? "Editar Configuração" : "Nova Configuração"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground dark:text-muted-foreground/70">
              Configure o dia da semana, turno e capacidade para agendamentos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dayOfWeek" className="text-right">
                Dia
              </Label>
              <Select
                value={formData.dayOfWeek}
                onValueChange={(value: "MONDAY" | "TUESDAY" | "THURSDAY") =>
                  setFormData({ ...formData, dayOfWeek: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dayOfWeekOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift" className="text-right">
                Turno
              </Label>
              <Select
                value={formData.shift}
                onValueChange={(value: "MORNING" | "AFTERNOON") =>
                  setFormData({ ...formData, shift: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shiftOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacidade
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="100"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="overbook" className="text-right">
                Vagas Extras
              </Label>
              <Input
                id="overbook"
                type="number"
                min="0"
                max="10"
                value={formData.overbook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overbook: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={upsertCapacityMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {upsertCapacityMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
