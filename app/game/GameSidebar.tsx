// GameSidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Logout from "../Logout";
import Image from "next/image";
import { motion } from "framer-motion";
import UpdateProfile from "../components/subpages/UpdateProfile";
import axios from "axios";
import { toast } from "sonner";
import Order from "../components/subpages/Order";

type Props = {
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  image?: string | null;
 id?:string | null
};

const GameSidebar = ({ name, email, bio, image, id }: Props) => {
  const [selected, setSelected] = useState("Home");
  


  return (
    <section className="">
      <div className="grid grid-cols-[150px_1fr]  max-w-290 mx-auto font-oldstandard py-10 gap-7">
        <div className=" h-screen  bg-[#F2F2F2] rounded-md">
          <div className="flex flex-col space-y-10 justify-center items-center mt-8">
            <button
              onClick={() => setSelected("Home")}
              className={`${selected === "Home" ? "bg-[#D3D3FF] h-10 w-35 font-bold rounded-md cursor-pointer transition-all duration-300 " : "h-10 w-35 cursor-pointer transition-all duration-300 text-xl"}`}
            >
              Home
            </button>
            <button
              className={`${selected === "Edit Profile" ? "bg-[#D3D3FF] h-10 w-35 font-bold rounded-md transition-all duration-300 cursor-pointer" : "h-10 w-35 cursor-pointer  transition-all duration-300 text-xl"}`}
              onClick={() => setSelected("Edit Profile")}
            >
              Edit Profile
            </button>
            <button
              className={`${selected === "Order History" ? "bg-[#D3D3FF] h-10 w-35 font-bold rounded-md transition-all duration-300 cursor-pointer" : "h-10 w-35 cursor-pointer  transition-all duration-300 text-xl "}`}
              onClick={() => setSelected("Order History")}
            >
              Order History
            </button>
            <Logout />
          </div>
        </div>

        <div className="py-10">
          {selected === "Home" && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-5">
                {image ? (
                  <div className="flex justify-center items-center">
                    <div className="h-30 w-30 rounded-full border flex justify-center items-center">
                      <Image
                        className="h-full w-full object-cover rounded-full"
                        width={20}
                        height={20}
                        src={image ?? "/avatar"}
                        alt={image ?? "/avatar"}
                      ></Image>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <div className="h-50 w-50 rounded-full border flex justify-center items-center bg-black"></div>
                  </div>
                )}

                <div className="px-5 gap-6 flex justify-between items-center">
                  <h1>Name:</h1>
                  <div className=" p-4 rounded-md h-30 w-full bg-[#D3D3FF]">
                    <h1 className="font-bold text-2xl">{name}</h1>
                  </div>
                </div>
                <div className="px-5 gap-10 flex justify-between items-center">
                  <h1>Bio:</h1>
                  <div className=" p-4 rounded-md h-30 w-full bg-[#D3D3FF]">
                    <h1 className="font-bold text-2xl">
                       {bio ? (<div>
                          <h1 className="text-2xl font-bold">{bio}</h1>
                       </div>): (<div>
                          <h1 className="opacity-10">Save a bio</h1>
                       </div>)}
                    </h1>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="py-10">
            {selected === "Edit Profile" && (
              <UpdateProfile id={id ?? ''}/>
            )}
          </div>

           <div>
               {selected === 'Order History' && (
                <div>
                    <Order />
                </div>
               )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default GameSidebar;
