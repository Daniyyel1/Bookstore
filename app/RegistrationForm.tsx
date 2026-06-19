"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderIcon, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { toast } from "sonner";
import Image from "next/image";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const isShown = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const bio = formData.get("bio")
    const password = formData.get("password");

    if (!name || !email || !password) {
      toast.error("fields cannot be empty");

      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          bio
        }),
      });
      if (response.status === 201) {
        alert("user created successfully");
        router.push("/");
      } else {
        setErrorMessage("fail to create user account");
      }
    } catch (e) {
      console.error(e);
    
    }  finally{
        setLoading(false)
      }
  };

   useEffect(() => {
    if (!errorMessage) return;
      const timer = setTimeout(() => setErrorMessage(""), 2000)
      return () => clearTimeout(timer)
    }, [errorMessage]);
  

  return (
    <section>
      <div className="flex items-center justify-center h-full p-6">
        <div className="flex-1 px-6 py-8 h-90 items-center">
          <h1 className="font-baloo text-4xl font-extrabold text-center">
            Register
          </h1>
          <p className="text-center">create new account</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <div
              className=" focus-within:bg-[#D3D3FF] border focus-within:border-0 flex justify-center items-center gap-2  h-10 w-full px-3 py-1.5 
            rounded-md 
          
            
             
             "
            >
              <UserRound />
              <input
                type="name"
                name="name"
                id="name"
                className="outline-0 w-full placeholder:text-[15px]"
                placeholder="Enter your name"
              />
            </div>
            <div className=" focus-within:bg-[#D3D3FF] focus-within:border-0 border  flex justify-center items-center gap-2 h-10 w-full px-3 py-1.5 rounded-md">
              <Mail />
              <input
                type="email"
                name="email"
                id="email"
                className="outline-0 w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className=" focus-within:bg-[#D3D3FF] focus-within:border-0 border  flex justify-center items-center gap-2 h-10 w-full px-3 py-1.5 rounded-md">
              
              <input
                type="bio"
                name="bio"
                id="bio"
                className="outline-0 w-full"
                placeholder="Enter your bio"
              />
            </div>
            <div className=" focus-within:bg-[#D3D3FF] focus-within:border-0 border flex justify-center items-center gap-2 h-10 w-full px-3 py-1.5 rounded-md">
              <Lock />
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
                className="outline-0 w-full"
                placeholder="Enter a strong password"
              />
              <div className="flex justify-end items-center">
                {isShowPassword ? (
                  <EyeOff onClick={isShown} />
                ) : (
                  <Eye onClick={isShown} />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="h-15 rounded-xl
               font-oldstandard
               text-xl
               w-full
               border-2
               bg-[black]
               text-white
               cursor-pointer
               hover:border-2
               hover:bg-transparent
               hover:text-black
               "
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
                  "Sign up"
                )}
              </button>
            </div>
          </form>
          <div className="py-7">
            <div className="flex justify-center items-center gap-2">
              <div className="border w-50"></div>
              <p>or continue using</p>
              <div className="border w-50"></div>
            </div>
            <div className="mt-5">
              <SocialLogin />
            </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center">
            <p>Already have an account?</p>
            <Link className="font-bold" href="/Login">Sign in</Link>
          </div>
        </div>
       <div className="hidden md:flex flex-1 min-h-[400px] md:min-h-screen justify-center items-center bg-[url('/log.png')] bg-cover bg-center">
                  <Image className=" lg:h-80 lg:w-80 xl:h-96 xl:w-96 object-cover" src='/use.png' height={150} width={150} alt="book" />
               </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
