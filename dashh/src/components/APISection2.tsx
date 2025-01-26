'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

const codeString = `
import { Integration } from "@botpress/sdk";
import protonMailChannel from "./protonMailChannel";

export default new Integration({
  channels: {
    protonMailChannel: protonMailChannel,
  },
  actions: {
    sendEmail: ({ ctx }) => {
      console.info(\`sending email for bot\${ctx.botId}\`);
    },
  },
  register: async ({ ctx }) => {
    console.info(\`integration installed in bot \${ctx.botId}\`);
  },
  handler: async ({ req }) => {
    console.info("received request from protonMail", req);
  },
});
`;

export default function APISection() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="container relative z-5 mx-auto grid gap-8 px-4 md:grid-cols-2 md:gap-12">
        {/* Left content */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-white text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
             <span className='bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] bg-clip-text text-transparent'>Zk-TLS</span> for everything
          </h1>
          
          <div className="pt-4">
            <Link href='https://github.com/skartik-sk/blinks-mini'>
            <Button
              variant="outline"
              className="group border-white/20 bg-transparent text-white hover:bg-white/10"
              >
              Read docs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
              </Link>
          </div>
        </div>

        {/* Right content - Code preview */}
        <div className="relative rounded-lg border border-neutral-200 border-white/10 bg-black/50 p-1 mt-8 md:mt-0 overflow-hidden dark:border-neutral-800">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <MovingBorder duration={8000} rx="15px" ry="15px">
              <div className="h-40 w-40 opacity-[0.8] bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7]" />
            </MovingBorder>
          </div>
          <div className="relative rounded-lg bg-black p-2 sm:p-4 overflow-x-auto">
            <div className="flex gap-1.5 pb-2 sm:pb-4 sticky left-0">
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500" />
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500" />
            </div>
            <pre className="overflow-x-auto whitespace-pre">
              <code className="text-xs sm:text-sm text-gray-300 inline-block min-w-full">
                <SyntaxHighlighter
                  language="javascript"
                  style={solarizedlight}
                  customStyle={{ backgroundColor: '#000' }} // Set background color to black
                  className="text-xs sm:text-sm"
                >
                  {codeString}
                </SyntaxHighlighter>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

const MovingBorder = ({
  children,
  duration = 8000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
          background: 'linear-gradient(90deg, rgba(255,154,158,0) 0%, rgba(255,154,158,1) 50%, rgba(255,154,158,0) 100%)',
          width: '150px', // Increase the width for a smoother effect
          height: '150px', // Increase the height for a smoother effect
          borderRadius: '50%',
        }}
      >
        {children}
      </motion.div>
    </>
  );
};