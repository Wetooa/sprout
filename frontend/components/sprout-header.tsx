import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

function SproutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-primary flex gap-2 items-center w-10", className)}
      {...props}
    >
      <Image
        src={"/icons/sprout-icon.svg"}
        alt="sprout"
        width={30}
        height={30}
        className="w-fit aspect-square"
      />
      <h6>SPROUT</h6>
    </div>
  );
}

export default SproutHeader;
