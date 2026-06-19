import { dbConnect } from "@/app/lib/mongo";
import OrderModel from "@/app/model/order-model";
import CartModel from "@/app/model/cart-model";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: Request) => {
  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  // verify the webhook is genuinely from Paystack
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  await dbConnect();

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    // mark order as paid
    const order = await OrderModel.findOneAndUpdate(
      { paystackReference: reference },
      { status: "paid" },
      { new: true }
    );

    // clear the user's cart
    if (order) {
      await CartModel.findOneAndUpdate(
        { userId: order.userId },
        { $set: { items: [] } }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
};