// import Cors from "cors";
// import { NextApiRequest, NextApiResponse } from "next";
// const cors = Cors({
//     origin: "*",
//     credentials: true,
//     methods: ["POST", "GET", "HEAD"],
// });

// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//     return new Promise<void>((resolve, reject) => {
//         fn(req, res, (result: any) => {
//             if (result instanceof Error) {
//                 return reject(result);
//             }
//             return resolve(result);
//         });
//     });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await runMiddleware(req, res, cors);
// console.log("helo");
//     // Other API logic
//     res.json({ foo: "bar" });
// }