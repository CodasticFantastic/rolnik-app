import { AdminSideBar } from "@/frontend/components/layout/sidebar/AdminSideBar";
import ReactQueryProvider from "@/frontend/components/providers/ReactQueryProvider";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/frontend/components/shadcn/sidebar";
import "@/frontend/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s - Rolnik.app",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <SidebarProvider>
            <AdminSideBar />
            <main className="p-2 w-full">
              <SidebarTrigger className="cursor-pointer" />
              {children}
            </main>
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
