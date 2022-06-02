import * as functions from "firebase-functions";
import fetch from "node-fetch";
import * as cors from "cors";

const corsHandler = cors({ origin: true });

export const getCdotData = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });

    corsHandler(request, response, async () => {
      const res = await fetch(
        // "https://data.cotrip.org/api/v1/incidents?apiKey=placeholderForAPIKey&limit=10"
        "https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ&limit=10"
      );

      const data = await res.json();

      return response.json({
        data,
      });
    });
  }
);
