import React, { Suspense } from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import GameToast from "./GameToast";
import GameSidebar from "./GameSidebar";
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

      <div className="bg-[#F2F2F2] h-full">
        <GameSidebar name={user?.name}   image={session.user.image} id={session.user.id} bio={user?.bio}  />
      </div>
    </>
  );
};

export default GamePage;
