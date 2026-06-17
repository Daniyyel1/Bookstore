"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section>
      <div className="bg-[#D3D3FF] h-60 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="py-8"
        >
          <h1 className="text-center font-oldstandard text-4xl">
            Join our Newsletter
          </h1>
          <p className="text-center font-oldstandard text-[20px]">
            Stay up to date with new arrivals and so much more.
          </p>
          <div className="flex justify-center items-center">
            <div className="mt-4">
              <form>
                <input
                  className="border h-15 w-150 outline-0 px-2.5"
                  type="email"
                  placeholder="Enter email address"
                />
                <button className="h-15 w-60 border text-white cursor-pointer bg-[black] text-xl hover:border hover:bg-transparent hover:text-black">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;
