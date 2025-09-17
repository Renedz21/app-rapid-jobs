import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "@/actions/auth/auth";
import {
  type RegisterSchema,
  registerSchema,
} from "@/schemas/auth/auth.schema";

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
