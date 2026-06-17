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
        className=" bg-[#D3D3FF] h-90  mt-6"
      >
        <div className="max-w-[1100px] m-auto flex h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
        h-full
        py-14
        
        flex-1"
          >
            <p className=" text-xl font-oldstandard w-125">
              Books have always been the quietest way to change everything — how
              you think, how you see the world, how you understand the people
              around you. At Know More, we believe that the right book at the
              right time can open doors you didnt even know were closed.
            </p>
             <Link href='/components/pages/Collections/'>
            <button className="border font-oldstandard text-xl h-12 w-70 mt-8 rounded-md hover:text-white cursor-pointer hover:bg-black hover">
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
