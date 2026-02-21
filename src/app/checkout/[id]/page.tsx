"use client";
import { useState } from "react";
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
import { checkoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema";
import { useParams, useRouter } from "next/navigation";
import { CheckPayment } from "@/checkoutActions/checkout.action";
import { CreateCashOrder } from "@/checkoutActions/createCashPayment.action";
interface OrderSuccessResponse {
  data?: {
    _id?: string;
    id?: string;
  };
  orderId?: string;
}
export default function CartCheckoutDetails() {
  const router = useRouter();
  const params = useParams();
  const cartId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutSchemaType>({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const { handleSubmit, control } = form;

  async function handleOnlineCheckout(values: CheckoutSchemaType) {
    setIsSubmitting(true);
    try {
      const res = await CheckPayment(cartId, values);
      console.log(res);
      if (res?.status === "success") {
        toast.success("Redirecting to payment...");
        sessionStorage.setItem("visa_flow", "true");
        window.location.href = res.session.url;
      } else {
        toast.error(res?.message || "Visa payment failed.");
      }
    } catch {
      toast.error("Checkout error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCashPayment(values: CheckoutSchemaType) {
    setIsSubmitting(true);
    try {
      const res = await CreateCashOrder(cartId, values);


      if (res?.status === "success" || res?.message?.includes("no cart")) {
        toast.success("Order processed successfully!");

        const responseData = res as unknown as OrderSuccessResponse;

        const finalId =
          responseData.data?._id ||
          responseData.data?.id ||
          responseData.orderId;

        if (finalId) {
          router.push(`/allorders/${finalId}`);
        } else {
          router.push("/allorders");
        }
      }
    } catch (error) {
      console.error("Cash Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md px-6 py-9 bg-white rounded-4xl shadow-2xl border-t-8 border-emerald-600">
        <h1 className="text-3xl font-black mb-6 text-emerald-900 border-b pb-4 uppercase tracking-tighter">
          Checkout Details
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {["details", "phone", "city"].map((fieldName) => (
            <FieldGroup key={fieldName}>
              <Controller
                name={fieldName as keyof CheckoutSchemaType}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel className="capitalize font-bold text-gray-600 mb-1">
                      {fieldName}
                    </FieldLabel>
                    <Input
                      {...field}
                      className="py-6 rounded-xl border-gray-200 focus:border-emerald-500"
                      placeholder={`Enter your ${fieldName}...`}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-500 text-xs mt-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          ))}
          <div className="pt-6 flex flex-col gap-4">
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(handleOnlineCheckout)}
              className="w-full bg-emerald-900 text-white py-7 rounded-2xl font-black text-lg"
            >
              {isSubmitting ? "Processing..." : "Pay with Visa"}
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(handleCashPayment)}
              className="w-full bg-white border-2 border-emerald-900 text-emerald-900 py-7 rounded-2xl font-black text-lg"
            >
              {isSubmitting ? "Processing..." : "Confirm Cash Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
