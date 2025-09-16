import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  full_name: z.string({
    message: "Nombre completo inválido",
  }),
  email: z.email({
    message: "Email inválido",
  }),
  password: z
    .string({
      message: "Contraseña inválida",
    })
    .min(8, {
      message: "Contraseña inválida",
    }),
  role: z.string({
    message: "Rol inválido",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
