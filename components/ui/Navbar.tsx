
"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navitems from "./Navitems";
import { Button } from "./button";
import { AlignJustify, BrainIcon } from "lucide-react";


const Navbar = () => {

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <h1 className="text-xl max-sm:text-lg font-bold">Brobot</h1>
      </Link>
 
     <Navitems/>
    
{/* 
    <div className="lg:hidden ">
      <AlignJustify/>
    </div>

    <div className="flex flex-col justify-center items-end absolute top-5 right-0 left-0 py-7 lg:hidden bg-white w-full ">
      <div className="flex flex-col p-4 ">
        <Link href={"/"}>home</Link>
      </div>
      
    </div> */}
   
    
    </nav>
  );
};

export default Navbar;
