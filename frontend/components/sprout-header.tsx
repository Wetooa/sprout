import { cn } from "@/lib/utils";
import React from "react";
import SproutLogo from "./sprout-logo";

interface SproutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

function SproutHeader({ color, className, ...props }: SproutHeaderProps) {
  return (
    <div
      className={cn("flex text-primary h-10 items-center ", className)}
      {...props}
    >
      <SproutLogo className="fill-emerald-200" height="20" />
    </div>
  );
}

export default SproutHeader;
