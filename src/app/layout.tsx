import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jihad Prakoso | Frontend Developer & UI Designer",
  description: "Explore the portfolio of Jihad Prakoso, a frontend developer specializing in modern, scalable, and high-performance web applications using Next.js and Tailwind CSS.",
  keywords: ["Jihad Prakoso", "Frontend Developer", "Next.js", "React", "Portfolio", "Web Design"],
  openGraph: {
    title: "Jihad Prakoso | Frontend Developer",
    description: "Modern and scalable web experiences built with Next.js.",
    type: "website",
    locale: "en_US",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
