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
    const bio = formData.get("bio");
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
          bio,
        }),
      });
      if (response.status === 201) {
        alert("user created successfully");
        router.push("/");
      } else {
        const data = await response.json().catch(() => null);
        const message = String(data?.message || "");

        if (response.status === 409) {
          toast.error(
            message || "An account with these details already exists.",
          );
        } else {
          setErrorMessage(message || "fail to create user account");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
            Register
          </h1>
          <p className="text-center mt-1 text-sm sm:text-base">
            create new account
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mt-6 w-full"
          >
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div className="focus-within:border-2 border focus-within:border-[#D3D3FF] flex justify-center items-center gap-2 h-11 sm:h-12 w-full px-3 py-1.5 rounded-md">
              <UserRound className="shrink-0 size-5" />
              <input
                type="name"
                name="name"
                id="name"
                className="outline-0 w-full text-[17px] sm:text-[16px] placeholder:text-[15px]"
                placeholder="Enter your name"
              />
            </div>
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
            <div className="focus-within:border-2 border focus-within:border-[#D3D3FF] flex justify-center items-center gap-2 h-20  sm:h-20 w-full px-3 py-1.5 rounded-md">
              <textarea
                name="bio"
                id="bio"
                className="outline-0 resize-none w-full text-[17px] sm:text-[16px]"
                placeholder="Enter your bio"
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
                  "Sign up"
                )}
              </button>
            </div>
          </form>
          <div className="py-6">
            <div className="flex justify-center items-center gap-2 w-full">
              <div className="border flex-1 max-w-[120px]"></div>
              <p className="text-sm sm:text-base whitespace-nowrap">
                or continue using
              </p>
              <div className="border flex-1 max-w-[120px]"></div>
            </div>
            <div className="mt-5">
              <SocialLogin />
            </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center text-sm sm:text-base">
            <p>Already have an account?</p>
            <Link className="font-bold" href="/Login">
              Sign in
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 min-h-[400px] md:min-h-screen justify-center items-center bg-[url('/log.png')] bg-cover bg-center">
          <Image
            className=" lg:h-80 lg:w-80 xl:h-96 xl:w-96 object-cover"
            src="/use.png"
            height={150}
            width={150}
            alt="book"
          />
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
