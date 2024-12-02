import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Agricultural Empowerment Through Remote Sensing Technology",
};

function AboutUs() {
  return (
    <div className="w-full h-full flex gap-10 bg-[url('/bg/sign-in.png')] bg-cover bg-no-repeat"></div>
  );
}

export default AboutUs;
