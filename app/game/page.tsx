import React, { Suspense } from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "../Logout";
import GameToast from "./GameToast";
import { Session } from "next-auth";
import GameSidebar from "./GameSidebar";
import { useBooks } from "../context/page";
import { User } from "../model/user-model";
import { dbConnect } from "../lib/mongo";
const GamePage = async () => {
  const session = await auth();


  if (!session?.user) redirect("/Login");

   await dbConnect();
  const user = await User.findById(session.user.id);

  return (
    <>
      <Suspense fallback={null}>
        <GameToast /> {/* useSearchParams() requires this */}
      </Suspense>
      {/* {session?.user?.name} */}

      <div className="bg-[#F2F2F2]">
        <GameSidebar name={user?.name} email={session.user.email}  image={session.user.image} id={session.user.id} bio={user?.bio}  />
      </div>
    </>
  );
};

export default GamePage;
