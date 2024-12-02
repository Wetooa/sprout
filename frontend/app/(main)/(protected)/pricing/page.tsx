import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import SubscriptionModels from "./subscription-models";

function Pricing() {
  return (
    <div className="bg-[url('/bg/main.svg')] bg-cover bg-no-repeat overflow-y-scroll  w-full h-full p-16 flex flex-col justify-center rounded-2xl space-y-12">
      <header className="mx-auto text-primary text-center">
        <div className="max-w-5xl flex flex-col gap-6 items-center">
          <div className={"flex text-primary gap-2 h-10 items-center "}>
            <div className="relative h-full aspect-square justify-center flex items-center">
              <Image
                src={"/icons/sprout-icon.svg"}
                alt="sprout-icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h6 className="text-2xl">SPROUT</h6>
          </div>

          <h1 className="text-6xl font-bold text-center">
            Boost Your Farm&apos;s Productivity with Sprout Premium: Smarter
            Tools, Better Results
          </h1>
          <p className="text-lg">
            Access premium features that drive smarter farming decisions.
            <br />
            1-month trial for ₱0 • Then ₱50/week • Cancel anytime
          </p>
          <p className="text-lg">Or save money with other plans</p>
          <Button className="text-xl p-8 rounded-2xl">
            <b>Try 1 month for</b> ₱0
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <SubscriptionModels icon="seedling" frequency="Week" price="50" />
        <SubscriptionModels icon="plant" frequency="Month" price="150" />
        <SubscriptionModels icon="tree" frequency="Year" price="1000" />
      </div>

      <h2 className="text-primary text-center text-5xl font-bold">
        Try Sprout Premium Now
      </h2>
    </div>
  );
}

export default Pricing;
