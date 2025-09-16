"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import {
  loginSchema,
  type LoginSchema,
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/auth.schema";

export async function login(values: LoginSchema) {
  const supabase = await createClient();

  const data = await loginSchema.parseAsync(values);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(values: RegisterSchema) {
  const supabase = await createClient();

  const data = await registerSchema.parseAsync(values);
  console.log({ data });

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
