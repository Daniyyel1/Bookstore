"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import img1 from "./../../../public/img1.jpg";
import img2 from "./../../../public/img2 (2).jpg";
import img3 from "./../../../public/img3.jpg";
import img4 from "./../../../public/img4.jpg";
import img5 from "./../../../public/img5.jpg";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useBooks } from "@/app/context/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const BannerWrapper = () => {
  const { data: session } = useSession(); // ✅ client-side session
  const { books, addToCart } = useBooks();

  console.log("session", session)

  const router = useRouter();

  const carousel = [
    {
      id: 1,
      img: img1,
    },
    {
      id: 2,
      img: img2,
    },
    {
      id: 3,
      img: img3,
    },
    {
      id: 4,
      img: img4,
    },
    {
      id: 5,
      img: img5,
    },
  ];
  const handleCart = async (bookId: string) => {
    try {
      if (!session) {
        toast.error("You need to login to add product to cart");
        router.push("/Login");
        return;
      }
      await addToCart(bookId, 1);
      toast.success("Item added to cart");
    } catch (e) {
      console.error(e);
    }
  };
  const fileteredBooks = books.filter((book) => book.genres === "romance");

  return (
    <div>
      <div className="h-150 w-full border-2">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-5! h-5! rounded-full! bg-[#D3D3FF]! transition-all duration-300 !opacity-50 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:!bg-gray-500 [&.swiper-pagination-bullet-active]:h-4! [&.swiper-pagination-bullet-active]:w-15! [&.swiper-pagination-bullet-active]:rounded-md! !mx-1 [&.swiper-pagination-bullet-active]:transition-all [&.swiper-pagination-bullet-active]:duration-300"></span>`,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={4000}
        >
          {carousel.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-150 overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={slide.img}
                  alt="slide"
                ></Image>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-[1100px] mx-auto lg:px-0 px-2.5 ">
        <h1 className="text-3xl font-oldstandard mt-7">New Arrivals</h1>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 lg:gap-1.5 gap-3.5 max-sm:py-2 max-sm:space-y-2.5"
        >
          {fileteredBooks.map((book, id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: id * 0.1 }}
              className=" h-full lg:p-3 w-full p-0"
            >
              <div className="relative h-110 w-full lg:h-65  max-sm:130">
                <div className="lg:h-50 w-full h-85 max-sm:95 ">
                  <Link href={`/components/pages/Collections/${book._id}`}>
                <Image
                  src={
                    book.image?.startsWith("/9j/")
                      ? `data:image/jpeg;base64,${book.image}`
                      : book.image || "/placeholder.jpg"
                  }
                  alt={book.title}
                  width={50}
                  height={50}
                  className="object-cover h-75 lg:h-full max-sm:h-97 w-full rounded-md"
                />
              
              <p className="font-oldstandard lg:text-[17px] text-[18px] max-sm:text-[19px] max-sm:mt-1">{book.title}</p>
              <h2 className="font-oldstandard max-sm:mt-1 font-bold lg:text-[17px] text-[18px] max-sm:text-[19px]">₦{book.price}</h2>
                   </Link>
                   </div>
                </div>
              <button
                onClick={() => handleCart(book._id)}
                className="lg:h-10
                max-sm:h-12
                h-10
                w-full
                cursor-pointer
                rounded-[10px]
                border-2
                font-oldstandard
                flex
                justify-center
                gap-5
                items-center
                hover:border-2 
                max-sm:mt-12
                lg:text-[17px] text-[18px] max-sm:text-[21px]
                border-[#D3D3FF]
                "
              >
                Add to cart <ShoppingCart />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BannerWrapper;
