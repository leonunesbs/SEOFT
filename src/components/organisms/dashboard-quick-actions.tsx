"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  MdOutlineArchive,
  MdOutlineLocalPharmacy,
  MdOutlineNotes,
  MdOutlinePersonAdd,
  MdOutlineSearch,
  MdOutlineSettings,
  MdOutlineSpeed,
} from "react-icons/md";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export function DashboardQuickActions() {
  const quickActions = [
    {
      title: "Novo Paciente",
      description: "Adicionar paciente e iniciar avaliação",
      icon: <MdOutlinePersonAdd className="h-5 w-5" />,
      action: (
        <Link href="/patients/add">
          <Button size="sm">Adicionar</Button>
        </Link>
      ),
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Buscar Paciente",
      description: "Localizar paciente existente",
      icon: <MdOutlineSearch className="h-5 w-5" />,
      action: (
        <Link href="/patients/search">
          <Button variant="outline" size="sm">
            Buscar
          </Button>
        </Link>
      ),
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Avaliações Pendentes",
      description: "Ver avaliações em andamento",
      icon: <MdOutlineArchive className="h-5 w-5" />,
      action: (
        <Link href="/evaluations/pending">
          <Button variant="outline" size="sm">
            Ver Pendentes
          </Button>
        </Link>
      ),
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Notas Rápidas",
      description: "Acessar sistema de notas",
      icon: <MdOutlineNotes className="h-5 w-5" />,
      action: (
        <Link href="/notes">
          <Button variant="outline" size="sm">
            Acessar
          </Button>
        </Link>
      ),
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Medicamentos",
      description: "Gerenciar medicamentos",
      icon: <MdOutlineLocalPharmacy className="h-5 w-5" />,
      action: (
        <Link href="/medications">
          <Button variant="outline" size="sm">
            Gerenciar
          </Button>
        </Link>
      ),
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Configurações",
      description: "Ajustar configurações do sistema",
      icon: <MdOutlineSettings className="h-5 w-5" />,
      action: (
        <Link href="/settings">
          <Button variant="outline" size="sm">
            Configurar
          </Button>
        </Link>
      ),
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-950",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdOutlineSpeed className="h-5 w-5" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${action.bgColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${action.bgColor}`}>
                    <div className={action.color}>{action.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">{action.action}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
