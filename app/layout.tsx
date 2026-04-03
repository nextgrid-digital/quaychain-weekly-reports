import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuayChain Weekly Logistics Infrastructure Intelligence",
  description: "Investor-focused weekly logistics infrastructure intelligence reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
