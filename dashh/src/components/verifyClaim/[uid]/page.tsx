"use client";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";

const APP_ID = "0x896b97E0915ae00C61D8bb88b9f6A76d273cfE76";
const APP_SECRET =
  "0xa24f2911de618188e78d5981f62a3bba7497bc87b1e1789bac933ec614ca11a8";
const PROVIDER_ID = "d18dcace-d59b-4432-b77e-655b7248334d";

// const sampledata = {
//   identifier:
//     "0x293dab3d4be5211106b52f40ecdc16653bd921a4a4ff5cd0896bc53bbee87086",
//   claimData: {
//     provider: "http",
//     parameters:
//       '{"additionalClientOptions":{},"body":"","geoLocation":"","headers":{"user-agent":"Mozilla/5.0 (Linux; Android 12; 2201117PI Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.39 Mobile Safari/537.36"},"method":"GET","paramValues":{"URL_PARAMS_1":"Tg82Ez_kxVaJf7OPbUdbCg","URL_PARAMS_2":"%7B%22userId%22%3A%221543126510642536448%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D","URL_PARAMS_3":"%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D","favorite_count":"17","full_text":"Won the Reclaim Protocol track at Radar hackathon! ❤️\\\\nKudos to my team @SKartik_SK @praneshz_ @tusharpatidar23 @TheAshutoshM.\\\\n\\\\nCouldn\'t be more grateful to @solana @SuperteamIN @colosseum and @reclaimprotocol for such an opportunity \\\\uD83D\\\\uDE80✨","hashtags":"[]","user_mentions":"[{\\"id_str\\":\\"1586361012315250688\\",\\"name\\":\\"Singupalli Kartik\\",\\"screen_name\\":\\"SKartik_SK\\",\\"indices\\":[71,82]},{\\"id_str\\":\\"1396787419081592835\\",\\"name\\":\\"Pranesh Joshi\\",\\"screen_name\\":\\"praneshz_\\",\\"indices\\":[83,93]},{\\"id_str\\":\\"1444314554553364485\\",\\"name\\":\\"Tushar Patidar\\",\\"screen_name\\":\\"tusharpatidar23\\",\\"indices\\":[94,110]},{\\"id_str\\":\\"1618846191734910978\\",\\"name\\":\\"Ashutosh Mishra\\",\\"screen_name\\":\\"TheAshutoshM\\",\\"indices\\":[111,124]},{\\"id_str\\":\\"951329744804392960\\",\\"name\\":\\"Solana\\",\\"screen_name\\":\\"solana\\",\\"indices\\":[156,163]},{\\"id_str\\":\\"1508022250649550864\\",\\"name\\":\\"Superteam India\\",\\"screen_name\\":\\"SuperteamIN\\",\\"indices\\":[164,176]},{\\"id_str\\":\\"1626610682773794816\\",\\"name\\":\\"Colosseum\\",\\"screen_name\\":\\"colosseum\\",\\"indices\\":[177,187]},{\\"id_str\\":\\"1643929314768093185\\",\\"name\\":\\"Reclaim Protocol | Devcon \\\\uD83C\\\\uDDF9\\\\uD83C\\\\uDDED\\",\\"screen_name\\":\\"reclaimprotocol\\",\\"indices\\":[192,208]}]"},"responseMatches":[{"type":"contains","value":"\\"full_text\\":\\"{{full_text}}\\""},{"type":"contains","value":"\\"favorite_count\\":{{favorite_count}}"},{"type":"contains","value":"\\"user_mentions\\":{{user_mentions}}"},{"type":"contains","value":"\\"hashtags\\":{{hashtags}}"}],"responseRedactions":[{"jsonPath":"$.data.user.result.timeline_v2.timeline.instructions[1].entry.content.itemContent.tweet_results.result.legacy.full_text","regex":"\\"full_text\\":\\"(.*)\\"","xPath":""},{"jsonPath":"$.data.user.result.timeline_v2.timeline.instructions[1].entry.content.itemContent.tweet_results.result.legacy.favorite_count","regex":"\\"favorite_count\\":(.*)","xPath":""},{"jsonPath":"$.data.user.result.timeline_v2.timeline.instructions[1].entry.content.itemContent.tweet_results.result.legacy.entities.user_mentions","regex":"\\"user_mentions\\":(.*)","xPath":""},{"jsonPath":"$.data.user.result.timeline_v2.timeline.instructions[1].entry.content.itemContent.tweet_results.result.legacy.entities.hashtags","regex":"\\"hashtags\\":(.*)","xPath":""}],"url":"https://x.com/i/api/graphql/{{URL_PARAMS_1}}/UserTweets?variables={{URL_PARAMS_2}}&features={{URL_PARAMS_3}}&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D"}',
//     owner: "0xbcaa9b981ddb0bc631878e448ceb64e7f2d531d0",
//     timestampS: 1732116708,
//     context:
//       '{"contextAddress":"0x0","contextMessage":"","extractedParameters":{"URL_PARAMS_1":"Tg82Ez_kxVaJf7OPbUdbCg","URL_PARAMS_2":"%7B%22userId%22%3A%221543126510642536448%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D","URL_PARAMS_3":"%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D","favorite_count":"17","full_text":"Won the Reclaim Protocol track at Radar hackathon! ❤️\\\\nKudos to my team @SKartik_SK @praneshz_ @tusharpatidar23 @TheAshutoshM.\\\\n\\\\nCouldn\'t be more grateful to @solana @SuperteamIN @colosseum and @reclaimprotocol for such an opportunity \\\\uD83D\\\\uDE80✨","hashtags":"[]","user_mentions":"[{\\"id_str\\":\\"1586361012315250688\\",\\"name\\":\\"Singupalli Kartik\\",\\"screen_name\\":\\"SKartik_SK\\",\\"indices\\":[71,82]},{\\"id_str\\":\\"1396787419081592835\\",\\"name\\":\\"Pranesh Joshi\\",\\"screen_name\\":\\"praneshz_\\",\\"indices\\":[83,93]},{\\"id_str\\":\\"1444314554553364485\\",\\"name\\":\\"Tushar Patidar\\",\\"screen_name\\":\\"tusharpatidar23\\",\\"indices\\":[94,110]},{\\"id_str\\":\\"1618846191734910978\\",\\"name\\":\\"Ashutosh Mishra\\",\\"screen_name\\":\\"TheAshutoshM\\",\\"indices\\":[111,124]},{\\"id_str\\":\\"951329744804392960\\",\\"name\\":\\"Solana\\",\\"screen_name\\":\\"solana\\",\\"indices\\":[156,163]},{\\"id_str\\":\\"1508022250649550864\\",\\"name\\":\\"Superteam India\\",\\"screen_name\\":\\"SuperteamIN\\",\\"indices\\":[164,176]},{\\"id_str\\":\\"1626610682773794816\\",\\"name\\":\\"Colosseum\\",\\"screen_name\\":\\"colosseum\\",\\"indices\\":[177,187]},{\\"id_str\\":\\"1643929314768093185\\",\\"name\\":\\"Reclaim Protocol | Devcon \\\\uD83C\\\\uDDF9\\\\uD83C\\\\uDDED\\",\\"screen_name\\":\\"reclaimprotocol\\",\\"indices\\":[192,208]}]"},"providerHash":"0x33ddc18c613908cfcf63a898dc24b302c80111ca80fb28572c6f090f0391067f"}',
//     identifier:
//       "0x293dab3d4be5211106b52f40ecdc16653bd921a4a4ff5cd0896bc53bbee87086",
//     epoch: 1,
//   },
//   signatures: [
//     "0xdc93b5e915fcc848f855c30bb23146707f124b9bf44a24b5407cb2044cfff97e5ae745968577ff9da7357ecf058ef1f72f430ee1f98cd96fee6179b7baac33821b",
//   ],
//   witnesses: [
//     {
//       id: "0x244897572368eadf65bfbc5aec98d8e5443a9072",
//       url: "wss://witness.reclaimprotocol.org/ws",
//     },
//   ],
//   publicData: {},
// };

const Page = () => {
  const searchParams = useSearchParams();
  const title = searchParams?.get("title");

  // const uid = "aa";
  // const title = "hello";
  const [res, setRes] = useState("");
  const [qrState, setQrState] = useState<
    "none" | "loading" | "waiting" | "success"
  >("none");
  const [qrUrl, setQrUrl] = useState("");

  const verifyOnReclaim = async () => {
    setQrState("loading");
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );
    const requestUrl = await reclaimProofRequest.getRequestUrl();
    if (requestUrl) {
      setQrUrl(requestUrl);
      setQrState("waiting");
    }
    await reclaimProofRequest.startSession({
      onSuccess: (proofs) => {
        // console.log("Verification success", proofs);
        setQrState("success");
        setRes(proofs.claimData.context);
      },
      // Called if there's an error during verification
      onError: (error) => {
        console.error("Verification failed", error);
      },
    });
  };

  // const handleGenerateQr = () => {
  //   setQrState("loading");
  //   setTimeout(() => {
  //     setQrUrl("https://example.com/qr-code"); // Replace with dynamic QR URL
  //     setQrState("success");
  //   }, 2000); // Simulate loading time
  // };

  return (
    <div
      style={{ textAlign: "center", padding: "20px" }}
      className="mt-40 text-white "
    >
      <h1 className="text-xl font-bold capitalize">
        {title || "Verification Page"}
      </h1>

      <div
        className="flex flex-col justify-center items-center "
        style={{ margin: "20px 0" }}
      >
        <button
          onClick={verifyOnReclaim}
          className="w-80 mb-4 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          style={{
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",

            cursor: "pointer",
          }}
        >
          <Instagram className="mr-2 h-4 w-4" /> Verify using Instagram Story
        </button>

        <Button
          onClick={verifyOnReclaim}
          className="mb-4 w-80 flex items-center justify-center "
          style={{
            backgroundColor: "#1DA1F2", // Twitter brand color
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",

            cursor: "pointer",
          }}
        >
          {" "}
          <Twitter className="mr-2 relative bottom-[2px] h-4 w-4" /> Verify
          using Twitter Insights
        </Button>
      </div>

      <div
        className="text-white flex justify-center items-center"
        style={{ marginTop: "30px" }}
      >
        {qrState === "none" && <p>No QR code to display yet.</p>}
        {qrState === "loading" && <p>Loading QR code...</p>}
        {qrState === "success" && <p>Sucess! {res}</p>}
        {qrState === "waiting" && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={qrUrl} />
            </div>
            <div className="mt-2 flex gap-2 justify-center items-center">
              <React.Fragment>
                <svg width={0} height={0}>
                  <defs>
                    <linearGradient
                      id="my_gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FF999E" />
                      <stop offset="100%" stopColor="#AE56F1" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgress
                  thickness={5}
                  sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
                />
              </React.Fragment>
              <>
                <p>Waiting for Proofs!</p>
              </>
            </div>
            <p className="mt-2">
              Scan this QR or click
              <Link
                className="underline bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                href={qrUrl}
              >
                {" "}
                here
              </Link>{" "}
              to verify
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
