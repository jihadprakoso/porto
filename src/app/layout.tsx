import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jihad Prakoso | Full-stack Developer & Product Builder",
  description: "Jihad Prakoso is a full-stack developer building end-to-end scalable products, custom CMS architectures, and premium web experiences using Next.js, Prisma, and Tailwind CSS.",
  keywords: ["Jihad Prakoso", "Full-stack Developer", "Frontend Developer", "Next.js", "Prisma", "Product Builder", "React"],
  openGraph: {
    title: "Jihad Prakoso | Full-stack Developer",
    description: "Building scalable backend architectures and premium high-performance web interfaces.",
    type: "website",
    locale: "en_US",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { TransitionProvider } from "@/components/TransitionProvider";
import { getLocale } from "@/lib/i18n";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <TransitionProvider locale={locale}>
            {children}
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
