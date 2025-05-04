import { cn } from "@src/utils/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@hooks/useLoginForm";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { loading, error, handleSubmit } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Apple o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">Iniciar sesión con Apple</Button>
                <Button variant="outline" className="w-full">Iniciar sesión con Google</Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  O continúa con
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id="password" type="password" name="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <span className="mr-2 animate-spin">⏳</span>}
                  Iniciar sesión
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Regístrate
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        {error && (
          <p className="text-sm text-red-500 text-center mt-2">{error}</p>
        )}
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
