"use client";

import SproutHeader from "@/components/sprout-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  const selectedPage = usePathname();

  const links: [string, string][] = [
    ["Home", "/"],
    ["Map", "/map"],
    ["Services", "/services"],
    ["Pricing", "/pricing"],
    ["About us", "/about-us"],
  ];

  return (
    <nav className="bg-primary rounded-2xl p-4 flex justify-between w-full items-center">
      <SproutHeader
        color="#A7F3D0"
        className="text-[#A7F3D0] uppercase cursor-pointer font-medium text-lg"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="space-x-2 text-white">
        {links.map(([name, href]) => {
          return (
            <Button
              key={name}
              onClick={() => router.push(href)}
              variant={href === selectedPage ? "secondary" : "ghost"}
              className={`text-lg font-medium hover:text-[#27a47d] ${
                href === selectedPage ? "text-[#27a47d]" : ""
              }`}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div className="rounded-lg overflow-hidden flex items-center border-2 border-green-500 h-10">
        <button className="text-white py-2 px-6 bg-green-500">Log out</button>
        <div className="relative h-full aspect-square justify-center flex items-center">
          <Image
            src={"/members/simon.jpg"}
            alt="simon"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
