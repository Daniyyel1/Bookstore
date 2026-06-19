import { NextResponse } from "next/server";
import { CreateUser } from "@/app/queries/users";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  bio:string;
}

export const POST = async (request: Request) => {
  const { name, email, password, bio } = (await request.json()) as RequestBody;

  console.log(name, email, password);

  // create a db connection

  await dbConnect();


  // encrypt password

  const harshedPassword = await bcrypt.hash(password, 10);

  // db payload

  const newUser = {
    name,
    password: harshedPassword,
    email,
    bio
  };

  // update db

  try {
    await CreateUser(newUser);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return new NextResponse(message, {
      status: 500,
    });
  }


  return new NextResponse("User created successfully", {
    status: 201,
  });
};
