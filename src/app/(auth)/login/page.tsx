"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const { handleSubmit } = form;

  async function handleLogin(values: LoginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    
    if (response?.ok) {
      toast.success("Welcome back!", { position: "top-center" });
      window.location.href = "/";
    } else {
      toast.error("Incorrect email or password", { position: "top-center" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 antialiased px-4">
      <div className="w-full max-w-112.5 bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase">Welcome</h1>
          <p className="text-gray-500 font-medium mt-2">Login to manage your Cartopia account</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <FieldGroup className="space-y-4">
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-2">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      placeholder="name@example.com"
                      className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
                      type="email"
                    />
                  </div>
                  {fieldState.invalid && fieldState.isTouched && (
                    <FieldError className="text-xs font-bold mt-1" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</FieldLabel>
                    <Link href="/forgetPassword" className="text-[12px] text-lg font-black text-emerald-700 uppercase tracking-tighter hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type={showPass ? "text" : "password"}
                      className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldState.invalid && fieldState.isTouched && (
                    <FieldError className="text-xs font-bold mt-1" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full bg-emerald-900 hover:bg-black text-white py-8 rounded-3xl font-black text-lg shadow-lg shadow-emerald-900/10 transition-all active:scale-[0.98] mt-4"
          >
            SIGN IN
          </Button>

          <div className="text-center space-y-3 pt-4">
            <p className="text-sm font-medium text-gray-500">
              New to Cartopia?{" "}
              <Link href="/register" className="text-emerald-900 font-black hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}