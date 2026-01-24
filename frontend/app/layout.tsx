import "./globals.css";
import Footer from "@/components/Footer";

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
      <body className="bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
