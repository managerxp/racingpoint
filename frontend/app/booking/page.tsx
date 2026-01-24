import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-black">
        <BookingForm />
      </div>
    </>
  );
}
