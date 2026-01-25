"use client";

import { useState, useEffect } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/car-categories");
      const data = await response.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cars");
      const data = await response.json();
      if (data.cars) {
        setCars(data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = selectedCategory === "all"
    ? cars
    : cars.filter((car: any) => car.category_name === selectedCategory);

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-16 px-4 md:px-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading cars...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            Available Simulator Cars
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the thrill of driving our premium racing cars
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Cars
          </button>
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category.name
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car: any) => (
              <div
                key={car.id}
                className="group cursor-pointer"
              >
                {/* Car Image Section */}
                <div className="w-full h-64 flex items-center justify-center relative overflow-hidden rounded-xl">
                  {car.image_url ? (
                    <img
                      src={`http://localhost:5000${car.image_url}`}
                      alt={car.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-xl mix-blend-lighten"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                      🏎️
                    </div>
                  )}
                  {car.category_name && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {car.category_name}
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <div className="mt-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{car.name}</h3>
                  <p className="text-red-500 font-semibold text-sm">{car.model}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {selectedCategory === "all" 
                ? "No cars available at the moment." 
                : `No cars available in ${selectedCategory} category.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
