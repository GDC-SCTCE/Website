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
  title: "Game Development Club SCTCE",
  description: "Initialize your game dev protocol. Track quests, build games, and climb the leaderboard at the GDSC SCT (GDG on Campus SCTCE) Game Dev Club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
