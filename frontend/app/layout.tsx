import "./globals.css";
import Footer from "@/components/Footer";
import { Orbitron } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Racing Simulator Experience",
  description: "High performance racing simulator gaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} bg-black text-white`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
