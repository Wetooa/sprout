import { cn } from "@/lib/utils";
import React from "react";

function SproutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-primary", className)} {...props}>
      <h6>SPROUT</h6>
    </div>
  );
}

export default SproutHeader;
