"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const providerMessages: Record<string, string> = {
  google: "Successfully signed in with Google!",
  github: "Successfully signed in with GitHub!",
};

const GameToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const provider = searchParams.get("provider");

    if (provider) {
      const message = providerMessages[provider] ?? "Successfully signed in!";
      toast.success(message);
      router.replace("/game");
    }
  }, [searchParams, router]);

  return null; // renders nothing, just handles the toast
};

export default GameToast;