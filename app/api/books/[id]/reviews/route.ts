import { dbConnect } from "@/app/lib/mongo";
import bookModel from "@/app/model/book-model";
import { NextResponse } from "next/server";

interface RequestBody {
  reviewer: string;
  comment: string;
  rating: number;
}

interface Params {
  params: Promise<{ id: string }>; // ✅ Promise
}


export const POST = async (request: Request, { params }: Params) => {
     const { id } = await params; // ✅ await it
    const { reviewer, comment, rating } = (await request.json()) as RequestBody;
  
  await dbConnect();

  try {
    const addReview = await bookModel.findByIdAndUpdate(
      id, 
      { $push: { reviews: { reviewer, comment, rating } } },
      { new: true },
    );
      console.log("updated book:", addReview); // ✅ check what comes back
  console.log("reviews after update:", addReview?.reviews)
     
      if (!addReview) {
      return NextResponse.json(
        { success: false, message: "cannot add a review" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, data: addReview },
      { status: 201 },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return new NextResponse(message, {
      status: 500,
    });
  }
};



