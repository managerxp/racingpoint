"use client";

import { useState } from "react";

export default function FoodMenu() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const menuItems = [
    {
      id: 1,
      name: "Biryani",
      slug: "biryani",
      description: "Aromatic basmati rice with fragrant spices",
      price: "$12.99",
      emoji: "🍚",
      category: "Main Course"
    },
    {
      id: 2,
      name: "Popcorn",
      slug: "popcorn",
      description: "Crispy buttered popcorn - Perfect snack",
      price: "$4.99",
      emoji: "🍿",
      category: "Snacks"
    },
    {
      id: 3,
      name: "Spring Rolls",
      slug: "spring-rolls",
      description: "Crispy rolls with vegetables and sauce",
      price: "$5.99",
      emoji: "🌯",
      category: "Appetizers"
    },
    {
      id: 4,
      name: "Water Bottle",
      slug: "water-bottle",
      description: "Fresh chilled water - 500ml",
      price: "$1.99",
      emoji: "💧",
      category: "Beverages"
    },
    {
      id: 5,
      name: "Cheese Burger",
      slug: "cheese-burger",
      description: "Juicy burger with melted cheese",
      price: "$8.99",
      emoji: "🍔",
      category: "Main Course"
    },
    {
      id: 6,
      name: "Pizza Slice",
      slug: "pizza-slice",
      description: "Cheesy pizza with toppings",
      price: "$6.99",
      emoji: "🍕",
      category: "Main Course"
    },
    {
      id: 7,
      name: "Iced Tea",
      slug: "iced-tea",
      description: "Refreshing cold iced tea",
      price: "$3.49",
      emoji: "🧋",
      category: "Beverages"
    },
    {
      id: 8,
      name: "Fries",
      slug: "fries",
      description: "Golden crispy french fries",
      price: "$3.99",
      emoji: "🍟",
      category: "Sides"
    },
    {
      id: 9,
      name: "Chocolate Shake",
      slug: "chocolate-shake",
      description: "Creamy chocolate milkshake",
      price: "$4.99",
      emoji: "🥤",
      category: "Beverages"
    },
  ];

  const categories = ["All", "Main Course", "Snacks", "Appetizers", "Sides", "Beverages"];

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            Food Menu
          </h2>
          <p className="text-gray-400 text-lg">
            Delicious food available at our racing café
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition font-semibold ${
                selectedCategory === category
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-red-600 text-white hover:bg-red-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={`/foodmenu/${item.slug}`}
              className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden hover:border-red-600 transition group shadow-lg hover:shadow-xl hover:shadow-red-600/20 cursor-pointer"
            >
              {/* Image Container */}
              <div className="w-full h-48 bg-gradient-to-br from-red-900/20 to-black flex items-center justify-center relative overflow-hidden">
                <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">{item.price}</span>
                  <span className="text-gray-400 text-sm group-hover:text-red-600 transition">
                    View Details →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
  
