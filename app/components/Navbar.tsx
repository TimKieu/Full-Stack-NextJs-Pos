"use client";

import { useState, useEffect } from "react";

// Next.js Imports
import Image from "next/image";

// Images and Icons
import logo from "@/public/images/moonlamplogo.png";

import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {

  const [isScrolling, setIsScrolling] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !isScrolling) {
        setIsScrolling(true);
      } else if (window.scrollY === 0 && isScrolling) {
        setIsScrolling(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

 
  return (
    <nav className={`py-4 w-full fixed top-0 bg-white shadow-lg z-50`}>
      <div className="w-[95%] m-auto flex justify-between items-center">
        <a href="/">
          <Image src={logo} width={150} height={undefined} loading="lazy"  placeholder="blur" alt="moon lamp" />
        </a>

     

        <div className="flex gap-4 items-center text-dark ml-auto md:ml-0">
          <div className="cursor-pointer relative">
            <AiOutlineShoppingCart size={20} />
           
          </div>
     
          {/* CLERK USER BUTTON */}
     
              <AiOutlineUser size={25} />
         
        </div>

      </div>
     
    
    </nav>
  );
};

export default Navbar;