"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navitems from "./Navitems";
import { Button } from "./button";
import { AlignJustify, BrainIcon, Hamburger, X } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";

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
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center p-2">
          <AlignJustify/>
        </button>
      </div>

      { isOpen && (
         <div className="lg:hidden absolute top-0 right-0 w-1/2 py-12 h-screen bg-white flex flex-col justify-between">
        <div className="flex flex-col justify-start items-end gap-4 px-4">
          <button onClick={() => setIsOpen(false)} className="flex items-center justify-center p-2">
            <X/>
          </button>
          <Link href={"/"}>Home</Link>
          <Link href={"/companions"}>Companions</Link>
          <Link href={"/my-journey"}>My journey</Link>
         
        </div>
        <div className="flex w-full justify-end items-center px-4">
           {/* <Link href="/sign-in" className="w-full">
            <Button variant="outline" className="w-full mt-2">
              Sign Up
            </Button>
          </Link> */}
          <SignedIn>
            <UserButton showName={true} />
          </SignedIn>
        </div>
      </div>
      )}

     
    </nav>
  );
};

export default Navbar;
