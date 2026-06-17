import { dbConnect } from "@/app/lib/mongo"
import { User } from "@/app/model/user-model";
import { NextResponse } from "next/server";

interface RequestBody {
    bio:string
    name:string,
}

interface Params  {
    params: {id:string}
}


export const POST = async(request: Request, {params}: Params)=>{
  const { bio, name }  = await request.json() as RequestBody

  await dbConnect();

 
  
  try{
 const newBio = await User.findByIdAndUpdate(params.id, {$set: { bio, name}}, {new:true})
   if(!newBio){
      return NextResponse.json(
        { success: false, message: "User not found," },
        { status: 404 }
      );
   }
      return NextResponse.json({ success: true, data: newBio }, { status: 201 });
   
  }catch (e) {
      const message = e instanceof Error ? e.message : "Internal Server Error";
      return new NextResponse(message, {
        status: 500,
      });
    }

}