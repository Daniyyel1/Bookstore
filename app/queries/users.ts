import  { User }   from "../model/user-model";

interface userInput {
  name:string,
  email:string,
  password:string,
  bio:string
}

export async function CreateUser (user: userInput){
    try{
        await User.create(user);
    }catch(e){
        console.error(e)
    }
  

    
}