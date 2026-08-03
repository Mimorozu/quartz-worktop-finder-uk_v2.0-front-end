"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import {
  createCampaign,
  setCampaignStatus,
  updateCampaignBudget,
} from "@/lib/google-ads-service";

function parseKeywords(raw: string): string[] {
  return raw
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function createCampaignAction(formData: FormData) {
  await verifySession();

  const name = String(formData.get("name") ?? "").trim();
  const dailyBudgetGbp = Number(formData.get("daily_budget"));
  const finalUrl = String(formData.get("final_url") ?? "").trim();
  const keywords = parseKeywords(String(formData.get("keywords") ?? ""));

  if (!name || !finalUrl || !dailyBudgetGbp || keywords.length === 0) {
    throw new Error("Missing required campaign fields.");
  }

  await createCampaign({ name, dailyBudgetGbp, finalUrl, keywords });
  revalidatePath("/admin/google-ads");
}

export async function setCampaignStatusAction(campaignId: string, status: "ENABLED" | "PAUSED") {
  await verifySession();
  await setCampaignStatus(campaignId, status);
  revalidatePath("/admin/google-ads");
}

export async function updateCampaignBudgetAction(formData: FormData) {
  await verifySession();

  const campaignId = String(formData.get("campaign_id") ?? "");
  const dailyBudgetGbp = Number(formData.get("daily_budget"));

  if (!campaignId || !dailyBudgetGbp) {
    throw new Error("Missing required budget fields.");
  }

  await updateCampaignBudget(campaignId, dailyBudgetGbp);
  revalidatePath("/admin/google-ads");
}
