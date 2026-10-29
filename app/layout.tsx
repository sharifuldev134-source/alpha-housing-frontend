import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "./components/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlphaHousing | Scam-Free Student Housing & Group Planning Abroad",
  description:
    "Find the right place to live abroad — together. AI-powered study abroad housing guidance, group budget pooling, neighborhood safety ratings, and verified apartments in Florence.",
  keywords: [
    "study abroad housing",
    "florence student apartments",
    "contratto transitorio",
    "roommate budget pooling",
    "student safety abroad",
    "study abroad parents",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0B0F17] min-h-screen flex flex-col transition-colors">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
