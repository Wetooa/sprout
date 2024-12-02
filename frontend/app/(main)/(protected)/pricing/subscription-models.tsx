import React from "react";
import { Button } from "@/components/ui/button";
import SproutHeader from "@/components/sprout-header";
import Image from "next/image";

interface SubscriptionModelsProps {
  icon: string;
  frequency: string;
  price: string;
}

function SubscriptionModels(props: SubscriptionModelsProps) {
  const { frequency, price, icon } = props;
  return (
    <div className="bg-white/60 w-full p-8 rounded-lg space-y-5 text-primary backdrop-blur">
      <div className="flex items-center border-b-2">
        <Image
          src={`/icons/${icon}.svg`}
          alt="sprout"
          width={50}
          height={50}
          className="w-16 aspect-square"
        />
        <p className="capitalize">{frequency}ly</p>
        <SproutHeader className="ml-auto" />
      </div>

      <div>
        <p className="text-lg">
          ₱{price}/{frequency}
        </p>
        <p>1-month trial for ₱0</p>
      </div>

      <Button className="text-white w-full p-6 text-lg">
        <b>Try 1 {frequency} for</b> ₱{price}
      </Button>
    </div>
  );
}

export default SubscriptionModels;
