"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Phone, User, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const { handleSubmit } = form;

  function handleRegister(values: RegisterSchemaType) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        if (response.data.message) {
          toast.success("Account created successfully!", { position: "top-center" });
          router.push("/login");
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Registration failed";
        toast.error(errorMsg, { position: "top-center" });
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 antialiased py-12 px-4">
      <div className="w-full max-w-137.5 bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase">Join Us</h1>
          <p className="text-gray-500 font-medium mt-2">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          <FieldGroup className="grid grid-cols-1 gap-5">
            
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="pl-12 py-6 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white transition-all duration-300"
                    />
                  </div>
                  {fieldState.invalid && fieldState.isTouched && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Email & Phone (Grid on larger screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <Input {...field} placeholder="mail@example.com" className="pl-11 py-6 rounded-2xl border-gray-100 bg-gray-50/30" />
                    </div>
                    {fieldState.invalid && fieldState.isTouched && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <Input {...field} placeholder="01xxxxxxxxx" className="pl-11 py-6 rounded-2xl border-gray-100 bg-gray-50/30" />
                    </div>
                    {fieldState.invalid && fieldState.isTouched && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <Input {...field} type={showPass ? "text" : "password"} placeholder="••••••••" className="pl-11 py-6 rounded-2xl border-gray-100 bg-gray-50/30" />
                    </div>
                    {fieldState.invalid && fieldState.isTouched && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <Input {...field} type={showPass ? "text" : "password"} placeholder="••••••••" className="pl-11 py-6 rounded-2xl border-gray-100 bg-gray-50/30" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {fieldState.invalid && fieldState.isTouched && <FieldError className="text-[10px] font-bold" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full bg-emerald-900 hover:bg-black text-white py-8 rounded-3xl font-black text-lg shadow-lg shadow-emerald-900/10 transition-all active:scale-[0.98] mt-4"
          >
            CREATE ACCOUNT
          </Button>

          <p className="text-center text-sm font-medium text-gray-500 pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-900 font-black hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}