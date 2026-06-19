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
    <section className="min-h-screen">
      <div className="flex flex-col md:flex-row items-stretch justify-center min-h-screen">
        <div className="flex-1 px-4 sm:px-8 lg:px-12 py-10 flex flex-col justify-center max-w-xl w-full mx-auto md:mx-0">
          <h1 className="font-baloo text-3xl sm:text-4xl font-extrabold text-center">
            Login
          </h1>
          <p className="text-center mt-1 text-sm sm:text-base">Log in your account</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6 w-full">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div className="focus-within:border-2 border focus-within:border-[#D3D3FF] flex justify-center items-center gap-2 h-11 sm:h-12 w-full px-3 py-1.5 rounded-md">
              <Mail className="shrink-0 size-5" />
              <input
                type="email"
                name="email"
                id="email"
                className="outline-0 w-full text-[17px] sm:text-[16px]"
                placeholder="Enter your email"
              />
            </div>
            <div className="focus-within:border-[#D3D3FF] border focus-within:border-2 flex justify-center items-center gap-2 h-11 sm:h-12 w-full px-3 py-1.5 rounded-md">
              <Lock className="shrink-0 size-5" />
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
                className="outline-0 w-full text-[17px] sm:text-[16px]"
                placeholder="Enter a strong password"
              />
              <div className="flex justify-end items-center shrink-0">
                {isShowPassword ? (
                  <EyeOff onClick={isShown} className="size-5 cursor-pointer" />
                ) : (
                  <Eye onClick={isShown} className="size-5 cursor-pointer" />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="h-12 sm:h-14 rounded-xl
                     font-oldstandard
                     text-base sm:text-xl
                     w-full
                     border-2
                     bg-[black]
                     text-white
                     cursor-pointer
                     hover:border-2
                     hover:bg-transparent
                     hover:text-black
                     transition-colors
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
          <div className="py-6">
            <div className="flex justify-center items-center gap-2 w-full">
              <div className="border flex-1 max-w-[120px]"></div>
              <p className="text-sm sm:text-base whitespace-nowrap">or continue using</p>
              <div className="border flex-1 max-w-[120px]"></div>
            </div>
            <div className="mt-5">
              <SocialLogin />
            </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center text-sm sm:text-base">
            <p>Do not have an account?</p>
            <Link className="font-bold" href="/Register">Sign up</Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 min-h-[400px] md:min-h-screen justify-center items-center bg-[url('/log.png')] bg-cover bg-center">
           <Image className="h-64 w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 object-cover" src={use} height={150} width={150} alt="book" />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;