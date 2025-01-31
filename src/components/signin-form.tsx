import { useMutation } from "@tanstack/react-query";
import { Droplet } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
	email: z.string().email(),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [searchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: searchParams.get("email") ?? "",
		},
	});

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	});

	async function handleAuthenticate({ email }: SignInSchema) {
		try {
			await authenticate({ email });

			toast.success("Enviamos um link de autenticação para o seu email.", {
				action: {
					label: "Reenviar",
					onClick: () => authenticate({ email }),
				},
			});
		} catch (error) {
			toast.error("Ocorreu um erro, tente novamente.");
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(handleAuthenticate)}>
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
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								placeholder="Insira seu endereço de e-mail"
								required
								{...register("email")}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							Continuar
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
