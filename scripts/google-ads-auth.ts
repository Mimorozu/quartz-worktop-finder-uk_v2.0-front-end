// One-time local helper to mint a Google Ads API refresh token. Run with
// GOOGLE_ADS_CLIENT_ID / GOOGLE_ADS_CLIENT_SECRET already in .env (from an
// OAuth 2.0 "Desktop app" client in Google Cloud Console):
//
//   npx tsx --env-file=.env scripts/google-ads-auth.ts
//
// Opens the Google consent screen, catches the redirect on localhost, and
// prints GOOGLE_ADS_REFRESH_TOKEN to paste into .env. Not wired into the app.
import { createServer } from "node:http";
import { OAuth2Client } from "google-auth-library";

const PORT = 8765;
const REDIRECT_URI = `http://localhost:${PORT}`;

async function main() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Set GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET in .env before running this."
    );
  }

  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: REDIRECT_URI,
  });

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/adwords"],
  });

  const refreshToken = await new Promise<string>((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url ?? "/", REDIRECT_URI);
        const code = url.searchParams.get("code");
        if (!code) {
          res.writeHead(400).end("Missing code param.");
          return;
        }

        const { tokens } = await oauth2Client.getToken(code);
        res.writeHead(200, { "Content-Type": "text/plain" }).end(
          "Authenticated. You can close this tab and return to the terminal."
        );
        server.close();

        if (!tokens.refresh_token) {
          reject(
            new Error(
              "No refresh token returned. Revoke prior access at https://myaccount.google.com/permissions and rerun."
            )
          );
          return;
        }
        resolve(tokens.refresh_token);
      } catch (err) {
        res.writeHead(500).end("Auth failed, see terminal.");
        server.close();
        reject(err);
      }
    });

    server.listen(PORT, () => {
      console.log("Open this URL and grant access:\n");
      console.log(authorizeUrl);
      console.log(`\nWaiting for redirect on ${REDIRECT_URI} ...`);
    });
  });

  console.log("\nGOOGLE_ADS_REFRESH_TOKEN=" + refreshToken);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
