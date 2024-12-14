import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="bg-[url('/bg/main.svg')] bg-cover bg-no-repeat overflow-y-scroll  w-full h-full p-16 flex flex-col justify-center">
      <div className="flex flex-col gap-6 max-w-5xl">
        <Image
          src={"/icons/sprout-icon.svg"}
          alt="sprout"
          width={200}
          height={200}
          className="w-36 aspect-square"
        />

        <h1 className="text-6xl font-bold text-primary">
          Empowering Communities with Modern Technology
        </h1>
        <p className="text-lg">
          Access innovative solutions that enhance productivity, resilience, and
          sustainability in Philippine agriculture.*
        </p>

        <div className="font-bold space-x-2">
          <Button asChild className="p-6 rounded-lg">
            <Link href="/map">Explore Map</Link>
          </Button>

          <Button asChild className="p-6 rounded-lg" variant={"link"}>
            <Link href="/about-us">Know More</Link>
          </Button>
        </div>

        <Button asChild className="w-fit text-black" variant={"link"}>
          <Link href="/pricing">*Get 30-days free trial.</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
