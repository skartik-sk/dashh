import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createActionHeaders,
} from "@solana/actions";
import connectDB from "@/lib/dbconnect";
import Creator from "@/lib/models/creater";
// import User from "@/lib/models/user";

import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const headers = createActionHeaders();
export async function GET(request: Request) {
  const url = new URL(request.url);

  const payload: ActionGetResponse = {
    icon: "https://t3.ftcdn.net/jpg/07/46/54/88/360_F_746548833_Cw1ZK4jF4S6SEg4yXQ3aQwv9cfIpJxBR.jpg",
    title: "Generate Campaign",
    description:
      "You can add details inorder to genrate a blink for the campaign and at the end of the campaign the prize pool will be distributed to the top 3 with most reach in the campaign",
    label: "Blinks generator",
    links: {
      actions: [
        {
          type: "external-link",
          label: "View your campaigns",
          href: `${url.href}/campaigns`,
        },
        {
          type: "transaction",
          label: "Generate",
          href: `${url.href}?amount={amount}&title={title}&description={description}&icon={icon}&label={label}&end={end}`,
          parameters: [
            {
              name: "title",
              label: "Title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
            },
            {
              name: "icon",
              label: "Icon",
              type: "url",
              required: true,
            },
            {
              name: "label",
              label: "Label",
              type: "text",
              required: true,
            },
            {
              name: "end",
              label: "End Date",
              type: "date",
              required: true,
            },

            {
              name: "amount", // input field name
              label: "Prize Pool",
              type: "number", // input field type
              required: true, // text input placeholder
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

export const OPTIONS = async () => Response.json(null, { headers });
export async function POST(request: Request) {
  await connectDB();
  const body: ActionPostRequest = await request.json();
  const url = new URL(request.url);
  const amount = Number(url.searchParams.get("amount"));
  let sender;
  // let camurl;
  let payload: ActionPostResponse;
  try {
    sender = new PublicKey(body.account);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey("8vbaCLhg1SZmiGNZfFzV2DEJHenFtdgg7G2JtY5v74i1"),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const blockheight = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockheight.blockhash;
    transaction.lastValidBlockHeight = blockheight.lastValidBlockHeight;
    transaction.feePayer = sender;
    // transaction.sign(payer);
    const campaign = new Creator({
      title: url.searchParams.get("title"),
      description: url.searchParams.get("description"),
      icons: url.searchParams.get("icon"),
      label: url.searchParams.get("label"),
      end: url.searchParams.get("end"),
      amount: amount,
      users: [],
      solAdd: sender.toString(),
    });

    const data = await campaign.save();
    // camurl = campaign._id;
    if (data) {
      payload = {
        type: "transaction",
        transaction: transaction
          .serialize({ verifySignatures: false })
          .toString("base64"),
        message: `Campaign Created`,
      };
      // links: {
      //     next: {
      //         type:"post",
      //         href: `${url.origin}/api/redirect/${url.pathname.split("/")[3]}`,
      //     },
      // }
    } else {
      return Response.error();
    }

    // const newUser = new User({
    //     solAdd: sender.toString(),
    // post:  url.href.toString(),
    // isAwarded: false,

    //   });

    //   await newUser.save();
  } catch (e) {
    return Response.json(
      { error: e },
      { status: 400, headers: ACTIONS_CORS_HEADERS }
    );
  }

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
  // // Redirect to a specific page after transaction creation
  // const redirectUrl = new URL('/some-page', url.origin);
  // redirectUrl.searchParams.set('transaction', payload.transaction);
  // redirectUrl.searchParams.set('message', payload.message);

  // return Response.redirect(redirectUrl.toString(), 302);
  // return Response.json(payload, {
  //     headers: ACTIONS_CORS_HEADERS,
  // });
}
