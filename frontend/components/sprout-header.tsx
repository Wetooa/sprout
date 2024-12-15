import { cn } from "@/lib/utils";
import React from "react";

interface SproutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

function SproutHeader({ color, className, ...props }: SproutHeaderProps) {
  return (
    <div
      className={cn("flex text-primary h-10 items-center ", className)}
      {...props}
    >
      <div className="relative h-full aspect-square justify-center flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-[60%] h-[60%]"
          viewBox="0 0 112 112"
        >
          <path
            stroke={color || "#A7F3D0"}
            strokeWidth={6}
            d="m56 10.927-6.266 10.451c-4.926 8.218-7.389 12.326-7.389 16.866 0 4.54 2.463 8.648 7.39 16.865l3.925 6.548c1.045 1.743 1.567 2.615 2.34 2.615.773 0 1.295-.872 2.34-2.615l3.926-6.548c4.926-8.217 7.389-12.325 7.389-16.865 0-4.54-2.463-8.648-7.39-16.866L56 10.927Zm0 0V0m44.545 57.902-12.177-.205c-9.573-.162-14.36-.242-18.287 2.028-3.929 2.27-6.252 6.459-10.9 14.837l-3.703 6.676c-.986 1.778-1.479 2.667-1.092 3.336.386.67 1.402.687 3.433.721l7.628.129c9.573.161 14.36.241 18.288-2.028 3.928-2.27 6.252-6.46 10.9-14.838l5.91-10.656Zm0 0L110 52.438m-98.545 5.464 12.176-.205c9.574-.162 14.36-.242 18.288 2.028 3.929 2.27 6.252 6.459 10.9 14.837l3.703 6.676c.986 1.778 1.479 2.667 1.092 3.336-.386.67-1.402.687-3.433.721l-7.628.129c-9.573.161-14.36.241-18.288-2.028-3.928-2.27-6.252-6.46-10.9-14.838l-5.91-10.656Zm0 0L2 52.438m54 18.586V112"
          />
        </svg>
      </div>

      <h6>SPROUT</h6>
    </div>
  );
}

export default SproutHeader;
