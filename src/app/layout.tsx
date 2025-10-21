import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getContacts } from "@/lib/api/contact";
import { getSettings } from "@/lib/api/settings";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Dynamic metadata generator
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const siteName = settings?.siteName || "GoChinaMarketkk";
  const description =
    settings?.tagline ||
    "Your home for purchasing your appliances and furnitures.";

  return {
    title: siteName,
    description,
    openGraph: {
      title: siteName,
      description,
      siteName,
      images: settings?.logoUrl ? [settings.logoUrl] : [],
    },
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Fetch once for Zustand + global wrapper
  const [contacts, settings] = await Promise.all([getContacts(), getSettings()]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayoutWrapper contacts={contacts} settings={settings}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
