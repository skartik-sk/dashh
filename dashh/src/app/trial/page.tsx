"use client"; // Ensure this component runs on the client side
import { useEffect, useState } from "react";
import Query from "@irys/query";
const dataToSend = {
  uid: "sdsdsdsdsdas",
  likes: 745,
  keyword: true,
};
 async function retrieveFromIrys(transactionId: string) {
  const gatewayAddress = "https://gateway.irys.xyz/";
  const url = `${gatewayAddress}${transactionId}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to retrieve data for ID: ${transactionId}`);

    // Log headers and text response for debugging
    console.log("Response Headers:", response.headers);
    const textResponse = await response.json();
    console.log("Raw Response:", textResponse);

    return [textResponse];
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return null;
  }
}

const UploadText = () => {
  useEffect(() => {}, []);

  const [text, setText] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/upload-to-arweave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setTransactionId(data.txid);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="!z-20 mt-40">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here"
          required
        />
        <button className="bg-white" type="submit">
          Upload Text
        </button>
      </form>
      <div className="text-white">
        {transactionId && <p> {transactionId}</p>}
      </div>
      <button
        className="bg-white"
        onClick={() =>
          retrieveFromIrys("HBgqpDamV9JCZK8M4axMVp4gbQSm1p2Mr6tPh8m3ehwA")
        }
      >
        Click for data
      </button>
    </div>
  );
};

export default UploadText;
