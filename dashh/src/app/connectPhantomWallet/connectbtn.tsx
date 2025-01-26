"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";

interface ConnectPhantomWalletProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
}

export default function ConnectPhantomWallet({
  setWalletAddress,
}: ConnectPhantomWalletProps) {
  const [isClient, setIsClient] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This code will run only on the client side
    setIsClient(true);
    if (typeof window !== "undefined" && window.solana?.isConnected) {
      setIsConnected(true);
    }
  }, []);


  // Check if Phantom Wallet is installed
  const isPhantomInstalled = () => {
    return (
      typeof window !== "undefined" &&
      window.solana &&
      (window.solana.isPhantom || window.solana.isMobile)
    );
  };

  // Connect Phantom Wallet
  const connectPhantomWallet = async () => {
    if (isPhantomInstalled()) {
      try {
        const { solana }: any = window;
        // Request connection to Phantom
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to Phantom wallet:", error);
      }
    } else {
      alert("Phantom Wallet not installed. Please install it.");
    }
  };

  const disconnect = async () => {
    if (isPhantomInstalled()) {
      try {
        const { solana }: any = window;
        // Request disconnection from Phantom
        await solana.disconnect();
        setWalletAddress(null);
        setIsConnected(false);
      } catch (error) {
        console.error("Error disconnecting from Phantom wallet:", error);
      }
    } else {
      alert("Phantom Wallet not installed. Please install it.");
    }
  };

  return (
    <main className="font-mono">
      {isClient && !isConnected ? (
        <button
          onClick={connectPhantomWallet}
          className="relative bg-gradient-to-r flex justify-center items-center from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transform -translate-x-full animate-slide"></div>
          <style jsx>{`
            @keyframes slide {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-slide {
              animation: slide 2s infinite;
            }
          `}</style>
        </button>
      ) : (
        <button
          onClick={() => {
            disconnect();
            router.push("/");
          }}
          className="relative bg-gradient-to-r flex justify-center items-center from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Logout
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transform -translate-x-full animate-slide"></div>
          <style jsx>{`
            @keyframes slide {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-slide {
              animation: slide 2s infinite;
            }
          `}</style>
        </button>
      )}
    </main>
  );
}
