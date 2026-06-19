"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  book: {
    _id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "failed";
  createdAt: string;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setOrders(response.data.data);
        console.log(response);
      } else {
        toast.error("fail to get orders");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((od, i) => (
            <div key={od._id ?? i} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  {new Date(od.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full capitalize ${
                    od.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : od.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {od.status}
                </span>
              </div>

              {od.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 py-2 border-b last:border-0"
                >
                  <img
                    src={
                      item.book.image?.startsWith("/9j/")
                        ? `data:image/jpeg;base64,${item.book.image}`
                        : item.book.image || "/placeholder.jpg"
                    }
                    alt={item.book.title}
                    className="h-16 w-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="capitalize">{item.book.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-end mt-3 font-medium">
                Total: ${od.total.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
