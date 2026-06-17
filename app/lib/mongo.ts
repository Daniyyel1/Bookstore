
import mongoose from "mongoose";

export  async function dbConnect  (){
   
   try{
    const conn = await mongoose.connect(String(process.env.MONGO_DB_CONN_STRING))
    return conn;
   }catch(e){
     console.error(e)
   }
    
} 