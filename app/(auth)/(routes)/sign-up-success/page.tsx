import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full min-w-96 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            ¡Registro exitoso!
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tu cuenta ha sido creada correctamente
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Mail className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-primary">Revisa tu email</p>
                <p className="text-sm text-primary">
                  Te hemos enviado un enlace de confirmación
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace de
              confirmación para activar tu cuenta antes de iniciar sesión.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2"
              >
                Ir al inicio de sesión
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              ¿No recibiste el email? Revisa tu carpeta de spam
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
