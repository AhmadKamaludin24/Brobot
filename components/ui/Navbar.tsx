"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navitems from "./Navitems";
import { Button } from "./button";
import { AlignJustify, BrainIcon, Hamburger, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <h1 className="text-xl max-sm:text-lg font-bold">Brobot</h1>
      </Link>

      <div className="max-sm:hidden">
        <Navitems />
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2">
          <AlignJustify />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-0 right-0 w-[60%] py-10 h-svh bg-white flex flex-col justify-between">
          <div
            className="flex flex-col justify-start items-end gap-4 px-4"
            onClick={() => setIsOpen(false)}>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center p-2">
              <X />
            </button>
            <Link href={"/"}>Home</Link>
            <Link href={"/companions"}>Companions</Link>
            <Link href={"/my-journey"}>My journey</Link>
          </div>
          <div className="flex w-full flex-col justify-end items-center px-4">
            {/* <Link href="/sign-in" className="w-full">
            <Button variant="outline" className="w-full mt-2">
              Sign Up
            </Button>
          </Link> */}
            <SignedIn>
              <UserButton showName={true} />
            </SignedIn>
            <div onClick={() => setIsOpen(false)} className="w-full">
              <SignedOut>
                <SignInButton forceRedirectUrl={"/redirecting"}>
                  <Button className="bg-black text-white hover:bg-gray-800 w-full">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
