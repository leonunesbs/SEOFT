"use client";

import { Calendar, EyeIcon, FileText, Plus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function AntivegfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AntiVEGF</h1>
          <p className="mt-2 text-muted-foreground">
            Gerenciamento de indicações e agendamentos de injeções intravítreas
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/antivegf/indications/new">
              <Plus className="mr-2 h-4 w-4" />
              Nova Indicação
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/antivegf/nir-evaluation">
              <EyeIcon className="mr-2 h-4 w-4" />
              Avaliação NIR
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Navegação Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/antivegf/indications">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Indicações</h3>
                      <p className="font-light text-muted-foreground">
                        Gerenciar indicações de injeções
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/antivegf/appointments">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Agendamentos</h3>
                      <p className="font-light text-muted-foreground">
                        Gerenciar agendamentos por data
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/antivegf/schedule-management">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Gestão de Horários
                      </h3>
                      <p className="font-light text-muted-foreground">
                        Visualizar agendamentos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/antivegf/schedule-management/capacity">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Settings className="h-8 w-8 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Configurar Capacidades
                      </h3>
                      <p className="font-light text-muted-foreground">
                        Gerenciar horários e capacidades
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      {children}
    </div>
  );
}
