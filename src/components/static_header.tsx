"use client";

import { Bell, Heart, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function StaticHeader() {
  return (
    <header className="bg-white border-b border-gray-300 max-w-screen-2xl mx-auto">
      <nav className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-24">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-600">
            MORENT
          </h1>

          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search car by name or category"
              className="pl-10 py-2 w-96 border rounded-full focus:outline-none"
            />
          </div>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button type="button" className="p-2 rounded-full border border-gray-300">
            <Heart className="text-gray-500" />
          </button>
          <button type="button" className="p-2 rounded-full border border-gray-300">
            <Bell className="text-gray-500" />
          </button>

          <SignedOut>
            <button type="button" className="text-blue-600">Sign In</button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="flex md:hidden gap-4 justify-between mx-4 items-center">
          <SignedOut>
            <button type="button" className="text-blue-600">Sign In</button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
