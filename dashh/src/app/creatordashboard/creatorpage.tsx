"use client";
import React, { useState } from "react";
import Link from "next/link";
import CustomToggle from "@/components/custom-toggle";
import { useDashhProgram } from "@/components/dashh/dashh-data-access";
import Preblink from "../blinkcard/Preblink";
import { useAnchorProvider } from "@/components/solana/solana-provider";
import { BN } from "@coral-xyz/anchor";

const Creatorpage = () => {
  const provider = useAnchorProvider();
  const { accounts, getProgramAccount, paccounts } = useDashhProgram();
  const [selectedOption, setSelectedOption] = useState("Live");
  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!provider.wallet.publicKey) {
    return (
      <div className="flex justify-center alert alert-info">
        <span>Please connect your wallet to view the events.</span>
      </div>
    );
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="flex justify-center alert alert-info">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }

  let creator = accounts.data?.filter(
    (account) => {
      return account.account.owner.toString() == provider.wallet.publicKey.toString();
    }
  );
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (selectedOption === "Closed") {
    creator = creator?.filter(
      (creato) =>
        new Date(new BN(creato.account.endtime).toNumber()) < yesterday,
    );
  } else {
    creator = creator?.filter(
      (creato) =>
        new Date(new BN(creato.account.endtime).toNumber()) > yesterday,
    );
  }
  if (accounts.data) {
    creator = creator?.sort((a, b) => {
      const aDaysLeft =
        (new Date(new BN(a.account.endtime).toNumber()).getTime() -
          new Date().getTime()) /
        (1000 * 60 * 60 * 24);
      const bDaysLeft =
        (new Date(new BN(b.account.endtime).toNumber()).getTime() -
          new Date().getTime()) /
        (1000 * 60 * 60 * 24);
      return bDaysLeft - aDaysLeft;
    });
  }
  const handleToggle = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col gap-5 w-screen">
      <div className="flex justify-between  items-center text-white">
        <div>
          <CustomToggle options={["Live", "Closed"]} onChange={handleToggle} />
        </div>

        <Link className="flex justify-center items-center z-10" href="/form">
          <button className="bg-gd sm:mr-15 px-4 py-2 text-white text-lg font-medium rounded-lg ">
            Add Event
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center font-mono font-semibold text-xl text-white">
        Creater's Event
      </div>
      <div className="flex flex-wrap gap-5 justify-center md:col-span-2 lg:col-span-1">
        {
        creator?.length == 0?
           <div className="text-white">No events found</div>
          
      :
        
        creator?.map((cat) => {
          const val = paccounts.data?.filter((paccount) => {
            return (
              new BN(paccount.account.id || 0).toNumber() ==
              new BN(cat.account.id || 0).toNumber()
            );
          });

          return (
            <>
              <Preblink
                size={val?.length ? val?.length : 0}
                key={cat.publicKey.toString()}
                account={cat.publicKey}
              />
            </>
          );
        })
        }
      </div>
    </div>
  );
};

export default Creatorpage;