import { dbConnect } from "@/app/lib/mongo";
import feedModel from "@/app/model/feed-model";
import { NextResponse } from "next/server";

interface FeedBack {
  email: string;
}

export const POST = async (request: Request) => {
  const { email } = (await request.json()) as FeedBack;

  await dbConnect();

  try {
    const addFeedback = await feedModel.insertOne({email});
    if (!addFeedback) {
      return NextResponse.json({ status: 500 });
    }
    return NextResponse.json(
      { success: true, data: addFeedback },
      { status: 201 },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return new NextResponse(message, {
      status: 500,
    });
  }
};
