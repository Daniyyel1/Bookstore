

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooks } from "@/app/context/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Books {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  genres: string | string[];
}

// Reusable hook for carousel scroll state
function useCarouselScrollState() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return { api, setApi, canScrollPrev, canScrollNext };
}

// Reusable book card
const BookCard = ({ bk }: { bk: Books }) => {
  const { addToCart } = useBooks();
  const { data: session } = useSession();

  const router = useRouter();

  const handleCart = async (bookId: string) => {
    try {
      if (!session) {
        toast.error("oops you need to login first");
        router.push("/Login");
        return;
      }

      await addToCart(bookId, 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
   
      <div className="flex flex-col w-full">
        <Link href={`/components/pages/Collections/${bk._id}`} className="flex flex-col w-full">
          <img
            src={
              bk.image?.startsWith("/9j/")
                ? `data:image/jpeg;base64,${bk.image}`
                : bk.image || "/placeholder.jpg"
            }
            alt={bk.title ?? "book cover"}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-60 object-cover rounded-md"
          />
          <h1 className="font-oldstandard capitalize text-sm sm:text-[15px] md:text-[16px] mt-2 truncate">
            {bk.title}
          </h1>
          <p className="font-oldstandard capitalize text-xs sm:text-sm md:text-[16px] truncate">
            author: {bk.author}
          </p>
          <span className="font-oldstandard block text-sm sm:text-base">${bk.price}</span>
          <span className="capitalize font-oldstandard block text-xs sm:text-sm md:text-[16px]">
            Rating: {bk.rating}/10
          </span>
        </Link>
        <button
          onClick={() => handleCart(bk._id)}
          className="border font-oldstandard text-sm sm:text-base h-9 sm:h-10 w-full cursor-pointer mt-3 rounded-md"
        >
          Add to cart
        </button>
      </div>
    
  );
};

// Reusable genre carousel
const BookCarousel = ({ books }: { books: Books[] }) => {
  const { setApi, canScrollPrev, canScrollNext } = useCarouselScrollState();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mt-3 relative px-1 sm:px-2"
    >
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 -ml-0">
          {books.map((bk, id) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 p-2 sm:p-3 rounded-md flex justify-center items-start"
            >
              <BookCard bk={bk} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          disabled={!canScrollPrev}
          className="flex left-0 sm:-left-3 md:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-9 sm:w-9 bg-white border border-gray-300 shadow-md hover:bg-gray-100 disabled:opacity-0 disabled:pointer-events-none"
        />
        <CarouselNext
          disabled={!canScrollNext}
          className="flex right-0 sm:-right-3 md:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-9 sm:w-9 bg-white border border-gray-300 shadow-md hover:bg-gray-100 disabled:opacity-0 disabled:pointer-events-none"
        />
      </Carousel>
    </motion.div>
  );
};

const BrowseCollections = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data.data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  const hasGenre = (book: Books, genre: string) =>
    Array.isArray(book.genres)
      ? book.genres.includes(genre)
      : book.genres === genre;
  const fictionBooks = books.filter((b) => hasGenre(b, "fiction"));
  const romanceBooks = books.filter((b) => hasGenre(b, "romance"));
  const fantasyBooks = books.filter((b) => hasGenre(b, "fantasy"));
  const searchResults = books.filter((b) =>
    b.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // When searching, show search results instead of genre carousels
  const isSearching =
    searchValue.trim().length > 0 || collections.trim().length > 0;

  const isGenre =
    collections === "All"
      ? searchResults
      : searchResults.filter((b) => b.genres === collections);

  return (
    <section>
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-16 max-sm:mt-25 md:mt-24 lg:mt-30">
          <div className="border focus-within:border-[#D3D3FF] border-gray-600 py-2.5 px-3 h-12 sm:h-13 rounded-md w-full">
            <input
              type="text"
              placeholder="Search all Books"
              className="outline-0 w-full h-full text-[16px] sm:text-base"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-3.5 mt-6 sm:mt-10">
            <h1 className="font-oldstandard text-2xl sm:text-3xl font-bold">
              All collections
            </h1>
            <div className="w-full sm:w-auto">
              <h1 className="font-oldstandard text-[16px] sm:text-[18px] font-bold mb-1 sm:mb-0">
                Filter by:
              </h1>
              {/* <Select
                className="border data-hover:shadow data-focus:bg-[#D3D3FF] w-50 h-10 px-3 rounded-md outline-0"
                defaultValue=""
                value={collections}
                onChange={(e) => setCollections(e.target.value)}
              >
                <option value="">select by genre</option>
                <option value="All">All</option>
                <option value="romance">Romance</option>
                <option value="fiction">Fiction</option>
                <option value="fantasy">Fantasy</option>
              </Select> */}
              <Select
                value={collections}
                onValueChange={(value) =>
                  setCollections(value === "none" ? "" : value)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-lg border border-[#AFA9EC] bg-[#EEEDFE] px-3 text-[#3C3489] text-sm font-medium hover:bg-[#CECBF6] transition-colors focus:ring-2 focus:ring-[#7F77DD] focus:ring-offset-1">
                  <SelectValue placeholder="Select by genre" />
                </SelectTrigger>
                <SelectContent
                  sideOffset={5}
                  position="popper"
                  className="rounded-lg border border-[#CECBF6] bg-white shadow-md p-1 "
                >
                  <SelectItem
                    value="none"
                    className="rounded-md text-sm text-[#3C3489] px-3 py-2 cursor-pointer hover:bg-[#EEEDFE] focus:bg-[#EEEDFE] focus:text-[#26215C] transition-colors"
                  >
                    Select by genre
                  </SelectItem>
                  <SelectItem
                    value="All"
                    className="rounded-md text-sm text-[#3C3489] px-3 py-2 cursor-pointer hover:bg-[#EEEDFE] focus:bg-[#EEEDFE] focus:text-[#26215C] transition-colors"
                  >
                    All
                  </SelectItem>
                  <SelectItem
                    value="romance"
                    className="rounded-md text-sm text-[#3C3489] px-3 py-2 cursor-pointer hover:bg-[#EEEDFE] focus:bg-[#EEEDFE] focus:text-[#26215C] transition-colors"
                  >
                    Romance
                  </SelectItem>
                  <SelectItem
                    value="fantasy"
                    className="rounded-md text-sm text-[#3C3489] px-3 py-2 cursor-pointer hover:bg-[#EEEDFE] focus:bg-[#EEEDFE] focus:text-[#26215C] transition-colors"
                  >
                    Fantasy
                  </SelectItem>
                  <SelectItem
                    value="fiction"
                    className="rounded-md text-sm text-[#3C3489] px-3 py-2 cursor-pointer hover:bg-[#EEEDFE] focus:bg-[#EEEDFE] focus:text-[#26215C] transition-colors"
                  >
                    Fiction
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isSearching ? (
          // Search results grid
          <div>
            <h2 className="font-oldstandard font-semibold text-lg sm:text-xl mt-4 mb-3">
              Results for &quot;{searchValue || collections}&quot; (
              {searchResults.length || collections.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {isGenre.length > 0 ? (
                isGenre.map((bk) => (
                  <div key={bk._id} className="p-1 sm:p-2">
                    <BookCard bk={bk} />
                  </div>
                ))
              ) : (
                <p className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 font-oldstandard text-gray-500">
                  No books found.
                </p>
              )}
            </div>
          </div>
        ) : (
          // Genre carousels
          <>
            <h2 className="border-b-2 w-18 font-oldstandard font-semibold mt-1.5">
              Romance
            </h2>
            <BookCarousel books={romanceBooks} />

            <div className="mt-6">
              <h2 className="font-oldstandard border-b-2 font-semibold w-18">
                Fantasy
              </h2>
              <BookCarousel books={fantasyBooks} />
            </div>
            <div className="mt-6">
              <h2 className="font-oldstandard border-b-2 font-semibold w-18">
                Fiction
              </h2>
              <BookCarousel books={fictionBooks} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseCollections;