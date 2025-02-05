"use client";

import { useState } from "react";
import { House, Heart, Search } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; // Import Clerk components
import Link from "next/link";

interface HeaderProps {
  setSearchTerm: (term: string) => void;
  toggleWishlist: () => void; // Add function prop to toggle wishlist
  wishlistCount: number; // Add wishlistCount prop to display the count
}

export default function Header({
  setSearchTerm,
  toggleWishlist,
  wishlistCount,
}: HeaderProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchInput(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <header className="bg-white border-b border-gray-300 max-w-screen-2xl mx-auto">
      <nav className=" px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-24">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-600">
            MORENT
          </h1>

          <div className=" hidden md:flex items-center relative">
            <Search className="absolute left-3 text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search car by name or category"
              className="pl-10 py-2 w-96 border rounded-full focus:outline-none"
            />
          </div>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button
            className="p-2 rounded-full border border-gray-300 relative"
            onClick={toggleWishlist}
          >
            <Heart className="text-gray-500" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            )}
          </button>
          <Link href="/">
          <button className="p-2 rounded-full border border-gray-300">
          <House className="text-gray-500" />
          </button>
          </Link>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="flex md:hidden gap-4 items-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
