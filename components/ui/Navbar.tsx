import Link from "next/link";
import React from "react";
import Navitems from "./Navitems";
import { Button } from "./button";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <h1 className="text-xl font-bold">Brobot</h1>
      </Link>

    <Navitems/>
    
    </nav>
  );
};

export default Navbar;
