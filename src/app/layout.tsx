import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title,
  description: site.description,
  authors: [{ name: site.name, url: site.links.github }],
  openGraph: {
    type: "profile",
    title,
    description: site.description,
    siteName: site.name,
    firstName: "Shubh",
    lastName: "Sahu",
    images: [{ url: site.shareImage, width: site.photo.width, height: site.photo.height, alt: `Portrait of ${site.name}` }],
  },
  twitter: { card: "summary", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable} ${plexMono.variable}`}>
      <body className="relative">
        <div aria-hidden className="bp-grid" />
        <div aria-hidden className="bp-haze" />
        {children}
      </body>
    </html>
  );
}
