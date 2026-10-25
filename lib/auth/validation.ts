import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Please enter your password"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
})

export type SignupInput = z.infer<typeof signupSchema>

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Please enter your new password")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
