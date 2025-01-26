"use client";

import { ICreator } from "@/lib/interface/creater";
import { IUser } from "@/lib/interface/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const dynamic = "force-dynamic";

const Getsoladd = ({
  leaderboard,
  id,
  creator,
}: {
  leaderboard: IUser[];
  id: string;
  creator: ICreator;
}) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const isPhantomInstalled = () => {
    return (
      typeof window !== "undefined" &&
      window.solana &&
      (window.solana.isPhantom || window.solana.isMobile)
    );
  };

  useEffect(() => {
    getSolanaAddress();
  }, []);

  async function getSolanaAddress() {
    if (isPhantomInstalled()) {
      try {
        const { solana }: any = window;
        // Request connection to Phantom
        const response = await solana.connect();
        console.log("Connected to wallet:", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error("Error connecting to Phantom wallet:", error);
      }
    }
  }

  async function sendTransaction() {
    if (!walletAddress) {
      console.log("Wallet not connected");
      return;
    }

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const recipientAddress = new PublicKey(leaderboard[0].solAdd); // Public address of the recipient
    const senderPublicKey = new PublicKey(walletAddress); // Sender's public key (your wallet)

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientAddress,
        lamports: creator.amount * LAMPORTS_PER_SOL, // Amount to send (in lamports, 1 SOL = 1e9 lamports)

      }),

    );

    try {
      const { blockhash } = await connection.getLatestBlockhash(); // Fetch recent blockhash
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPublicKey; // Set fee payer to sender's public key

      const { solana }: any = window;
      const signedTransaction = await solana.signTransaction(transaction); // Sign transaction with Phantom
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),

      ); // Send signed transaction
      await connection.confirmTransaction(signature); // Confirm the transaction

      console.log("Transaction successful, signature:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  return (
    <div className="text-white flex justify-end m-5 gap-3">
      {leaderboard.some((item) => item.solAdd == walletAddress) && (

        <Link href={`/verifyClaim?title=test&id=${id}`}>
          <button className="mt-4 px-4 py-2 pt-10 bg-blue-600 text-white text-xl font-medium rounded hover:bg-blue-700">

            Verify with Reclaim
          </button>
        </Link>
      )}

      {creator.solAdd == walletAddress && (
        <>
          <button
            onClick={sendTransaction}
            className="mt-4 px-4 py-2 bg-green-600 text-white text-xl font-medium rounded hover:bg-green-700"
          >
            Disperse
          </button>
        </>
      )}
    </div>
  );
};

export default Getsoladd;