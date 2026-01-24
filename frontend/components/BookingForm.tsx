"use client";

import { useState } from "react";

interface CalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    onDateSelect(dateString);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    return dateString === selectedDate;
  };

  // Generate year range (1900 to current year + 5)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 6 }, (_, i) => 1900 + i).reverse();

  return (
    <div className="bg-black border border-red-600 rounded-lg p-4 mt-2">
      {/* Year and Month Selectors */}
      <div className="flex gap-2 mb-4">
        <select
          value={currentMonth.getFullYear()}
          onChange={handleYearChange}
          className="flex-1 bg-gray-800 border border-gray-600 text-white rounded px-2 py-2 text-sm focus:border-red-600 focus:outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={currentMonth.getMonth()}
          onChange={handleMonthChange}
          className="flex-1 bg-gray-800 border border-gray-600 text-white rounded px-2 py-2 text-sm focus:border-red-600 focus:outline-none"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-gray-400 text-xs font-bold py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}
        {[...emptyDays, ...days].slice(firstDay).map((day, index) => {
          if (day === null) return <div key={`empty-end-${index}`} className="aspect-square"></div>;
          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded text-sm font-semibold transition ${
                isSelected(day)
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    date: "",
    slot: "30",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [showDateCalendar, setShowDateCalendar] = useState(false);

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    
    if (!form.name || !form.dob || !form.date || !form.slot) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          dob: "",
          date: "",
          slot: "30",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 2000);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting booking");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-red-600 rounded-full opacity-30"></div>
                <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-white text-lg font-semibold">Processing Booking...</p>
            </div>
          </div>
        )}

        {submitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-semibold">Booking Confirmed!</p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-600 p-8 rounded-xl shadow-2xl shadow-red-600/50">
          <h2 className="text-3xl font-bold mb-2 text-center text-white">Book Simulator</h2>
          <p className="text-gray-400 text-center mb-6">Experience ultimate racing</p>

          <form onSubmit={submitBooking} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <button
                type="button"
                onClick={() => setShowDobCalendar(!showDobCalendar)}
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 text-left hover:border-red-600 transition"
              >
                {form.dob ? new Date(form.dob).toLocaleDateString() : "Select Date of Birth"}
              </button>
              {showDobCalendar && (
                <Calendar
                  onDateSelect={(date) => {
                    setForm({ ...form, dob: date });
                    setShowDobCalendar(false);
                  }}
                  selectedDate={form.dob}
                />
              )}
            </div>

            {/* Booking Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Booking Date
              </label>
              <button
                type="button"
                onClick={() => setShowDateCalendar(!showDateCalendar)}
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 text-left hover:border-red-600 transition"
              >
                {form.date ? new Date(form.date).toLocaleDateString() : "Select Booking Date"}
              </button>
              {showDateCalendar && (
                <Calendar
                  onDateSelect={(date) => {
                    setForm({ ...form, date });
                    setShowDateCalendar(false);
                  }}
                  selectedDate={form.date}
                />
              )}
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session Duration
              </label>
              <select
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              >
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="90">90 Minutes</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              {isLoading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Secure booking • 100% safe & verified
          </p>
        </div>
      </div>
    </div>
  );
}
