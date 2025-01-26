"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Connection,
  PublicKey,
} from "@solana/web3.js";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDashhProgram } from "@/components/dashh/dashh-data-access";

export const dynamic = "force-dynamic";

export default function CreatorForm() {
  const [url_data, seturl_data] = useState("");
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [content, setContent] = useState({
    title: "",
    description: "",
    label: "",
    amount: "",
    icons: "",
    end: "",
  });
  const { createCampaign } = useDashhProgram();

  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  // async function sendTransaction() {
  //   if (!walletAddress) {
  //     console.log('Wallet not connected');
  //     return;
  //   }

  //   const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  //   const recipientAddress = new PublicKey("8vbaCLhg1SZmiGNZfFzV2DEJHenFtdgg7G2JtY5v74i1"); // Public address of the recipient
  //   const senderPublicKey = new PublicKey(walletAddress?walletAddress:"" ); // Sender's public key (your wallet)

  //   const transaction = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: senderPublicKey,
  //       toPubkey: recipientAddress,
  //       lamports: formamount * LAMPORTS_PER_SOL // Amount to send (in lamports, 1 SOL = 1e9 lamports)
  //     })
  //   );

  //   try {
  //     const { blockhash } = await connection.getLatestBlockhash(); // Fetch recent blockhash
  //     transaction.recentBlockhash = blockhash;
  //     transaction.feePayer = senderPublicKey; // Set fee payer to sender's public key

  //     const { solana }: any = window;
  //     const signedTransaction = await solana.signTransaction(transaction); // Sign transaction with Phantom
  //     const signature = await connection.sendRawTransaction(signedTransaction.serialize()); // Send signed transaction
  //     await connection.confirmTransaction(signature); // Confirm the transaction

  //     // console.log('Transaction successful, signature:', signature);
  //   } catch (error) {
  //     console.error('Error sending transaction:', error);
  //   }
  // }
  useEffect(() => {
    const getValue = async () => {

    
     
      console.log('New account public key:',  );
      }
    getValue();
  }
  , []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      // Client-side-only code
      const { solana }: any = window;
      // Request connection to Phantom
      const response = await solana.connect();
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const formData = new FormData(e.target as HTMLFormElement);
      // console.log(endDate?.getTime());
      // const data = {
      //   solAdd: response.publicKey.toString(),
      //   title: formData.get("title"),
      //   description: formData.get("description"),
      //   label: formData.get("label"),
      //   amount: formData.get("amount"),
      //   icons: formData.get("icons"),
      //   end: endDate ? endDate.toISOString() : new Date().toISOString(),
      // };
      try {
        if (response.publicKey) {
    const res =   await createCampaign.mutateAsync({
            id: 0,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            image: formData.get("icons") as string,
            lable: formData.get("label") as string,
            endtime: endDate
              ? (endDate.getTime() as number)
              : (new Date().getTime() as number),
            reward: Number(formData.get("amount")) as number,
            owner: response.publicKey as PublicKey,
          });
          if(res){

            const transactionDetails = await connection.getTransaction(res);
            // console.log('accounts-ss',transactionDetails?.transaction.message.accountKeys[1].toBase58());
            seturl_data(transactionDetails?.transaction.message.accountKeys[1].toBase58()?transactionDetails?.transaction.message.accountKeys[1].toBase58():"");
          }
          else {
            return<div>Error Loading</div>
          }
        } else {
          <div>
            <h1>Wallet not connected</h1>
          </div>;
        }
      } catch (error) {
        console.log(error);
      }


       setOpen(true);
      // if (response.data.data._id != undefined) {
      //   // setFormAmount(Number(formData.get("amount")));

      //   // sendTransaction();
      //   seturl_data(response.data.data._id);
      //   setOpen(true);
      // }
    }
  };
  function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
console.log(e);
      return false;
    }
  }
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Dialog  open={open} onOpenChange={setOpen} >
          <DialogContent >
            <DialogHeader>
              <DialogTitle >Share Your Blink</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <Button
                className="mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 sm:mr-15 px-4 py-2 text-white text-xl font-medium rounded hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 w-full "
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`
                  );
                  toast.success("Link copied to clipboard!");
                }}
              >
                Copy Text
              </Button>
            </div>
            <DialogFooter>
              <div className="flex opacity-70 justify-center align-middle items-center flex-col space-y-3">


                <div className="flex space-x-2 ">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-blue-500 text-white w-full">
                      Share on Facebook
                    </Button>
                  </Link>
                  <Link
                    href={`https://twitter.com/intent/tweet?text=Here%20is%20the%20new%20campaign%20in%20which%20you%20can%20participate!%20&hashtags=Blinks&via=dashh_media&url=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-blue-400 text-white w-full">
                      Share on Twitter
                    </Button>
                  </Link>
                  <Link
                    href={`https://www.instagram.com/?url=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-red-500 text-white w-full">
                      Share on Instagram
                    </Button>
                  </Link>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-blue-700 text-white w-full">
                      Share on LinkedIn
                    </Button>
                  </Link>
                  <Link
                    href={`https://www.twitch.tv/share?url=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-purple-500 text-white w-full">
                      Share on Twitch
                    </Button>
                  </Link>
                  <Link
                    href={`https://discord.com/channels/@me?url=https://dial.to/?action=solana-action:https://blinks.knowflow.study/api/donate/${url_data}&cluster=devnet`}
                  >
                    <Button className="bg-indigo-500 text-white w-full">
                      Share on Discord
                    </Button>
                  </Link>
                </div> </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className=" mt-20 flex flex-col md:flex-row items-center p-3 justify-center">
          <div className="w-full md:w-[55%] mx-8 border p-4  text-zinc-200 bg-black shadow-lg rounded-lg border-gray-800">
            <CardHeader className="p-3 border-b border-gray-800">
              <CardTitle className="text-xl text-center  font-semibold text-white">
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center">
                  <Label
                    htmlFor="title"
                    className="block mr-6 text-sm font-medium text-zinc-200"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    className="bg-black border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                    placeholder="Enter product title"
                    value={content.title}
                    onChange={(e) =>
                      setContent({ ...content, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center">
                  <Label
                    htmlFor="icons"
                    className="block mr-6 text-sm font-medium text-gray-200"
                  >
                    Image URL
                  </Label>
                  <Input
                    id="icons"
                    name="icons"
                    type="url"
                    required
                    value={content.icons}
                    className="bg-black border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) =>
                      setContent({ ...content, icons: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center">
                  <Label
                    htmlFor="description"
                    className="block mr-6 text-sm font-medium text-zinc-200"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    className="bg-black border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                    placeholder="Describe your product"
                    rows={4}
                    value={content.description}
                    onChange={(e) =>
                      setContent({ ...content, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center">
                  <Label
                    htmlFor="label"
                    className="block mr-6 text-sm font-medium text-zinc-200"
                  >
                    Label
                  </Label>
                  <Input
                    id="label"
                    name="label"
                    required
                    value={content.label}
                    className="bg-black border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                    placeholder="Not visible in blinks"
                    onChange={(e) =>
                      setContent({ ...content, label: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center">
                  <Label
                    htmlFor="end"
                    className="block mr-6 text-sm font-medium text-zinc-200"
                  >
                    End Date
                  </Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    className="w-full bg-black border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                  />
                </div>
                <div className="flex items-center">
                  <Label
                    htmlFor="amount"
                    className="block mr-6 text-sm font-medium text-zinc-200"
                  >
                    Amount $
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    value={content.amount}
                    className="bg-black w-fit border-gray-800 text-white placeholder-zinc-400 focus:border-white focus:ring-white"
                    placeholder="0.00"
                    step="0.01"
                    onChange={(e) =>
                      setContent({ ...content, amount: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff9a9e] to-[#ff6b95] text-white "
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </div>


          {/* card */}
          <div className="flex justify-center items-center p-2">
            <div className="flex flex-col justify-center items-center">
              <div className="text-white font-extrabold text-xl text-center my-8">
                {" "}
                Your Blinks Will Look like this
              </div>

              <div className="flex border  border-white border-opacity-30 flex-col w-full max-w-[45rem] min-w-80 bg-white rounded-xl shadow-lg overflow-hidden p-4 sm:w-[20rem] md:w-[25rem]">
                <div className="relative h-48">
                  <div className="p-3">
                    <Image
                      src={
                        isValidURL(content.icons)
                          ? content.icons
                          : "https://t3.ftcdn.net/jpg/07/46/54/88/360_F_746548833_Cw1ZK4jF4S6SEg4yXQ3aQwv9cfIpJxBR.jpg"
                      }
                      alt="Solana Blinks"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                </div>
                <div className="text-zinc-500 flex gap-2 items-center mt-3 ">
                  <p className="text-[13px] font-semibold">
                    blinks.knowflow.study
                  </p>
                  <FontAwesomeIcon icon={faShieldHalved} size="sm" />
                </div>
                <div className="">
                  <div className="flex flex-col gap-2 my-2">
                    <h2 className="text-xl font-bold text-black">
                      {content.title ? content.title : "Title"}
                    </h2>
                  </div>

                  <p className="text-zinc-800 mb-4">
                    {content.description ? content.description : "Description"}{" "}
                  </p>

                  <div className="flex gap-1 m-1">
                    <button className="bg-black border border-opacity-30 border-slate-300 text-white  hover:bg-gray-800 py-2 px-4 rounded-lg relative w-full">See Leaderboard</button>
                    <button className="bg-black border border-opacity-30 border-slate-300 text-white  hover:bg-gray-800 py-2 px-4 rounded-lg relative w-full">Verify With Reclaim</button>
                  </div>

                  <button className="bg-black border border-opacity-30 border-slate-300 text-white  hover:bg-gray-800 py-2 px-4 rounded-lg relative w-full">
                    Participate 0.1 SOL
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-25 w-2/3 h-full transform -translate-x-full -translate-y-full animate-slide-diagonal"></div>
                <style jsx>{`
                  @keyframes slide-diagonal {
                  0% {
                    transform: translateX(-100%) translateY(-0%);
                  }
                  100% {
                    transform: translateX(200%) translateY(0%);
                  }
                  }
                  .animate-slide-diagonal {
                  animation: slide-diagonal 2s infinite;
                  }
                `}</style> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );

}
