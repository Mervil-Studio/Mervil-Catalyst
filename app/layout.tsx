import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSST — Colorado Springs School of Technology",
  description:
    "An Innovation Zone school where Innovators become Founders. Cybersecurity, AI, and Aerospace at the intersection of the NCC, XI Accelerator, and Space ISAC.",
  keywords: [
    "CSST",
    "Colorado Springs School of Technology",
    "cybersecurity",
    "innovation",
    "D11",
    "Space ISAC",
    "NCC",
  ],
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "CSST — Colorado Springs School of Technology",
    description: "Where Innovators Become Founders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#E8E8F0]">
        {children}
      </body>
    </html>
  );
}
