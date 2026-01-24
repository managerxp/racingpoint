import Navbar from "@/components/Navbar";
import Cars from "@/components/Cars";

export default function CarsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <Cars />
      </div>
    </>
  );
}
