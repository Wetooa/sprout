import React from "react";
import { Input } from "./ui/input";

function IconInput({
  icon,
  ...props
}: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <div className="absolute h-full left-2 w-auto flex items-center">
        {icon}
      </div>
      <Input className="pl-4" {...props} />
    </div>
  );
}

export { IconInput };
