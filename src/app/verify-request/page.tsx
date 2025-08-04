import { ArrowLeft, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Verifique seu email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Um link de acesso foi enviado para o seu endereço de email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Se você não recebeu o email, verifique sua pasta de spam ou tente
              fazer login novamente.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button asChild variant="outline">
              <Link
                href="/signin"
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
