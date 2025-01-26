import { Card } from "@/components/ui/card";
import React from "react";
import { SolanaBlinksCard } from "./SolanaBlinksCard";
import { useDashhProgramAccount } from "@/components/dashh/dashh-data-access";
import { PublicKey } from "@solana/web3.js";
import { ICreator } from "@/lib/interface/creater";
import BN from "bn.js";
const Preblink = ({ account, size }: { account: PublicKey; size: number }) => {
  const { accountQuery } = useDashhProgramAccount({
    account,
  });


  const title = accountQuery.data?.title;
  const icon = accountQuery.data?.image;
  const message = accountQuery.data?.description;
  const lable = accountQuery.data?.lable;
  const endtime = accountQuery.data?.endtime;
  const reward = accountQuery.data?.reward;
  const owner = account.toBase58();
  const id = accountQuery.data?.id;

  //   const title = accountQuery.data?.title;

  //   const isFormValid = message.trim() !== "";

  //   const handleSubmit = () => {
  //     if (publicKey && isFormValid && title) {
  //       updateEntry.mutateAsync({ title, message, owner: publicKey });
  //     }
  //   };

  //   if (!publicKey) {
  //     return <p>Connect your wallet</p>;
  //   }  const idAsNumber = new BN(id).toNumber();
  const idAsNumber = new BN(id || 0).toNumber();
  const rewardAsNumber = new BN(reward || 0).toNumber();
  const endAsNumber = new BN(endtime || 0).toNumber();

  const cat: ICreator = {
    id: idAsNumber.toString(), // Ensure id is a string if that's the type in ICreator
    title: title ? title : "",
    icons: message ? message : "",
    description: icon ? icon : "",
    label: lable ? lable : "",
    end: new Date(endAsNumber), // Ensure endtime is a Date object
    amount: rewardAsNumber,
    solAdd: owner ? owner : "",
    users: [],
    _id: idAsNumber.toString(), // Ensure _id is a string if that's the type in ICreator
  };
  return (
    <>
      <Card className="bg-black text-white h-fit border-gray-800">
        <SolanaBlinksCard content={cat} id={cat.id} size={size} />
      </Card>
    </>
  );
};

export default Preblink;
