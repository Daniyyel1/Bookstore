"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react"; // ✅ add this

interface CartItem {
  _id: string;
  book: Books;
  quantity: number;
}

interface Review {
  _id: string;
  reviewer: string;
  comment: string;
  rating: number;
}

interface Books {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  genres: string;
  bio: string;
  description: string;
  reviews: Review[];
  
}

interface SearchContextType {
  books: Books[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  refetchBooks: () => Promise<void>;
  cart: CartItem[];
  addToCart: (bookId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

const CheckContext = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Books[]> ([]);
  const [selected, setSelected] = useState("Home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: session } = useSession();

  // books — always fetch regardless of session
  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  // cart — only fetch when logged in
  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart", {
        withCredentials: true,
      });
      setCart(response.data.data?.items ?? []);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async (bookId: string, quantity: number) => {
    try {
      await axios.post("/api/cart", { bookId, quantity }, {
        withCredentials: true,
      });
      await fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (cartId: string) => {
    try {
      await axios.delete(`/api/cart/${cartId}`, {
        withCredentials: true,
      });
      await fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  const updateQuantity = async (cartId: string, quantity: number) => {
    try {
      await axios.patch(`/api/cart/${cartId}`, { quantity }, {
        withCredentials: true,
      });
      await fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ always fetch books — no session needed
  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ only fetch cart when session changes
  useEffect(() => {
    if (session) {
      fetchCart();
    } else {
      setCart([]); // clear cart on logout
    }
  }, [session]);

  return (
    <SearchContext.Provider
      value={{
        books,
        selected,
        setSelected,
        refetchBooks: fetchBooks,
        cart,
        updateQuantity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useBooks must be used within a CheckContext");
  return context;
};

export default CheckContext;