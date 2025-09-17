import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth/auth";
import { type LoginSchema, loginSchema } from "@/schemas/auth/auth.schema";

export default function useLogin() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
  };

  return { form, onSubmit, isLoading };
}
