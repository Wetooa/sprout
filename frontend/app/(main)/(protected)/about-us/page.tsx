import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Agricultural Empowerment Through Remote Sensing Technology",
};

function AboutUs() {
  return (
    <div className="w-full h-full bg-[url('/bg/sign-in.png')] bg-cover bg-no-repeat ">
      <div className="flex flex-col gap-4 max-w-6xl p-[10%]">
        <section className=" bg-white/60 backdrop-blur p-8 rounded-2xl text-center space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">Our Company</h2>
          <div className="bg-white/60 backdrop-blur p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold">Our Story</h3>
            <p className="text-primary">
              Sprout was founded with a deep understanding of the struggles
              farmers face due to unpredictable weather, resource constraints,
              and the growing need for sustainable practices. Our platform
              combines advanced technologies like AI-powered weather forecasts,
              NDVI data, and real-time alerts to offer farmers comprehensive
              insights into their land and crops.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold">Our Mission</h3>
            <p className="text-primary">
              At Sprout, our mission is to empower farmers with cutting-edge
              technology, helping them adapt to climate change, increase
              productivity, and make data-driven decisions. We believe that
              every farmer deserves access to the tools that ensure a
              sustainable future for their crops and communities.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold">Our Vision</h3>
            <p className="text-primary">
              We envision a world where farmers of all sizes can thrive despite
              environmental challenges. By providing real-time insights and
              forecasts, Sprout helps farmers stay resilient, improve yields,
              and contribute to food security globally.
            </p>
          </div>
        </section>

        <section className=" bg-white/60 backdrop-blur p-8 rounded-2xl text-center space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">Meet the Team</h2>
          <div className="grid grid-rows-2 grid-cols-3"></div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
