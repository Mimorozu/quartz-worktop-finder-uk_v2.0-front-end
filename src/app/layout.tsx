import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kitchenworktopexperts.co.uk"),
  title: {
    default: "Find Stone Masons Near You | Kitchen Worktop Experts",
    template: "%s | Kitchen Worktop Experts",
  },
  description:
    "Find verified stone masons and kitchen worktop specialists across the UK. Free directory connecting you directly with local fabricators for granite, marble and quartz worktops. No middlemen.",
  keywords: [
    "stone masons",
    "kitchen worktops",
    "granite worktops",
    "quartz worktops",
    "marble worktops",
    "stone fabricators",
    "worktop installation",
    "UK stone masons",
    "kitchen worktop specialists",
  ],
  robots: "index, follow",
  authors: [{ name: "Kitchen Worktop Experts" }],
  openGraph: {
    title: "Find Stone Masons Near You | Kitchen Worktop Experts",
    description:
      "Free directory of verified stone masons across the UK. Connect directly with kitchen worktop specialists for granite, marble and quartz.",
    type: "website",
    url: "https://kitchenworktopexperts.co.uk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Stone Masons Near You | Kitchen Worktop Experts",
    description: "Free directory of verified stone masons across the UK.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-page-bg text-slate antialiased">{children}</body>
    </html>
  );
}
