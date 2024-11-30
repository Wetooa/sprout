import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

function IconInput({
  icon,
  className,
  ...props
}: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) {
  return (
    <div className="relative flex-1">
      <div className="absolute h-full left-4 w-auto flex items-center group-focus:outline-primary">
        {icon}
      </div>
      <Input
        className={cn(className, "px-12 group py-6 border-2 border-primary")}
        {...props}
      />
    </div>
  );
}

export { IconInput };
