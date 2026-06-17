"use client";
import React, { useEffect, useState } from "react";
import { doCredentialLogin } from "./actions/page";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import SocialLogin from "./SocialLogin";
import { Eye, EyeOff, LoaderIcon, Lock, Mail, UserRound } from "lucide-react";
import use from "../public/use.png";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const isShown = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Fields cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const response = await doCredentialLogin(formData);
      if (!response) {
        setErrorMessage("Incorrect email or password.");
        setLoading(false);
      } else {
        toast.success("signed in successfully");
        router.push("/game");
      }
    } catch (e) {
      console.error(e);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <section>
      <div className="flex gap-7 items-center justify-center h-full ">
        <div className="flex-1 px-6 py-8 h-90 items-center">
          <h1 className="font-baloo text-4xl font-extrabold text-center">
            Login
          </h1>
          <p className="text-center">Log in your account</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div className=" focus-within:border-2 border focus-within:border-[#D3D3FF] flex justify-center items-center gap-2 h-10 w-full px-3 py-1.5 rounded-md">
              <Mail />
              <input
                type="email"
                name="email"
                id="email"
                className="outline-0 w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className=" focus-within:border-[#D3D3FF] border focus-within:border-2 flex justify-center items-center gap-2 h-10 w-full px-3 py-1.5 rounded-md">
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
                  "Sign in"
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
            <p>Do not have an account?</p>
            <Link className=" font-bold" href="/Register">Sign up</Link>
          </div>
        </div>
        <div className="flex-1 h-screen flex justify-center items-center  bg-[url('/log.png')]">
           <Image className="h-90 w-90 object-cover" src={use} height={150} width={150} alt="book"></Image>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
