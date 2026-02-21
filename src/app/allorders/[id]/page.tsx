"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Order } from "@/types/order.type";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrderDirectly() {
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);
        const response = await res.json();
        const allOrders: Order[] = response.data;

        const found = allOrders.find((o: Order) => String(o._id) === String(id));
        if (found) setOrder(found);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) getOrderDirectly();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (!order) return <div className="p-20 text-center text-red-600 font-bold">Order Not Found!</div>;

  return (
    <div className="max-w-3xl mx-auto my-12 p-0 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-emerald-800 p-8 text-white flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight">INVOICE</h1>
          <p className="text-emerald-200 text-sm mt-1">Order Ref: #{order._id}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">Cartopia Ltd.</p>
          <p className="text-xs text-emerald-100 italic">Thank you for your trust!</p>
        </div>
      </div>

      <div className="p-8">
        {/* Order Info */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Order Date</h3>
            <p className="font-semibold text-gray-800">
              {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Payment Method</h3>
            <p className="font-semibold text-emerald-700 capitalize">{order.paymentMethodType} Payment</p>
          </div>
        </div>

        {/* Table Header */}
        <div className="border-b-2 border-gray-100 pb-2 mb-4 hidden md:flex">
          <span className="w-1/2 text-gray-400 text-xs font-bold uppercase">Product</span>
          <span className="w-1/6 text-gray-400 text-xs font-bold uppercase text-center">Qty</span>
          <span className="w-1/6 text-gray-400 text-xs font-bold uppercase text-center">Price</span>
          <span className="w-1/6 text-gray-400 text-xs font-bold uppercase text-right">Total</span>
        </div>

        {/* Order Items */}
        <div className="space-y-6">
          {order.cartItems.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-center border-b border-gray-50 pb-4 last:border-0">
              <div className="w-full md:w-1/2 flex items-center gap-4">
                <Image width={500} height={500} src={item.product.imageCover} className="w-16 h-16 rounded-lg border object-cover shadow-sm" alt={item.product.title} />
                <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.product.title}</p>
              </div>
              <div className="w-full md:w-1/6 text-center text-gray-600 text-sm mt-2 md:mt-0">x{item.count}</div>
              <div className="w-full md:w-1/6 text-center text-gray-600 text-sm">{item.price} EGP</div>
              <div className="w-full md:w-1/6 text-right font-bold text-gray-800">{item.price * item.count} EGP</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-10 pt-6 border-t-2 border-gray-100 flex flex-col items-end">
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal:</span>
              <span>{order.totalOrderPrice} EGP</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Shipping:</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t">
              <span>Grand Total:</span>
              <span>{order.totalOrderPrice} EGP</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex gap-4 no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Print Invoice 🖨️
          </button>
          <button
            onClick={() => window.location.href = '/allorders'}
            className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            Back to Orders
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 text-center">
        <p className="text-xs text-gray-400">If you have any questions, please contact our support team at support@Cartopia.com</p>
      </div>

      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { padding: 0; background: white; }
          .max-w-3xl { max-width: 100%; border: none; shadow: none; }
        }
      `}</style>
    </div>
  );
}