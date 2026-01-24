import Navbar from "@/components/Navbar";
import Tracks from "@/components/Tracks";

export default function TracksPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <Tracks />
      </div>
    </>
  );
}
