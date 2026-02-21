"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShieldEllipsis, ArrowRight } from "lucide-react";

const schema = z.object({
  resetCode: z.string().min(1, "Reset code is required"),
});

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: { resetCode: string }) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      if (data.status === "Success") {
        toast.success("Code verified successfully!");
        router.push("/resetPassword");
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
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 text-center">

        <div className="mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldEllipsis size={32} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Verify Code</h1>
          <p className="text-gray-500 font-medium mt-2">
            Please enter the verification code sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 text-left">
            <Input
              {...register("resetCode")}
              placeholder="Enter Reset Code"
              className="py-8 rounded-2xl border-gray-100 focus:ring-emerald-500 text-center text-2xl font-black tracking-[0.5em] placeholder:tracking-normal placeholder:text-sm placeholder:font-medium uppercase"
            />
            {errors.resetCode && (
              <p className="text-red-500 text-xs font-bold text-center">
                {errors.resetCode.message as string}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-emerald-900 hover:bg-black text-white py-7 rounded-2xl font-black text-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            {isLoading ? "Verifying..." : (
              <>
                VERIFY CODE
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <p className="text-sm text-gray-400 font-medium">
            {" Didn't receive the code?"}
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-emerald-700 font-bold hover:underline"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}