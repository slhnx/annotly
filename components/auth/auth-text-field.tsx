"use client"

import * as React from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/auth/password-input"

interface AuthTextFieldProps<TValues extends FieldValues> {
  control: Control<TValues>
  name: FieldPath<TValues>
  label: string
  type: "text" | "email" | "password"
  autoComplete: string
  placeholder: string
  disabled?: boolean
  labelAction?: React.ReactNode
}

const AUTH_INPUT_CLASS = "h-11 px-3.5 text-xs"

export function AuthTextField<TValues extends FieldValues>({
  control,
  name,
  label,
  type,
  autoComplete,
  placeholder,
  disabled,
  labelAction,
}: AuthTextFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {labelAction ? (
            <div className="flex items-center justify-between">
              <FormLabel>{label}</FormLabel>
              {labelAction}
            </div>
          ) : (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            {type === "password" ? (
              <PasswordInput
                {...field}
                autoComplete={autoComplete}
                placeholder={placeholder}
                disabled={disabled}
                className={AUTH_INPUT_CLASS}
              />
            ) : (
              <Input
                {...field}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                disabled={disabled}
                className={AUTH_INPUT_CLASS}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
