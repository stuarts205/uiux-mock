import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const appFont = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UIUX Mockup generator",
  description:
    "A tool to generate UIUX mockups from text descriptions using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${appFont.className} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
