// import "./globals.css";
import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import React from "react";
import { Providers } from './providers'

// const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "To do list with PWA",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};
 
export const viewport: Viewport = {
  themeColor: "#FFFFFF"
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}