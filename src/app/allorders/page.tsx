"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Order } from "@/types/order.type";

export default function AllOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndRedirect() {
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);
        const result = await res.json();
        const userOrders = result.data;

        if (sessionStorage.getItem("visa_flow") === "true") {
          sessionStorage.removeItem("visa_flow"); 
          if (userOrders && userOrders.length > 0) {
            router.replace(`/allorders/${userOrders[0]._id}`);
            return;
          }
        }
        setOrders(userOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAndRedirect();
  }, [router]);

  if (loading) return <div className="p-20 text-center font-bold">Checking orders status...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-black mb-8">All Orders History</h1>
      <div className="grid gap-4">
        {orders.map((order: Order) => (
          <div key={order._id} className="p-6 bg-white border rounded-2xl flex justify-between items-center shadow-sm">
            <span>Order #{order.id} - {order.totalOrderPrice} EGP</span>
            <Link href={`/allorders/${order._id}`} className="text-emerald-700 font-bold underline">View Invoice</Link>
          </div>
        ))}
      </div>
    </div>
  );
}