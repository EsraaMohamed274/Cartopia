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
import { changePasswordSchema, ChangePasswordType } from "@/schema/changePassword.schema";
import { changePasswordAction } from "@/api/changePassword.api";
import { Lock, ShieldCheck, Eye, EyeOff, Save } from "lucide-react";

export default function ChangePassword() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const form = useForm<ChangePasswordType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = form;

  async function handlePasswordChange(values: ChangePasswordType) {
    const result = await changePasswordAction(values);

    if (result.status === "success") {
      toast.success(result.message, { position: "top-center" });
      reset(); 
    } else {
      toast.error(result.message, { position: "top-center" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 antialiased px-4">
      <div className="w-full max-w-112.5 bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Security</h1>
          <p className="text-gray-500 font-medium mt-2">Update your account password</p>
        </div>

        <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-6">
          <FieldGroup className="space-y-4">
            
            {/* Current Password */}
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-2">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      type={showCurrentPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300"
                    />
                    <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError className="text-xs font-bold mt-1" errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* New Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-2">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      type={showNewPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300"
                    />
                    <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError className="text-xs font-bold mt-1" errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Confirm New Password */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-2">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300"
                    />
                  </div>
                  {fieldState.invalid && <FieldError className="text-xs font-bold mt-1" errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-900 hover:bg-black text-white py-8 rounded-3xl font-black text-lg shadow-lg transition-all active:scale-[0.98] mt-4 flex gap-2"
          >
            {isSubmitting ? "UPDATING..." : <><Save size={20} /> UPDATE PASSWORD</>}
          </Button>
        </form>
      </div>
    </div>
  );
}