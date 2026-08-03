import "server-only";
import { GoogleAdsApi, Customer } from "google-ads-api";

let apiClient: GoogleAdsApi | null = null;

export function isGoogleAdsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_ADS_CLIENT_ID &&
      process.env.GOOGLE_ADS_CLIENT_SECRET &&
      process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN &&
      process.env.GOOGLE_ADS_CUSTOMER_ID
  );
}

// Throws if called before Google Ads credentials are set — callers should
// check isGoogleAdsConfigured() first and return a friendly response instead.
export function getGoogleAdsCustomer(): Customer {
  if (!isGoogleAdsConfigured()) {
    throw new Error(
      "Google Ads is not configured. Add GOOGLE_ADS_* vars to .env (see scripts/google-ads-auth.ts for the refresh token)."
    );
  }

  if (!apiClient) {
    apiClient = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    });
  }

  return apiClient.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || undefined,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });
}
