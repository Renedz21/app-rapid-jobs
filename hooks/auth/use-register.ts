import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/auth.schema";
import { signup } from "@/actions/auth/auth";

export default function useRegister() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      role: "worker",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: RegisterSchema) => {
    await signup(data);
  };

  return { form, onSubmit, isLoading };
}
