'use client';
import React from 'react';
import Footer from "@/components/footer";
import Hero from "@/components/hero2";
import Demo from "@/components/demo2";
import APISection from "@/components/APISection2";
import { cn } from "@/lib/utils";
import {

  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,

  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export const dynamic = 'force-dynamic';

export default function FrontPage() {
  const features = [
    {
      title: "Transaction Tracking",
      description: "Keep track of your transactions and ensure you meet the required amount to participate.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Reclaim Protocol Signup",
      description: "Sign up for the Reclaim Protocol to start getting views on your Instagram stories.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Engagement Tracking",
      description: "Track the engagement on your Instagram stories and see how you rank.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Find Top Stories",
      description: "Discover the top-performing Instagram stories and learn from the best.",
      icon: <IconCloud />,
    },
    {
      title: "Secure Transactions",
      description: "Your transactions are secure and protected at all times.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Collaborative Engagement",
      description: "Collaborate with others to boost your story views and engagement.",
      icon: <IconHelp />,
    },
  ];

  return (
    <>
      <Hero />
      <Demo />
      <APISection />
      <section className=" flex justify-center w-full  md:py-24 lg:py-12 xl:py-12 ">
        <div className="container flex justify-center items-center px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center items-center space-y-8 text-center gap-7">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 p-2">
                  Engage and Earn&nbsp;
                  <span className="bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] bg-clip-text text-transparent">
                    with Instagram Stories
                  </span>
                </h3>
                <p className="max-w-[600px] text-normal mx-auto">
                  Perform transactions, sign up for the Reclaim Protocol, and
                  get views on your Instagram stories. The highest engagement
                  wins the total bid amount collected.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-5 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                  <Feature key={feature.title} {...feature} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-10 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ff9a9e] via-[#ff6b95] dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-10 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#ff9a9e] via-[#ff6b95] dark:from-neutral-800 to-transparent pointer-events-none" />

      )}
      <div className="mb-4 relative z-5 px-10 text-white dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-5 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-gradient-to-r from-[#ff9a9e] to-[#ff6b95] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-white dark:text-white max-w-xs relative z-5 px-10">
        {description}
      </p>
    </div>
  );
};