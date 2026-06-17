import { dbConnect } from "@/app/lib/mongo";
import CartModel from "@/app/model/cart-model";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";


// GET — fetch cart for logged in user
export const GET = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  await dbConnect();

  const cart = await CartModel.findOne({ userId: session.user?.id }).populate(
    "items.book",
  );

  return NextResponse.json({ success: true, data: cart }, { status: 200 });
};

// POST — add item to cart
export const POST = async (request: Request) => {
  const session = await auth();


  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
   
  }
    
  await dbConnect();

  const { bookId, quantity } = await request.json();

  let cart = await CartModel.findOne({ userId: session.user?.id });

  if (!cart) {
    // create a new cart if user doesn't have one
    cart = await CartModel.create({
      userId: session.user?.id,
      items: [{ book: bookId, quantity }],
    });
  } else {
    // check if book already in cart
    const existingItem = cart.items.find(
      (item: any) => String(item.book) === bookId,
    );

    if (existingItem) {
      existingItem.quantity += quantity; // increment quantity
    } else {
      cart.items.push({ book: bookId, quantity }); // add new item
    }

    await cart.save();
  }

  return NextResponse.json({ success: true, data: cart }, { status: 201 });
};
