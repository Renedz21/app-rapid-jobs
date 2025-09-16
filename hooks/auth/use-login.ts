import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "@/schemas/auth/auth.schema";
import { login } from "@/actions/auth/auth";

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
