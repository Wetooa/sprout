import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const interFont = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sprout",
  description: "Agricultural Empowerment Through Remote Sensing Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} antialiased min-w-screen min-h-screen h-screen w-screen text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
