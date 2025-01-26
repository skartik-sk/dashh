import {useDashhProgramAccount,useDashhProgram} from "@/components/dashh/dashh-data-access";
import Creator from "@/lib/models/creater";
import User from "@/lib/models/user";
import { BN, Program } from "@coral-xyz/anchor";
import {  ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Dashh } from "../../../../../anchor/target/types/dashh";
import IDL from "../../../../../anchor/target/idl/dashh.json";
import { DashhIDL, getDashhProgram } from "../../../../../anchor/src";
import { useQuery } from "@tanstack/react-query";
import { useAnchorProvider } from "@/components/solana/solana-provider";
const programId = '7qpRXNFY5PJQfwptK4BosJ5jCnVeEYRWATFu8BBDTVcr';
export  async function GET(request:Request ,params:{params:{id:string}  }){ 
    const url = new URL(request.url);
    const id = await params.params.id;
 console.log(id);

   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // const provider = useAnchorProvider();
    const programId = "7qpRXNFY5PJQfwptK4BosJ5jCnVeEYRWATFu8BBDTVcr";
    // const program = getDashhProgram(provider);
    const program: Program<Dashh> = new Program(IDL as Dashh, {connection});
   const value = await program.account.campaign.fetch(id);
    console.log('value',value);
    const id2 = value.id;
const creator = {
    icons: value?.description ,
    title : value?.title,
    description : value?.image,
     label : value?.lable,
};

    

  const payload:ActionGetResponse = {
    icon: creator.icons ? creator.icons : "https://solana.com/favicon.ico",
    title: creator.title ? creator.title : "Donate to Solana",
    description:creator.description ? creator.description : "Donate to the Solana Foundation to support the Solana ecosystem.",
    label:creator.label ? creator.label : "Donate",
    links: {
        actions :[
           
        //{
        //         type:"transaction",
        //         label:"Participate",
        //         href:`${url.href}?amount={amount}`,
        //         "parameters": [
        //   // {amount} input field
        //   {
        //     "name": "amount", // input field name
        //     "label": "SOL amount" // text input placeholder
        //   }
        // ],
        //     },
            { type:'external-link',
            label:'See Leaderboard',
            href:`${url.origin}/api/redirect/${id}`,
            },{
                type:"external-link",
                label:"Verify With Reclaim",
                href:`${url.origin}/api/reclaim/${id}`,
                
            }, {
                type:"transaction",
                label:"Participate",
                href:`${url.origin}/api/donate/${id2}?amount=0`,
            },
            
        ]
    }

   
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}
export const OPTIONS = GET;


export  async function POST(request:Request){
    const body: ActionPostRequest = await request.json();
    const url = new URL(request.url);
    const id =Number( url.pathname.split('/').pop() || 0);
    console.log(" id",id);
const amount  =  Number(url.searchParams.get("amount")) || 0;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// const provider = useAnchorProvider();
const programId = "7qpRXNFY5PJQfwptK4BosJ5jCnVeEYRWATFu8BBDTVcr";
// const program = getDashhProgram(provider);
const program: Program<Dashh> = new Program(IDL as Dashh, {connection});

let user;

try {
  user = new PublicKey(body.account);
} catch (error) {
  return new Response("Invalid account", { status: 400, headers: ACTIONS_CORS_HEADERS });
}

const instruction = await program.methods
  .createParticipent(new BN(id, 16), user)
  .accounts({
    signer: user,
  })
  .instruction();

const blockhash = await connection.getLatestBlockhash();

const transaction = new Transaction({
    feePayer: user,
    blockhash: blockhash.blockhash,
    lastValidBlockHeight: blockhash.lastValidBlockHeight,
  }).add(instruction);

const response = await createPostResponse({
  fields: {
    type: "transaction",
    transaction: transaction
  }
});

return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
        
}