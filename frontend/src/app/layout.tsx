import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Train Ticket",
  description: "You can buy train ticket from istanbul to ankara or from ankara to instanbul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
