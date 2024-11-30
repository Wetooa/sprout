import SproutHeader from "@/components/sprout-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Pricing() {
  return (
    <div className="bg-[url('/bg/main.svg')] bg-cover bg-no-repeat h-full w-full overflow-y-scroll my-auto p-16 flex flex-col justify-center rounded-2xl space-y-6">
      <header className="mx-auto ">
        <div className="max-w-5xl flex flex-col gap-6 items-center">
          <SproutHeader className="text-primary text-lg" />
          <h1 className="text-6xl font-bold text-primary text-center">
            Boost Your Farm&apos;s Productivity with Sprout Premium: Smarter
            Tools, Better Results
          </h1>
          <p>
            Access premium features that drive smarter farming decisions.
            1-month trial for ₱0 • Then ₱50/week • Cancel anytime
          </p>
          <p>Or save money with other plans</p>
          <Button>
            <b>Try 1 month for</b> ₱0
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/90 p-8 rounded-lg space-y-2 text-primary backdrop-blur">
          <div className="flex gap-2 items-center">
            <Image
              src={"/icons/seedling.svg"}
              alt="sprout"
              width={30}
              height={30}
              className="w-10 aspect-square"
            />
            <p>Weekly</p>
            <SproutHeader className="ml-auto" />
          </div>
          <hr />
          <p className="text-lg">₱50/Weekly</p>
          <p>1-month trial for ₱0</p>
          <div>
            <Button className="text-white">
              <b>Try 1 week for</b> ₱50
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-primary text-center text-5xl font-bold">
        Try Sprout Premium Now
      </h2>
    </div>
  );
}

export default Pricing;
