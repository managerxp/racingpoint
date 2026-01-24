import Navbar from "@/components/Navbar";
import FoodMenu from "@/components/FoodMenu";

export default function FoodMenuPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <FoodMenu />
      </div>
    </>
  );
}
