import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gdcsctce.vercel.app"),
  title: "Game Development Club SCTCE",
  description: "Initialize your game dev protocol. Track quests, build games, and climb the leaderboard at the GDC SCT (GDC on Campus SCTCE) Game Dev Club.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Game Development Club SCTCE",
    description: "Initialize your game dev protocol. Track quests, build games, and climb the leaderboard at the GDC SCT (GDC on Campus SCTCE) Game Dev Club.",
    siteName: "Game Development Club SCTCE",
    url: "https://gdcsctce.vercel.app",
    type: "website",
  },
  verification: {
    google: "M3iBMTw9_v9WbsLr7ORUnTGhjjDLb2gdnTYE4-V9IP8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Game Development Club SCTCE",
    "alternateName": "GDC SCTCE",
    "url": "https://gdcsctce.vercel.app",
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className="min-h-full bg-black text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
