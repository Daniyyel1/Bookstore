import { auth } from "@/app/auth"
import { dbConnect } from "@/app/lib/mongo";
import orderModel from "@/app/model/order-model";
import { NextResponse } from "next/server";


export const GET = async()=>{

 const session = await auth();

 
    if(!session){
        return NextResponse.json({success:false, message:'unathorized'}, {status:500});
    }

    await dbConnect();

    const orders = await orderModel.find({userId: session?.user.id}).populate("items.book",);

    return NextResponse.json({success:true, data:orders}, {status:200})
 

}