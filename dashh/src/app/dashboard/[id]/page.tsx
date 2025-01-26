"use client";
import React from "react";
import Image from "next/image";
import { Clock, Trophy } from "lucide-react";
import { BN } from "bn.js";
import { useDashhProgram } from "@/components/dashh/dashh-data-access";
import { useAnchorProvider } from "@/components/solana/solana-provider";
// import Link from "next/link";
import { useEffect, useState } from "react";
import Verify from "../../../components/verifyClaim/verfy";
function shortname(name: string) {
  return `${name.slice(0, 4)}...${name.slice(-4)}`;
}

export default function Page({ params }: { params: { id: string } }) {
  const { accounts, paccounts } = useDashhProgram();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const data = paccounts.data?.filter(
    (account) =>
      new BN(account.account.id || 0).toNumber() === Number(params.id),
  );
  const leaderboard = data?.sort(
    (a: any, b: any) => b.account.points - a.account.points,
  );
  const myData = data?.find(
    (account) =>
      new BN(account.account.id || 0).toNumber() == Number(params.id),
  );
  const myRank =
    (leaderboard?.findIndex(
      (account) =>
        new BN(account.account.id || 0).toNumber() == Number(params.id),
    ) ?? -1) + 1;
  const provider = useAnchorProvider();

  const myv = accounts.data?.find(
    (account) => account.account.id.toNumber() === Number(params.id),
  );

  useEffect(() => {
    if (myv?.account.endtime) {
      console.log(new BN(myv?.account.endtime).toNumber());
      console.log(Math.floor(Date.now()));
      const endTime = new BN(myv?.account.endtime).toNumber();
      const updateTimer = () => {
        const now = Math.floor(Date.now());

        const timeRemaining = endTime - now;
        setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
      };

      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);

      return () => clearInterval(intervalId);
    }
  }, [myData]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  const creator = accounts.data?.find(
    (account) =>
      account.account.owner.toString() == provider.wallet.publicKey.toString(),
  );
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    {isOpen ? (
      <div className="min-h-screen text-white mt-8 sm:p-8 font-mono">
      <div className="max-w-4xl mx-auto mt-16  space-y-8">
        <div className="text-white flex justify-center m-5 gap-3">
          {myData ? (

              <button onClick={()=>setIsOpen(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white text-xl font-medium rounded hover:bg-blue-700">
                Verify with Reclaim
              </button>
            
          ) : (
            <></>
          )}

          {creator ? (
            <>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white text-xl font-medium rounded hover:bg-green-700">
                Disperse
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] text-transparent bg-clip-text">
            LEADERBOARD
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Top performers in the challenge
          </p>
        </div>

        {/* Podium */}
        <div className="relative h-[200px] sm:h-[250px]">
          {leaderboard?.slice(0, 3).map((player, index) => (
            <div
              key={new BN(player.account.id || 0).toNumber()}
              className={`absolute ${index === 1 ? "left-1/2 bottom-8 transform -translate-x-1/2" : index === 0 ? "left-0 sm:left-1/4 bottom-0 transform sm:-translate-x-1/2" : "right-0 sm:left-3/4 bottom-0 transform sm:-translate-x-1/2"} flex flex-col items-center`}
            >
              <div className="relative mb-2">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${index === 1 ? "sm:w-24 sm:h-24" : ""} rounded-lg overflow-hidden`}
                >
                  <Image
                    src={
                      index === 0
                        ? "https://assets.promptbase.com/DALLE_IMAGES%2F3X1SXaf7riVzZ4fmeD70dlwbQvD3%2Fresized%2F1679336685019_800x800.webp?alt=media&token=d2d7f2fa-d397-43c8-8f52-8282e5728752"
                        : index === 1
                          ? "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg"
                          : "https://i.pinimg.com/474x/aa/f8/59/aaf859dde8eb62bd0c382bb047a53ce7.jpg"
                    }
                    alt={player.publicKey.toString()}
                    width={96}
                    height={96}
                    className="object-cover mix-blend-overlay"
                  />
                </div>
                {/* <Crown className={`absolute ${index === 1 ? '-top-6 w-10 h-10' : '-top-4 w-8 h-8'} left-1/2 transform -translate-x-1/2 text-yellow-400`} /> */}
              </div>
              <div className="bg-black/50 p-2 rounded text-xs sm:text-sm space-y-1">
                <p className="bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] text-transparent bg-clip-text font-bold">
                  [{index + 1}] {shortname(player.account.user.toString())}
                </p>
                <p className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#ff6b95] to-[#a855f7] rounded-full" />
                  {player.account.points.toNumber()} SOL
                </p>
              </div>
              <div
                className={`w-24 sm:w-32 h-24 sm:h-32 ${index === 1 ? "h-32 sm:h-40" : index === 2 ? "h-20 sm:h-24" : ""} bg-gradient-to-r from-[#ff9a9e]/20 to-[#a855f7]/20 transform skew-y-[45deg] -z-10 absolute -bottom-12 sm:-bottom-16`}
              />
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="text-center pt-10 sm:pt-16 mb-6">
          <div className="flex items-center justify-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>Ends in</span>
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] text-transparent bg-clip-text">
            {myv?.account.endtime
              ? formatTime(timeLeft || 0)
              : "Challenge Ended 🎉"}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-900/50 rounded-full py-2 px-4 text-center text-sm text-gray-400">
          <span>
            You earned{" "}
            <span className="text-[#ff6b95]">
              {myData?.account.points.toNumber()}
            </span>{" "}
            today and are ranked <span> {myRank}</span> out of{" "}
            <span className="text-white">{leaderboard?.length}</span> users
          </span>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left p-2 sm:p-4">PLACE</th>
                <th className="text-left p-2 sm:p-4">USERNAME</th>
                <th className="text-right p-2 sm:p-4">VIEWS</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard?.slice(3).map((player, index) => (
                <tr
                  key={player.account.id.toNumber()}
                  className="border-b border-gray-800"
                >
                  <td className="p-2 sm:p-4 flex items-center">
                    <Trophy className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] text-transparent bg-clip-text">
                      {index + 4}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4">
                  {shortname(player.account.user.toString())}
                  </td>
                  <td className="p-2 sm:p-4 text-right flex items-center justify-end">
                    {player.account.points.toNumber()}
                    <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#ff6b95] to-[#a855f7] rounded-full ml-2" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ):(<Verify uid={params.id}/>)}
    </>
    
  );
}