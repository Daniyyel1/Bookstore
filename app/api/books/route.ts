import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongo";
import bookModel from "@/app/model/book-model";

export async function GET() {
  try {
     await dbConnect();
    const books = await bookModel.find({});
    return NextResponse.json({ success: true, data: books }, { status: 200 });
  } catch (e) {
      const message = e instanceof Error ? e.message : "Internal Server Error";
      return new NextResponse(message, {
        status: 500,
      });
    }
}