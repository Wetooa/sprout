import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../../navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Agricultural Empowerment Through Remote Sensing Technology",
};
const members: MemberContainerProps[] = [
  {
    name: "Thomas Danjo Manulat",
    role: "Project Manager",
    alt: "thomas-image",
    image: "danjo.png",
    content:
      "Thomas ensures smooth project execution, coordinating between departments to keep Sprout’s development on track and aligned with farmers' needs.",
    socials: {
      linkedin: "https://linkedin.com/in/thomas",
      google: "https://plus.google.com/thomas",
      facebook: "https://facebook.com/thomas",
      twitter: "https://twitter.com/thomas",
      instagram: "https://instagram.com/thomas",
    },
  },
  {
    name: "Malt John Vianney C. Solon",
    role: "Lead Database Administrator & Infrastructure Engineer",
    alt: "malt-image",
    image: "malt.png",
    content:
      "Malt manages Sprout’s data architecture, ensuring efficient, secure, and scalable management of user information and weather analytics.",
    socials: {
      linkedin: "https://linkedin.com/in/malt",
      google: "https://plus.google.com/malt",
      facebook: "https://facebook.com/malt",
      twitter: "https://twitter.com/malt",
      instagram: "https://instagram.com/malt",
    },
  },
  {
    name: "Simon Lyster P. Escaño",
    role: "Creative UI/UX Lead",
    alt: "simon-image",
    image: "simon.jpg",
    content:
      "Simon designs Sprout’s user interface, crafting a user-friendly and aesthetically pleasing experience, making sure every farmer can easily navigate the app.",
    socials: {
      linkedin: "https://linkedin.com/in/simon",
      google: "https://plus.google.com/simon",
      facebook: "https://facebook.com/simon",
      twitter: "https://twitter.com/simon",
      instagram: "https://instagram.com/simon",
    },
  },
  {
    name: "Adrian T. Sajulga",
    role: "Backend Systems Architect",
    alt: "adrian-image",
    image: "adrian.png",
    content:
      "Adrian designs and implements scalable backend architectures, ensuring high performance and seamless integration across services.",
    socials: {
      linkedin: "https://linkedin.com/in/adrian",
      google: "https://plus.google.com/adrian",
      facebook: "https://facebook.com/adrian",
      twitter: "https://twitter.com/adrian",
      instagram: "https://instagram.com/adrian",
    },
  },
  {
    name: "Kaye Aizerner Evangelista",
    role: "Senior Backend & Integration Specialist",
    alt: "aizerner-image",
    image: "aizerner.png",
    content:
      "Kaye leads backend development, specializing in integrating complex systems to deliver efficient, reliable technical solutions.",
    socials: {
      linkedin: "https://linkedin.com/in/kaye",
      google: "https://plus.google.com/kaye",
      facebook: "https://facebook.com/kaye",
      twitter: "https://twitter.com/kaye",
      instagram: "https://instagram.com/kaye",
    },
  },
  {
    name: "Ranz Lumayno",
    role: "Backend Developer & Algorithm Specialist",
    alt: "ranz-image",
    image: "ranz.png",
    content:
      "Ranz focuses on backend development, crafting optimized algorithms that enhance system performance and handle data-driven tasks efficiently.",
    socials: {
      linkedin: "https://linkedin.com/in/ranz",
      google: "https://plus.google.com/ranz",
      facebook: "https://facebook.com/ranz",
      twitter: "https://twitter.com/ranz",
      instagram: "https://instagram.com/ranz",
    },
  },
];

interface CompanyNarrativeProps {
  title: string;
  content: string;
}

const companyNarrative: CompanyNarrativeProps[] = [
  {
    title: "Our Story",
    content:
      "Sprout was founded with a deep understanding of the struggles farmers face due to unpredictable weather, resource constraints, and the growing need for sustainable practices. Our platform combines advanced technologies like AI-powered weather forecasts, NDVI data, and real-time alerts to offer farmers comprehensive insights into their land and crops. ",
  },
  {
    title: "Our Mission",
    content:
      " At Sprout, our mission is to empower farmers with cutting-edge technology, helping them adapt to climate change, increase productivity, and make data-driven decisions. We believe that every farmer deserves access to the tools that ensure a sustainable future for their crops and communities. ",
  },
  {
    title: "Our Vision",
    content:
      " We envision a world where farmers of all sizes can thrive despite environmental challenges. By providing real-time insights and forecasts, Sprout helps farmers stay resilient, improve yields, and contribute to food security globally. ",
  },
];

function AboutUs() {
  return (
    <div className="w-full h-full relative bg-[url('/bg/sign-in.png')] bg-cover overflow-y-scroll bg-no-repeat">
      <div className="z-40 w-full p-4 top-0 fixed">
        <Navbar />
      </div>

      <div className="z-0 flex pt-32 flex-col gap-4 max-w-[1200px] p-12 mx-auto">
        <section className=" bg-white/60 backdrop-blur p-8 rounded-xl text-center space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">Our Company</h2>
          {companyNarrative.map((narrative) => {
            return (
              <div
                key={narrative.title}
                className="bg-white/60 backdrop-blur p-8 rounded-xl shadow-lg"
              >
                <h3 className="font-bold">{narrative.title}</h3>
                <p className="text-primary">{narrative.content}</p>
              </div>
            );
          })}
        </section>

        <section className=" bg-white/60 backdrop-blur p-8 rounded-xl text-center space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">Meet the Team</h2>
          <div className="grid grid-rows-2 grid-cols-3 gap-4">
            {members.map((member) => (
              <MemberContainer key={member.name} {...member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface MemberContainerProps {
  name: string;
  role: string;
  alt: string;
  content: string;
  image: string;

  socials: {
    linkedin?: string;
    google?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

function MemberContainer(props: MemberContainerProps) {
  const { name, role, content, image, alt, socials } = props;

  return (
    <div className="flex flex-col gap-4 bg-white/80 p-8 rounded-xl shadow-black h-full">
      <Image
        className="w-full rounded-full aspect-square border-4 border-primary"
        src={`/members/${image}`}
        alt={alt}
        width={300}
        height={300}
      />

      <h3 className="font-bold text-black">{name}</h3>

      <div className="p-1 text-white bg-gradient-to-b from-primary to-primary/80 rounded-lg">
        {role}
      </div>

      <p className="text-primary">{content}</p>

      <div className="flex justify-center gap-2 mt-auto">
        {Object.entries(socials).map(([key, value]) => {
          return (
            <Button
              key={key}
              variant={"secondary"}
              asChild
              className="bg-white/80 p-2 rounded-lg"
            >
              <Link href={value}>
                <Image
                  src={`icons/social-media/${key}.svg`}
                  alt={key}
                  width={24}
                  height={24}
                />
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default AboutUs;
