import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <Contact />
      </div>
    </>
  );
}
