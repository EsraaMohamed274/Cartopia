"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema";
import { useParams, useRouter } from "next/navigation";
import { CheckPayment } from "@/checkoutActions/checkout.action";
import { CreateCashOrder } from "@/checkoutActions/createCashPayment.action";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CheckoutResponse {
  status: string;
  orderId?: string;
  data?: {
    _id: string;
  };
  message?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { id: cartId } = useParams();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { details: "", phone: "", city: "" }
  });

  // --- Visa Logic ---
  const onVisaSubmit = async (values: CheckoutSchemaType) => {
    setLoading(true);
    try {
      const res = await CheckPayment(cartId as string, values);
      if (res?.status === "success") {
        sessionStorage.setItem("payment_type", "visa");
        window.location.href = res.session.url;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Cash Logic ---
  const onCashSubmit = async (values: CheckoutSchemaType) => {
    setLoading(true);
    try {
      const res = await CreateCashOrder(cartId as string, values);
      if (res?.status === "success") {
        toast.success("Order Placed Successfully!");

        const successRes = res as CheckoutResponse;

        const finalOrderId = successRes.data?._id || successRes.orderId;

        if (finalOrderId) {
          router.push(`/allorders/${finalOrderId}`);
        } else {
          router.push("/allorders");
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <h1 className="text-3xl font-black mb-8 text-emerald-900 uppercase tracking-tighter">Checkout</h1>
      <form className="space-y-4">
        {["details", "phone", "city"].map((key) => (
          <Controller
            key={key}
            name={key as keyof CheckoutSchemaType}
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`Enter ${key}...`} className="py-6 rounded-xl" />
            )}
          />
        ))}
        <div className="flex flex-col gap-3 pt-6">
          <Button onClick={handleSubmit(onVisaSubmit)} disabled={loading} className="bg-emerald-800 py-7 rounded-2xl font-bold shadow-lg">
            {loading ? "Redirecting..." : "PAY ONLINE (VISA)"}
          </Button>
          <Button onClick={handleSubmit(onCashSubmit)} disabled={loading} variant="outline" className="py-7 rounded-2xl font-bold border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50">
            CASH ON DELIVERY
          </Button>
        </div>
      </form>
    </div>
  );
}