import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <Gallery />
      </div>
    </>
  );
}
