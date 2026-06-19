"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Toast } from "radix-ui";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpdateProfileProps {
  id: string;
}

const UpdateProfile = ({ id }: UpdateProfileProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!name || !bio) {
      toast.error("Fileds cannot be empty");
      return;
    }

    setLoading(true);

    const payload = {
      name,
      bio,
    };

    try {
      const response = await fetch(`/api/register/${id}/bio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 201) {
        toast.success("user info updated");
        router.push('/game')
      } else {
        toast.error("cannot update user info");
      }
      console.log("status:", response.status)
      const data = await response.json();
      console.log("response data:", data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    setName('');
    setBio('');
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div className="px-5 flex flex-col gap-1.5">
            <label>Name:</label>
            <input
              className="border px-5 focus:bg-[#D3D3FF] focus:rounded-md focus:border-0 h-18 w-full outline-0"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-5 flex flex-col gap-1.5">
            <label>Add a bio:</label>
            <input
              className="border px-5 focus:bg-[#D3D3FF] focus:rounded-md focus:border-0 h-18 w-full outline-0"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              type="submit"
              className="h-12 w-60 rounded-md cursor-pointer text-xl bg-[#D3D3FF]"
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateProfile;
