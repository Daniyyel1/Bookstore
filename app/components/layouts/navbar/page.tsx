"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import know from "../../../../public/know.svg";
import { BsHandbag } from "react-icons/bs";
import { ShoppingCart } from "lucide-react";
import { useBooks } from "@/app/context/page";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { cart } = useBooks();
     const { data: session } = useSession(); // ✅ client-side session
  

  const pathname = usePathname();

  const navLinks = [
    {
      href: "/components/pages/Collections",
      label: "Collections",
      protected: false,
    },

    {
      href: "/components/pages/CartPage",
      label: <BsHandbag />,

      protected: true,
    },

    {
      href: "/components/pages/About",
      label: "About",
      protected: false,
    },

    {
      href: "/Login",
      label: "Login/Register",
      protected: false,
    },
  ];

  return (
    <div className="fixed w-full z-99 top-0 h-20 border-b bg-white">
      <div className="max-w-275 mx-auto py-5 flex justify-between items-center">
        <Link href="/">
          <Image className="h-12 w-30" src={know} alt="know"></Image>
        </Link>
        <div className="flex justify-between items-center space-x-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-oldstandard text-[17px] ${
                pathname === href
                  ? "border-b-2 border-[#D3D3FF]"
                  : "hover:border-b-2 hover:border-[#D3D3FF] transition-all duration-200"
              }`}
            >
              <div className="flex items-center gap-1">
                {label}
                {href === "/components/pages/CartPage" && (
                  <span className="absolute top-10 ml-1.5 text-[12px] font-baloo font-bold h-4 w-4 rounded-full bg-[#D3D3FF] flex justify-center items-center">{cart.length}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
