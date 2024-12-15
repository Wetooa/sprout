"use client";

import SproutHeader from "@/components/sprout-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const selectedPage = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const links: [string, string][] = [
    ["Home", "/"],
    ["Map", "/map"],
    ["Services", "/services"],
    ["Pricing", "/pricing"],
    ["About us", "/about-us"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("Email");
    setIsLoggedIn(false);  
    router.push("/auth/login");
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  
  useEffect(() => {
    checkLoginStatus();
  }, []); 

  // Filter out "Map" link if not logged in
  const filteredLinks = isLoggedIn
    ? links
    : links.filter(([name]) => name !== "Map");

  return (
    <nav className="bg-primary rounded-2xl p-4 flex justify-between w-full items-center">
      <SproutHeader
        color="white"
        className="text-white uppercase cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="space-x-2 text-white">
        {filteredLinks.map(([name, href]) => {
          return (
            <Button
              key={name}
              onClick={() => router.push(href)}
              variant={href === selectedPage ? "secondary" : "ghost"}
            >
              {name}
            </Button>
          );
        })}
      </div>

      <div className="rounded-lg overflow-hidden flex items-center border-2 border-green-500 h-10">
        {isLoggedIn ? (
          <>
            <button
              className="text-white py-2 px-6 bg-green-500"
              onClick={handleLogout} 
            >
              Log out
            </button>
            <div className="relative h-full aspect-square justify-center flex items-center">
              <Image
                src={"/members/simon.jpg"}
                alt="simon"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </>
        ) : (
          <button
            className="text-white py-2 px-6 bg-green-500"
            onClick={() => router.push("/auth/register")} 
          >
            Sign up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
