"use client";
import React from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { doSocialLogin } from "./lib/action";

const SocialLogin = () => {
  const providerMessages: Record<string, string> = {
    google: "Successfully signed in with Google!",
    github: "Successfully signed in with GitHub! ",
  };

  const handleLogin = async (formData: FormData) => {
    const result = await doSocialLogin(formData);

    if (result?.error) {
      const errorMessages: Record<string, string> = {
        google: "Failed to sign in with Google. Try again.",
        github: "Failed to sign in with GitHub. Try again.",
      };

      const message = errorMessages[result.provider] ?? "Failed to sign in.";
      toast.error(message);
      return;
    }

    if (result?.success) {
      const message =
        providerMessages[result.provider] ?? "Successfully signed in!";
      toast.success(message);
    }
  };

  return (
    <div>
      <form action={handleLogin}>
        <div className="flex justify-center items-center">
          <button type="submit" name="action" value="google" className="cursor-pointer h-8 w-60 rounded-md flex justify-center items-center gap-2">
            <FcGoogle className="h-7 w-7" />
            sign in with Google
          </button>
          <button type="submit" name="action" value="github" className="cursor-pointer h-8 w-60 rounded-md flex justify-center items-center gap-2">
            <FaGithub className="h-7 w-7" />
            sign in with Github
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialLogin;
