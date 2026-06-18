"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import books from "../../../public/books.png";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Section = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className=" bg-[#D3D3FF] h-90 max-md:h-full  mt-6"
      >
        <div className="max-w-[1100px] m-auto flex max-md:justify-center max-md:items-center h-full max-md:flex-col">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
        h-full
        py-14
        max-md:py-6
        
        flex-1"
          >
            <p className=" lg:text-xl text-[14px] max-sm:text-[18px] font-oldstandard w-50 lg:w-125 max-sm:px-5 lg:px-0 px-3 max-md:w-full ">
              Books have always been the quietest way to change everything — how
              you think, how you see the world, how you understand the people
              around you. At Know More, we believe that the right book at the
              right time can open doors you didnt even know were closed.
            </p>
             <Link href='/components/pages/Collections/'>
            <button className="border font-oldstandard text-xl h-12 w-70 mt-8 rounded-md hover:text-white cursor-pointer hover:bg-black hover max-sm:ml-5 max-sm:h-15 max-sm:text-[20px]">
              Browse collections
            </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
          
         h-full
        flex-1"
          >
            <Image
              src={books}
              alt="books"
              className="object-cover h-full"
            ></Image>
          </motion.div>
        </div>
      </motion.div>
            <Marquee speed={50} autoFill={true} gradient={false} pauseOnHover={true}>
                   <div className="h-50 w-50 mx-2 text-center flex flex-col mt-5 gap-1.5 bg-[white] rounded-md">
                     <span className="text-2xl font-oldstandard">Enjoy</span>
                     <span className="text-2xl font-extrabold  font-baloo">20%</span>
                     <span className="text-2xl  font-oldstandard">off</span>
                     <span className="text-2xl  font-oldstandard">on our</span>
                     <span className="text-2xl  font-oldstandard">New Arrivals</span>
                   </div>
                 </Marquee>
    </section>
  );
};

export default Section;
