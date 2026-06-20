"use client";
import React, {  useState } from "react";
import Logout from "../Logout";
import Image from "next/image";
import { motion } from "framer-motion";
import UpdateProfile from "../components/subpages/UpdateProfile";
import Order from "../components/subpages/Order/page";
import Link from "next/link";
import { Home } from "lucide-react";

type Props = {
  name?: string | null;
  // email?: string | null;
  bio?: string | null;
  image?: string | null;
  id?: string | null;
};

const GameSidebar = ({ name, bio, id, image }: Props) => {
  const [selected, setSelected] = useState("Home");

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] max-w-290 mx-auto font-oldstandard py-6 md:py-10 gap-5 md:gap-7 px-4 md:px-0">
        <div className="md:h-screen bg-[#F2F2F2] rounded-md">
          <div className="flex flex-row md:flex-col flex-wrap justify-center items-center gap-4 md:space-y-10 md:gap-0 py-4 md:py-0 md:mt-8">
            <button
              onClick={() => setSelected("Home")}
              className={`${selected === "Home" ? "bg-[#D3D3FF] h-10 w-28 md:w-35 font-bold rounded-md cursor-pointer transition-all duration-300 text-sm md:text-base " : "h-10 w-28 md:w-35 cursor-pointer transition-all duration-300 text-sm md:text-xl"}`}
            >
              Home
            </button>
            <button
              className={`${selected === "Edit Profile" ? "bg-[#D3D3FF] h-10 w-28 md:w-35 font-bold rounded-md transition-all duration-300 cursor-pointer text-sm md:text-base" : "h-10 w-28 md:w-35 cursor-pointer  transition-all duration-300 text-sm md:text-xl"}`}
              onClick={() => setSelected("Edit Profile")}
            >
              Edit Profile
            </button>
            <button
              className={`${selected === "Order History" ? "bg-[#D3D3FF] h-10 w-28 md:w-35 font-bold rounded-md transition-all duration-300 cursor-pointer text-sm md:text-base" : "h-10 w-28 md:w-35 cursor-pointer  transition-all duration-300 text-sm md:text-xl "}`}
              onClick={() => setSelected("Order History")}
            >
              Order History
            </button>
            <Logout />
            <div className="absolute bottom-0 ">
               <Link className="flex text-[23px] hover:font-bold hover:text-[#D3D3FF] justify-center items-center gap-2" href='/'><Home />HomePage</Link>
            </div>
          </div>
        </div>

        <div className="py-6 md:py-10">
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
                    <div className="h-24 w-24 md:h-30 md:w-30 rounded-full border flex justify-center items-center">
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
                    <div className="h-36 w-36 md:h-50 md:w-50 rounded-full border flex justify-center items-center bg-black"></div>
                  </div>
                )}

                <div className="px-2 md:px-5 gap-3 md:gap-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h1>Name:</h1>
                  <div className=" p-4 rounded-md h-auto md:h-30 w-full bg-[#D3D3FF]">
                    <h1 className="font-bold text-xl md:text-2xl break-words">
                      {name}
                    </h1>
                  </div>
                </div>
                <div className="px-2 md:px-5 gap-3 md:gap-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h1>Bio:</h1>
                  <div className=" p-4 rounded-md h-auto md:h-30 w-full bg-[#D3D3FF]">
                    <h1 className="font-bold text-xl md:text-2xl break-words">
                      {bio ? (
                        <div>
                          <h1 className="text-xl md:text-2xl font-bold break-words">
                            {bio}
                          </h1>
                        </div>
                      ) : (
                        <div>
                          <h1 className="opacity-10">Save a bio</h1>
                        </div>
                      )}
                    </h1>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="py-6 md:py-10">
            {selected === "Edit Profile" && <UpdateProfile id={id ?? ""} />}
          </div>

          <div>
            {selected === "Order History" && (
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
