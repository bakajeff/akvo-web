import { Droplet } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Droplet className="size-6" />
              </div>
              <span className="sr-only">Akvo.</span>
            </a>
            <h1 className="text-xl font-bold">Bem vindo ao Akvo.</h1>
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Insira seu endereço de e-mail"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
