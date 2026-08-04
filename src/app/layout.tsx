import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_CONVERSION_ID } from "@/lib/gtag";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Find Quartz Worktop Specialists Near You | Quartz Worktop Finder",
    template: "%s | Quartz Worktop Finder",
  },
  description:
    "Find verified quartz worktop specialists and stone masons across the UK. Directory connecting you directly with local fabricators for granite, marble and quartz worktops. No middlemen.",
  keywords: [
    "quartz worktops",
    "quartz worktop specialists",
    "kitchen worktops",
    "granite worktops",
    "marble worktops",
    "stone masons",
    "stone fabricators",
    "worktop installation",
    "UK stone masons",
  ],
  robots: "index, follow",
  authors: [{ name: "Quartz Worktop Finder" }],
  openGraph: {
    title: "Find Quartz Worktop Specialists Near You | Quartz Worktop Finder",
    description:
      "Free directory of verified quartz worktop specialists across the UK. Connect directly with kitchen worktop fabricators for granite, marble and quartz.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/kitchen.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Quartz Worktop Specialists Near You | Quartz Worktop Finder",
    description: "Free directory of verified quartz worktop specialists across the UK.",
    images: ["/kitchen.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="bg-page-bg text-slate antialiased">
        {GA_MEASUREMENT_ID && (
          <>
            {/* Consent Mode v2: analytics_storage defaults to denied, so no
                analytics cookie is set until CookieConsentBanner grants it
                (UK PECR/GDPR). */}
            <Script id="ga-consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                window.gtag = gtag;
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  wait_for_update: 500,
                });
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.gtag('js', new Date());
                window.gtag('config', '${GA_MEASUREMENT_ID}');
                ${GOOGLE_ADS_CONVERSION_ID ? `window.gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');` : ""}
              `}
            </Script>
          </>
        )}
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
