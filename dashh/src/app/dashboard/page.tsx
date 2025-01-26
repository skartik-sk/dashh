"use client";
// import connectDB from "@/lib/dbconnect";
// import { ICreator } from "@/lib/interface/creater";
// import Creator from "@/lib/models/creater";
import BN from "bn.js";
import { useDashhProgram } from "@/components/dashh/dashh-data-access";

import Preblink from "../blinkcard/Preblink";
export const dynamic = "force-dynamic";
export default function Component() {
  const { accounts, getProgramAccount, paccounts } = useDashhProgram();
  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
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
  accounts.data?.sort((a, b) => {
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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
 
  const account = accounts.data?.filter(
      (creato) =>
        new Date(new BN(creato.account.endtime).toNumber()) > yesterday,
    );
  return (
    <>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="flex flex-col gap-5 w-screen mt-24">
          <div className="flex justify-start gap-4  items-center text-white">
            <div className="flex justify-start">
              {/* <CustomToggle options={["All", "Participated"]} onChange={handleToggle} /> */}
            </div>
          </div>
          <div className="flex justify-center items-center font-semibold font-mono text-xl text-white w-full ">
            {/* <p className='w-fit'>Explore Events</p> */}
            Explore Events
          </div>
          <div className="flex flex-wrap gap-5 justify-center md:col-span-2 lg:col-span-1">
            {account?.map((account) => {
        
              const val = paccounts.data?.filter((paccount) => {

                return (
                  new BN(paccount.account.id || 0).toNumber() ==
                  new BN(account.account.id || 0).toNumber()
                );
              });
              
              return (
                <>
                  <Preblink
                    key={account.publicKey.toString()}
                    account={account.publicKey}
                    size={val?.length ? val?.length : 0}
                  />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className={"text-2xl"}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </>
  );
}
