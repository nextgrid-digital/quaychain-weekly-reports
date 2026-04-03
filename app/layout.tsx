import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

const globalsCss = fs.readFileSync(
  path.join(process.cwd(), "app", "globals.css"),
  "utf8",
);

const dmFontsHref =
  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=DM+Serif+Display:ital@0;1&display=swap";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={dmFontsHref} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: globalsCss }} />
      </head>
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-brand">
              QuayChain Weekly
            </Link>
            <SiteNav />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
