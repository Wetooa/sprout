"use client";

import SproutHeader from "@/components/sprout-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { useNavStore } from "@/store/navbar-store";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { page } = useNavStore();

  return (
    <nav className="static top-0 bg-primary rounded-2xl p-4 flex justify-between w-full items-center">
      <SproutHeader className="text-white uppercase" />
      <div className="space-x-4">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: page == "home" ? "default" : "ghost",
          })}
        >
          Home
        </Link>
      </div>
      <div>
        <Button className="">Logout</Button>
        <Button className="">Simon</Button>
      </div>
    </nav>
  );
}

export default Navbar;
