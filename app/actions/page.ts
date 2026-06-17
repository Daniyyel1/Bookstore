"use server";

import { toast } from "sonner";
import { signIn, signOut, } from "../auth";
import { AuthError } from "next-auth";

// export async function doSocialLogin(formData: FormData) {
//   const action = formData.get("action") as string;

//   await signIn(action, { redirectTo: "/game" });
// }



export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string;

  try {
    await signIn(action, { redirectTo: `/game?provider=${action}` });
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: "Failed to sign in.", provider: action };
    }
    throw e;
  }

  return { success: true, provider: action };
}

export async function doLogOut() {
   
  await signOut({ redirectTo: "/Login" });
     
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
