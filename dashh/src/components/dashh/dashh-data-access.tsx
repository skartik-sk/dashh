
import * as anchor from "@coral-xyz/anchor";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useAnchorProvider } from "../solana/solana-provider";
import { useTransactionToast } from "../ui/ui-layout";
import { getDashhProgram } from "../../../anchor/src";
import Error from "next/error";
import { v4 as uuidv4 } from "uuid";

interface CampaignArgs {
  id: number;
  title: string;
  image: string;
  description: string;
  lable: string;
  endtime: number;
  reward: number;
  owner: PublicKey;
}

interface participantargs {
  id: number;
  user: PublicKey;
  points: number;
}

export function useDashhProgram() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = "7qpRXNFY5PJQfwptK4BosJ5jCnVeEYRWATFu8BBDTVcr";
  const program = getDashhProgram(provider);

  const accounts = useQuery({
    queryKey: ["dashh", "all", "devnet"],
    queryFn: () => program.account.campaign.all(),
  });
  const paccounts = useQuery({
    queryKey: ["dashh-p", "all", "devnet"],
    queryFn: () => program.account.participent.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", "devnet"],
    queryFn: () => connection.getParsedAccountInfo(new PublicKey(programId)),
  });

  const createCampaign = useMutation<string, Error, CampaignArgs>({
    mutationKey: ["create-campaign", "create", "devnet"],
    mutationFn: async ({
      title,
      description,
      image,
      lable,
      endtime,
      reward,
    }) => {
      const id = new anchor.BN(uuidv4().split("-").join("").slice(0, 8), 16);
      const endtimeAsU64 = new anchor.BN(endtime);
      const rewardAsU64 = new anchor.BN(reward);

      try {
        // return 
        
     return await  program.methods
          .createCampaign(
            id,
            title,
            description,
            image,
            lable,
            endtimeAsU64,
            rewardAsU64,
          ).rpc()
          // {instructions = [a],
          // signer= "abcd"}

          

          // .rpc();
      } catch (error) {
        console.error("Error creating campaign:", error);
        throw error;
      }
    },
    onSuccess: (signature) => {

      transactionToast(signature);
      toast.success("Campaign created successfully");
      accounts.refetch();
    },
    onError: (error) => {
      toast.error("Failed to create campaign");
      console.error("Error:", error);
    },
  });

  const createParticipant = useMutation<string, Error, participantargs>({
    mutationKey: ["create-Participant", `create`, "devnet"],
    mutationFn: async ({ id, user }) => {
      return program.methods
        .createParticipent(new anchor.BN(id, 16), user)
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      toast.success("participated created successfully");
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Error creating campaign: ${error}`);
    },
  });
  const updateParticipant = useMutation<string, Error, participantargs>({
    mutationKey: ["update-Participant", `update`, "devnet"],
    mutationFn: async ({ id, user, points }) => {
      return program.methods
        .updatedParticipent(new anchor.BN(id), user, new anchor.BN(points))
        .rpc();
    },
    onSuccess: (Signature) => {
      transactionToast(Signature);
      toast.success("points update successfully");
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Error creating campaign: ${error}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createCampaign,
    createParticipant,
    updateParticipant,
    paccounts,
  };
}

// export function getParicipatedData({id}:{id:number}){
//   const { program } = useDashhProgram()
//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//   const provider = useAnchorProvider()
//   const account = useQuery({
//     queryKey: ['dashh', 'fetch', { cluster:'devnet', account: id }],
//     queryFn: () => program.account.participent.all(),
//   })
//   return {
//     account
//   }
// }

export function useDashhProgramAccount({ account }: { account: PublicKey }) {
  // const { cluster } = useCluster()
  const transactionToast = useTransactionToast();
  const { program, accounts } = useDashhProgram();

  const accountQuery = useQuery({
    queryKey: [
      "dashh",
      "fetch",
      { cluster: "devnet", account: account.toBase58() },
    ],
    queryFn: () => program.account.campaign.fetch(account),
  });

  const updateParticipant = useMutation<string, Error, participantargs>({
    mutationKey: ["update-Participant", `update`, "devnet"],
    mutationFn: async ({ id, user, points }) => {
      return program.methods
        .updatedParticipent(new anchor.BN(id), user, new anchor.BN(points))
        .rpc();
    },
    onSuccess: (Signature) => {
      transactionToast(Signature);
      toast.success("points update successfully");
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Error creating campaign: ${error}`);
    },
  });

  return {
    accountQuery,
    updateParticipant,
  };
}