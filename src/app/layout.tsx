import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tfa-lawrenceville.org"),
  title: {
    default: "The First Amendment | Lawrenceville School",
    template: "%s | The First Amendment",
  },
  description:
    "The First Amendment is a student publication of The Lawrenceville School focused on civic discourse, politics, economics, international affairs, and longform features.",
  openGraph: {
    siteName: "The First Amendment",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
