import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/userContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DoseGuardian",
  description: "Welcome to DoseGuardian",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

   

      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
       
        </body>
    </html>
  );
}
