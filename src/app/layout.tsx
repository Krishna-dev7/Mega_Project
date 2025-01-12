import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/customUi/headersUi/Header";
import Footer from "@/components/customUi/layouts/Footer";
import ThemeProvider from "@/components/customUi/providers/ThemeProvider";
import RootProvider from "@/components/customUi/providers/RootProvider";
import AccountProvider from "@/components/customUi/providers/AccountProvider";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/(users)/auth/[...nextauth]/option"
import SubRootProvider from "@/components/customUi/providers/SubRootProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} selection:text-black 
        overflow-x-hidden selection:bg-pink-300 text-xs dark:bg-[#121212] 
        bg-[#D6CABA] w-screen antialiased`}>

        <AccountProvider session={session}>
          <RootProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <SubRootProvider>
                <Toaster />
                <Header />
                {children}
                <Footer />
              </SubRootProvider>
            </ThemeProvider>
          </RootProvider>
        </AccountProvider>

      </body>
    </html>
  );
}
