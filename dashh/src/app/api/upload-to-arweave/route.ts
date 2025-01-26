import { NextRequest, NextResponse } from "next/server";
import { Uploader } from "@irys/upload";
import { Solana } from "@irys/upload-solana";

const getIrysUploader = async () => {
  const irysUploader = await Uploader(Solana).withWallet(
    process.env.PRIVATE_KEY
  );
  return irysUploader;
};

export async function POST(req: NextRequest) {
  const irysUploader = await getIrysUploader();
  
  try {
    const data  = await req.json(); 
    console.log("Received data: ", data);  // Debug: log the received data

    if (!data) {
      throw new Error("No data provided in request body");
    }

    const bufferData = Buffer.from(JSON.stringify(data), 'utf-8');
    const tags = [{ name: "Content-Type", value: "application/json" }];
    const receipt = await irysUploader.upload(bufferData, { tags }); 
    
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    
    return NextResponse.json({ txurl: `https://gateway.irys.xyz/${receipt.id}`, txid: receipt.id });
  } catch (e) {
    console.error("Error when uploading ", e);

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
