"use client";
import { useBooks } from "@/app/context/page";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  LoaderIcon,
  Minus,
  Plus,
  Send,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface postReviewProps {
  id: string;
}

const CollectionDetailsPage = ({ id }: postReviewProps) => {
  const { books, refetchBooks } = useBooks();
  const [seen, setSeen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState("Description");
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number >(0);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useBooks();
  const { data: session } = useSession(); // ✅ client-side session

  //  const params = useParams<{ CollectionsId: string }>()

  const stars = [1, 2, 3, 4, 5];

  const params = useParams();

  const router = useRouter();

  const isVisible = () => {
    setSeen(!seen);
  };

  const handleCart = async (bookId: string) => {
    try {
      if (!session) {
        toast.error("You need to login to add product to cart");
        router.push("/Login");
        return;
      }
      await addToCart(bookId, quantity);
      toast.success("Item added to cart");
    } catch (e) {
      console.error(e);
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || !reviewer || rating === 0) {
      toast.error("Fill out the fields and select a rating");
      return;
    }

    if(!session){
      return router.push('/Login')
    }

    setLoading(true);

    const payload = {
      reviewer,
      comment,
      rating,
    };

    try {
      const response = await fetch(
        `/api/books/${params.CollectionsId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 201) {
        toast.success("Review sent");
        await refetchBooks();
      } else {
        toast.error("Error sending review");
      }
      const data = await response.json();
      console.log("response data:", data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    setRating(0);
    setComment("");
    setReviewer("");
  };

  const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, rv) => sum + rv.rating, 0);
    return Math.round(total / reviews.length); // rounds to nearest whole star
  };

  const StarDisplay = ({ reviews }: { reviews: { rating: number }[] }) => {
    const average = getAverageRating(reviews ?? []);

    return (
      <div className="flex items-center justify-center sm:justify-start gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= average
                ? "text-[#FBBF24] text-xl"
                : "text-[#D1D5DB] text-xl"
            }
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-500">({reviews.length})</span>{" "}
        {/* review count */}
      </div>
    );
  };

  //    const items = books.find(
  //   (book) => book.title === decodeURIComponent(params.CollectionsId)
  // )

  const items = books.find((bk) => String(bk._id) === params.CollectionsId);

  return (
    <section className="max-w-[1200px] mx-auto mt-20 sm:mt-20 md:mt-24 lg:mt-30 px-4 sm:px-6 lg:px-8 font-oldstandard">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative w-full">
        <div className="flex-1 lg:sticky lg:top-30 h-auto lg:h-[5%] px-2 sm:px-6 py-4  w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 ">
            <img
              src={
                items?.image?.startsWith("/9j/")
                  ? `data:image/jpeg;base64,${items?.image}`
                  : items?.image || "/placeholder.jpg"
              }
              alt="image"
              className="h-48
              w-32
              sm:h-60
              sm:w-40
              mx-auto
              sm:mx-0
              rounded-md
              object-cover"
            />
            <div className="text-center sm:text-left">
              <h1 className="capitalize font-oldstandard text-xl sm:text-2xl">
                {items?.title}
              </h1>
              <span className="block font-oldstandard font-medium">
                ₦{items?.price}
              </span>
              <StarDisplay reviews={items?.reviews ?? []} />
              <div className="flex items-center justify-center sm:justify-start space-x-5">
                <span>Qty:</span>
                <div className="flex justify-between items-center gap-4 border h-8 w-32 px-2">
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity(quantity - 1)}
                    className={`${quantity === 1 ? "opacity-10" : ""}`}
                  >
                    <Minus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className=" "
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <div className="mt-8 sm:mt-15 flex justify-center sm:justify-start">
                <button
                  onClick={() => handleCart(items?._id ?? "")}
                  className="border h-10 w-full sm:w-50 rounded-md hover:bg-black hover:text-white cursor-pointer"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-20 ">
            <div className="rounded-2xl px-1 cursor-pointer w-full h-12 flex items-center gap-1 sm:gap-2.5  bg-[#F2F2F2]">
              <button
                onClick={() => setSelected("Description")}
                className={`cursor-pointer flex-1 text-xs sm:text-sm md:text-base ${selected === "Description" ? " bg-[#D3D3FF] h-10 rounded-2xl transition-all duration-300" : "h-10  rounded-xl transition-all duration-300 "}`}
              >
                Description
              </button>
              <button
                onClick={() => setSelected("Reviews")}
                className={`cursor-pointer flex-1 text-xs sm:text-sm md:text-base ${selected === "Reviews" ? " bg-[#D3D3FF] h-10 rounded-2xl transition-all duration-300" : "h-10 rounded-xl transition-all duration-300 "}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setSelected("About")}
                className={`cursor-pointer flex-1 text-xs sm:text-sm md:text-base ${selected === "About" ? " bg-[#D3D3FF] w-90 h-10 rounded-2xl transition-all duration-300" : "h-10 rounded-xl transition-all duration-300 w-90"}`}
              >
                About the author
              </button>
            </div>
            <div className="mt-5">
              {selected === "Description" && (
                <motion.p
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="text-sm sm:text-base"
                >
                  {items?.description}
                </motion.p>
              )}
              {selected === "About" && (
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="text-sm sm:text-base"
                >
                  {items?.bio}
                </motion.p>
              )}

              {selected === "Reviews" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                     {
                      (items?.reviews.length ?? 0) > 0 ? (<div>{items?.reviews.map((rv) => (
                    <div
                      key={rv._id}
                      className="mb-4 sm:mb-6 text-sm sm:text-base"
                    >
                      <p>{rv.reviewer}</p>
                      <p>{rv.comment}</p>
                      <div>
                        {stars.map((star) => (
                          <span
                            key={star}
                            className={
                              star <= rv.rating
                                ? "text-[#FBBF24] text-xl"
                                : "text-[#D1D5DB] text-xl"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}</div>) : (<div><p>no reviews yet, be the first to comment</p></div>)
                     }
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:flex-1 h-auto lg:h-screen">
          <div className=" w-full lg:w-150 p-4">
            <div className="flex justify-between py-1.5 items-center border-b-2 border-[#D3D3FF] ">
              <h1 className="font-black capitalize text-base sm:text-[18px]">
                why choose us
              </h1>
              <div>
                {seen ? (
                  <button
                    className="cursor-pointer text-2xl"
                    onClick={isVisible}
                  >
                    <ChevronUp />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer text-2xl"
                    onClick={isVisible}
                  >
                    <ChevronDown />
                  </button>
                )}
              </div>
            </div>
            <div
              className={` transition-all duration-300 ${seen ? "py-2 transition-all duration-300 border-b-2 border-[#D3D3FF] " : ""}`}
            >
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={seen ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-sm sm:text-base"
              >
                We are what we say we do
              </motion.p>
            </div>
          </div>
          <div>
            <h1 className="text-center text-sm sm:text-[16px] px-4">
              Kindly leave a review, so others can know how you feel about this
              book.
            </h1>
            <div className="px-4 sm:px-0">
              <form
                onSubmit={handleSubmit}
                className="grid gap-1.5 mt-3 w-full lg:w-150"
              >
                <div className="flex flex-col gap-1">
                  <label>Your name</label>
                  <input
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="border
                  focus:border-[#D3D3FF]
                  focus:border-2
                  rounded-md
                   px-3
                   sm:px-5
                   h-12
                   w-full
                   outline-0"
                    type="text"
                  />
                </div>
                <div>
                  {stars.map((star) => (
                    <span
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      key={star}
                      className={
                        star <= (hover ?? rating)
                          ? "text-[#FBBF24] cursor-pointer text-2xl"
                          : "text-[#D1D5DB] cursor-pointer text-2xl"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <label>Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className=" resize-none border
                     h-20
                     outline-0
                     focus:border-2
                     focus:border-[#D3D3FF]
                     rounded-md
                     py-3
                     sm:py-5
                     px-3
                     sm:px-5
                     w-full"
                    placeholder="leave a comment"
                    maxLength={150}
                  />
                </div>
                <div className="flex justify-center items-center mt-6">
                  <button
                    type="submit"
                    className="h-12
                     w-full
                     border
                     hover:bg-black
                     hover:text-white
                     rounded-md
                     flex
                     justify-center
                     items-center
                     cursor-pointer"
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
                      <Send />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionDetailsPage;
