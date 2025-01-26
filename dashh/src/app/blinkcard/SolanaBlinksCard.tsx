"use client";

import Link from "next/link";
import Image from "next/image";
import { ICreator } from "@/lib/interface/creater";
import { Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashhProgram } from "@/components/dashh/dashh-data-access";
// import { BN } from 'bn.js'
import { useAnchorProvider } from "@/components/solana/solana-provider";
// import { PublicKey } from '@solana/web3.js'

export function SolanaBlinksCard({
  content,
  id,
  size,
}: {
  content: ICreator;
  id: string;
  size: number;
}) {
  const provider = useAnchorProvider();
  const daysLeft = content.end
    ? Math.max(
        0,
        Math.floor(
          (new Date(content.end).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : "N/A";

  const { createParticipant } = useDashhProgram();
  const handleparticipate = async (e: any) => {
    e.preventDefault();
    console.log(id);
    await createParticipant
      .mutateAsync({
        id: Number(id),
       user: provider.wallet.publicKey, 
        points: 0,
      })
      .then(function () {
        console.log("done");
      })
      .catch(function () {
        console.log("error");
      });
  };
  const getDashboardLink = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost") {
        return `/dashboard/${id}`;
      } else {
        return `https://blinks.knowflow.study/dashboard/${id}`;
      }
    }
    return `https://blinks.knowflow.study/dashboard/${id}`;
  };

  return (
    <div className="relative w-full max-w-[22rem] min-w-80 rounded-xl overflow-hidden sm:w-[20rem] md:w-[25rem] bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 font-mono shadow-xl">
      <div className="relative h-48">
        <Image
          src={content.icons}
          alt={content.title}
          layout="fill"
          objectFit="cover"
          className="brightness-90"
        />
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-md text-white/80 text-xs">
          #blinks
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <h2 className="text-xl font-bold text-white">{content.title}</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2 text-pink-300">
            <Trophy className="w-4 h-4" />
            <span>Total Prize - ${content.amount}</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-300">
            <Clock className="w-4 h-4" />
            <span>Days Left - {daysLeft}</span>
          </div>
        </div>

        <div className="text-center py-2 px-4 bg-[#1a1a1a]/40 rounded-lg backdrop-blur-sm">
          <span className="text-xs text-gray-400">
            Current participants:{" "}
            <span className="text-white font-medium">{size}</span> users
          </span>
        </div>

        <div className="space-y-2">
          <Button

            className="block w-full py-2 text-center font-bold text-white rounded-lg bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] hover:opacity-90 transition-all duration-300"
            onClick={handleparticipate}
          >
            Participate
          </Button>

          <Link
            href={getDashboardLink()}
            className="block w-full py-2 text-center font-medium text-gray-400 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            VIEW LEADERBOARD
          </Link>
        </div>
      </div>
    </div>
  );
}