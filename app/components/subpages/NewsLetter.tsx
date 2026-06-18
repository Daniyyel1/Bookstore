"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!email) {
       toast.error('Please enter your email')
       return;
    }

     setLoading(true);


    const payload = {
      email,
    };

    try {
      const response = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        toast.success("Thank you for subscribing to our Newsletter");
      } else {
        toast.error("something went wrong, Please try again");
      }
    } catch (e) {
      console.error(e);
    }finally{
      setLoading(false)
    }

     setEmail('');
  };

    // useEffect(() =>{
    //   const timer = setTimeout(()=>{
    //      setLoading(false)
    //   }, 3000)

    //   return clearTimeout(timer)

    // }, [])


  return (
    <section>
      <div className="bg-[#D3D3FF] h-60 max-sm:h-full mt-5">
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
          <div className="flex justify-center items-center ">
            <div className="mt-4">
              <form
                onSubmit={handleSubmit}
                className="max-sm:flex max-sm:flex-col gap-3.5"
              >
                <input
                  className="border h-15 w-150 max-sm:w-86 outline-0 px-2.5"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-15 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:ml-9 w-60 max-sm:w-70 border text-white cursor-pointer bg-[black] text-xl hover:border hover:bg-transparent hover:text-black"
                >
                  {loading ? (
                  <div className="flex justify-center items-center">
                    <LoaderIcon
                      role="status"
                      aria-label="Loading"
                      className="size-4"
                    />
                  </div>
                ) : (
                  "Subscribe"
                )}
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
