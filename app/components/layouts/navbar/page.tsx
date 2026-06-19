"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import know from "../../../../public/know.svg";
import { BsHandbag } from "react-icons/bs";
import { useBooks } from "@/app/context/page";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useBooks();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isOpen = () => {
    setOpen(!open);
  };
  
  const closeMenu = ()=>{
    setOpen(!open)
  }

  const navLinks = [
    {
      href: "/components/pages/Collections",
      label: "Collections",
      protected: false,
    },

    {
      href: "/components/pages/CartPage",
      label: <BsHandbag className='max-md:text-[22px]' />,
      protected: false,
    },

    {
      href: "/components/pages/About",
      label: "About",
      protected: false,
    },
    {
      href: "/game",
      label: "Profile",
      protected: true,
    },

    {
      href: "/Login",
      label: "Login/Register",
      guestOnly: true,
    },
  ];

  const visibleLinks = navLinks.filter((link) => {
    if (link.protected && !session) return false;
    if (link.guestOnly && session) return false;
    return true;
  });

  return (
    <div className="fixed w-full z-99 top-0 h-20 border-b bg-white">
      <div className="max-w-275 mx-auto py-5 flex justify-between items-center pr-2.5 relative">
        <Link href="/">
          <Image className="h-12 w-30" src={know} alt="know"></Image>
        </Link>
        <div
         className={`max-md:absolute max-md:w-[200px]  flex justify-center items-center max-md:bg-[#D3D3FF] rounded-md lg:bg-none gap-6 max-md:flex-col max-md:top-20 top-0 z-[99]  ${open ? 'left-0 transition-all max-md:p-4 duration-300 max-md:items-start max-md:justify-start max-md:w-[300px] max-md:h-60' : '-left-full transition-all duration-300'}`}
        >
          {visibleLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`font-oldstandard text-[17px] max-md:text[19px] ${
                pathname === href
                  ? "border-b-2 border-[#D3D3FF]"
                  : "hover:border-b-2 hover:border-[#D3D3FF] transition-all duration-200"
              }`}
            >
              <div
                className={`flex items-center gap-1 ${label === "Profile" ? " h-10 bg-[#D3D3FF] w-30 rounded-md flex justify-center items-center" : ""}`}
              >
                {label === "Profile" ? <div>{session?.user.name}</div> : label}

                {href === "/components/pages/CartPage" && (
                  <span className="absolute top-10 max-md:top-18 max-md:text-[15px] ml-1.5 text-[12px] font-baloo font-bold h-4 w-4 rounded-full bg-[#D3D3FF] flex justify-center items-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div onClick={isOpen} className="block lg:hidden">
          <div
            className={`h-1 w-8 bg-[#D3D3FF] m-[3px_auto] rounded-[3px] ${open ? "translate-y-[7px] rotate-[45deg] transition-all duration-300" : "transition-all duration-300"}`}
          ></div>
          <div
            className={`h-1 hidden w-8 bg-[#D3D3FF] m-[3px_auto] rounded-[3px] ${open ? "opacity-0" : ""}`}
          ></div>
          <div
            className={`h-1 w-5 bg-[#D3D3FF] m-[5px_auto]  rounded-[3px] ${open ? "translate-y-[-3px] rotate-[-45deg] transition-all duration-300 w-8 " : "transition-all duration-300"}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
