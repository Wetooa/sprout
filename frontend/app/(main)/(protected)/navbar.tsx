"use client";

import SproutHeader from "@/components/sprout-header";
import { Button } from "@/components/ui/button";
import { useNavStore } from "@/store/navbar-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Page } from "@/types/page";

function Navbar() {
  const { selectedPage, switchPage } = useNavStore();

  const links: [string, string, Page][] = [
    ["Home", "/", "home"],
    ["Map", "/map", "map"],
    ["Services", "/services", "services"],
    ["Pricing", "/pricing", "pricing"],
    ["About us", "/about-us", "about-us"],
  ];

  const router = useRouter();

  function onClickHandler(href: string, page: Page) {
    switchPage(page);
    router.push(href);
  }

  return (
    <nav className="bg-primary rounded-2xl p-4 flex justify-between w-full items-center">
      <SproutHeader className="text-white uppercase" />
      <div className="space-x-2 text-white">
        {links.map(([name, href, page]) => {
          return (
            <Button
              key={name}
              onClick={() => onClickHandler(href, page)}
              variant={page === selectedPage ? "secondary" : "ghost"}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div>
        <Button className="">Logout</Button>
        <Button className="">Simon</Button>
      </div>
    </nav>
  );
}

export default Navbar;
