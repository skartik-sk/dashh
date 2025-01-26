import { ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createActionHeaders } from "@solana/actions";

const headers = createActionHeaders();
export async function GET(request: Request) {
    const url = new URL(request.url); // Replace with your fixed ID
  const redirectUrl = `${url.href}`;
  return Response.redirect(redirectUrl, 302);
}
export const OPTIONS = async () => Response.json(null, { headers });
export  async function POST(request:Request){
    const body:ActionPostRequest=await request.json();

    const payload:ActionPostResponse={
        type:"external-link",
        externalLink:`https://blinks.knowflow.study/creatordashboard?id=${body.account}`,
        message:"Redirected Creator Dashboard",
    }
     return Response.json(payload,{
        headers : ACTIONS_CORS_HEADERS,
      });


// const payloads: ActionPostResponse  = {
//     type: "external-link",
//     externalLink: "https://www.google.com",
//     message: "Transaction completed",
//     links: {
//         next: {
//             type:"post",
//             href: "https://blinks.knowflow.study/api/donate",
//         },
//     }
// };

    // // Redirect to a specific page after transaction creation
    // const redirectUrl = new URL('/some-page', url.origin);
    // redirectUrl.searchParams.set('transaction', payload.transaction);
    // redirectUrl.searchParams.set('message', payload.message);

    // return Response.redirect(redirectUrl.toString(), 302);
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
        
}
