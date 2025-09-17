"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  type LoginSchema,
  loginSchema,
  type RegisterSchema,
  registerSchema,
} from "@/schemas/auth/auth.schema";
import { createClient } from "@/utils/supabase/server";

export async function login(values: LoginSchema) {
  const supabase = await createClient();

  const data = await loginSchema.parseAsync(values);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  // Obtener el rol del usuario desde profiles (fuente de verdad)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect("/error");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role as "worker" | "employer" | undefined;
  const destination =
    role === "employer" ? "/dashboard/employer" : "/dashboard/worker";

  revalidatePath(destination, "layout");
  redirect(destination);
}

export async function signup(values: RegisterSchema) {
  const supabase = await createClient();

  const data = await registerSchema.parseAsync(values);

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.full_name,
        role: data.role,
        email: data.email,
      },
    },
  });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/sign-up-success");
}
