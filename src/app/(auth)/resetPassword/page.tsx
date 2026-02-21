"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  newPassword: z
    .string()
    .nonempty("Password is required")
    .min(8, "Minimum 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number and special character"),
});

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      if (data.token) {
        toast.success("Password updated successfully! Redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Reset failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 antialiased px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">New Password</h1>
          <p className="text-gray-500 font-medium mt-2">Set a strong password to protect your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field (Required by this API) */}
          <Field>
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Confirm Email</FieldLabel>
            <Input
              {...register("email")}
              placeholder="Enter your email"
              className="py-6 rounded-xl border-gray-100 focus:ring-emerald-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email.message as string}</p>}
          </Field>

          {/* New Password Field */}
          <Field>
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">New Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <Input
                {...register("newPassword")}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 py-6 rounded-xl border-gray-100 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-emerald-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1 font-bold">{errors.newPassword.message as string}</p>}
          </Field>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-emerald-900 hover:bg-black text-white py-7 rounded-2xl font-black text-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95 mt-4"
          >
            {isLoading ? "Updating..." : "UPDATE PASSWORD"}
          </Button>
        </form>
      </div>
    </div>
  );
}