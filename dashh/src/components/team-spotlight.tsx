"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronRight } from "lucide-react";
import Akshat from "@/images/Akshat.jpg";
import Pranesh from "@/images/Pranesh.jpg";
import Kartik from "@/images/skartik.png";

interface TeamMember {
  id: string;
  name: string;
  image: StaticImageData;
  description: string[];
}
// https://img.freepik.com/premium-photo/captivating-black-white-linkedin-profile-picture-fitness-writerjournalist_983420-47941.jpg

const teamMembers: TeamMember[] = [
  {
    id: "akshat",
    name: "Akshat",
    image: Akshat,
    description: [
      "An accomplished innovator, this individual achieved 4th Prize in Solana Radar Hackathon’s Reclaim Side Track. They are the visionary behind WIZZ, a cutting-edge SocialFi platform that empowers users to build, share, and earn in a decentralized digital economy. Additionally, they contributed to Titan Technologies, which focuses on advanced security solutions, and Sleek, an e-commerce brand revolutionizing access to quality products.",
      "Their work reflects a deep understanding of technology and innovation. Explore their contributions through platforms like WIZZ (https://wizz-new.vercel.app), Titan Technologies (https://www.titantechnologies.in/), and Sleek (https://just-sleek.vercel.app).",
    ],
  },
  {
    id: "kartik",
    name: "Singupalli Kartik",
    image: Kartik,
    description: [
      "With a strong technical background, this individual also earned 4th Prize in Solana Radar Hackathon’s Reclaim Side Track. Their diverse projects include WIZZ, redefining digital finance, and DASHH, a decentralized advertising platform enhancing secure engagement. Other contributions include Blogbit, a blogging platform fostering user interaction, and UpskillMafia, a sports enthusiast networking site.",
      "Their dedication to solving modern challenges is evident in every project. Explore their work on platforms like DASHH (https://blinks.knowflow.study), Blogbit (https://acehack.vercel.app), and QuikPic (https://main--quikpikweb.netlify.app).",
    ],
  },
  {
    id: "pranesh",
    name: "Pranesh",
    image: Pranesh,
    description: [
      "A tech enthusiast with expertise in decentralized solutions, this individual spearheaded projects like DASHH, a secure and transparent advertising platform. They also contributed to Bloggies, a CRM-based blogging website fostering community engagement, and UpskillMafia, a platform connecting sports enthusiasts.",
      "Their ability to create impactful solutions stands out in every project they undertake. Check out their work on DASHH (https://blinks.knowflow.study), Bloggies (https://acehack.vercel.app), and UpskillMafia (https://virtualhackathon.vercel.app).",
    ],
  },
];

export function TeamSpotlight() {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  return (
    <section className="flex justify-center py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="h-main tracking-tighter text-white lg:text-5xl">
            In the spotlight –&nbsp;
            <span className="bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] bg-clip-text text-transparent">
              DASHH's brightest stars
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Meet the minds behind our best work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px,1fr,1fr]">
          {/* Team member selection */}
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`group relative w-full rounded-xl p-4 text-left transition-all ${
                  selectedMember.id === member.id
                    ? "bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7]"
                    : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {member.name}
                  </span>
                  <ChevronRight
                    className={`ml-auto h-5 w-5 transform text-white transition-transform ${
                      selectedMember.id === member.id
                        ? "rotate-90"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Selected member photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
            <Image
              src={selectedMember.image}
              alt={selectedMember.name}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>

          {/* Selected member description */}
          <div className="space-y-6">
            {selectedMember.description.map((paragraph, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-[#ff9a9e] to-[#a855f7]" />
                <p className="text-gray-300">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
