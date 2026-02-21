"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";


const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: { email: string }) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values,
      );

      if (data.statusMsg === "success") {
        toast.success("Reset code sent to your email");
        router.push("/verifyCode");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 antialiased px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <KeyRound size={32} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">
            Forgot Password?
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            {"No worries, we'll send you reset instructions."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Field>
            <FieldLabel className="text-xs font-black uppercase tracking-widest text-gray-400">
              Email Address
            </FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                {...register("email")}
                placeholder="name@example.com"
                className="pl-10 py-6 rounded-xl border-gray-100 focus:ring-emerald-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.email.message as string}
              </p>
            )}
          </Field>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-emerald-900 hover:bg-black text-white py-7 rounded-2xl font-black text-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            {isLoading ? "Sending Code..." : "SEND RESET CODE"}
          </Button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-emerald-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
