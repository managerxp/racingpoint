"use client";

import { useState, useEffect } from "react";

export default function CarManagement() {
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  const [cars, setCars] = useState([]);
  const [showCarModal, setShowCarModal] = useState(false);
  const [carFormData, setCarFormData] = useState({
    category_id: "",
    name: "",
    model: "",
    image: null as File | null
  });
  const [editingCar, setEditingCar] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch categories
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

  // Fetch cars
  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cars");
      const data = await response.json();
      console.log("Full API response:", data); // Debug log
      
      if (data.cars) {
        // Log image URLs for debugging
        data.cars.forEach((car: any) => {
          console.log(`Car: ${car.name}, Image URL: ${car.image_url}`);
        });
        
        setCars(data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return null;
    
    // If URL is already absolute, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If URL starts with /, add the base URL
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    
    // Otherwise, assume it's a relative path and add base URL
    return `http://localhost:5000/${imageUrl}`;
  };

  // Category handlers
  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/car-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: categoryName })
      });

      if (response.ok) {
        setCategoryName("");
        setShowCategoryModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/car-categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: categoryName })
      });

      if (response.ok) {
        setCategoryName("");
        setEditingCategory(null);
        setShowCategoryModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/car-categories/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Car handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCarFormData({ ...carFormData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCar = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("category_id", carFormData.category_id);
      formData.append("name", carFormData.name);
      formData.append("model", carFormData.model);
      if (carFormData.image) {
        formData.append("image", carFormData.image);
      }

      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setCarFormData({ category_id: "", name: "", model: "", image: null });
        setImagePreview(null);
        setShowCarModal(false);
        fetchCars();
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("category_id", carFormData.category_id);
      formData.append("name", carFormData.name);
      formData.append("model", carFormData.model);
      if (carFormData.image) {
        formData.append("image", carFormData.image);
      }

      const response = await fetch(`http://localhost:5000/api/cars/${editingCar.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setCarFormData({ category_id: "", name: "", model: "", image: null });
        setImagePreview(null);
        setEditingCar(null);
        setShowCarModal(false);
        fetchCars();
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteCar = async (id: number) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchCars();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const openCategoryModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName("");
    }
    setShowCategoryModal(true);
  };

  const openCarModal = (car: any = null) => {
    if (car) {
      setEditingCar(car);
      setCarFormData({
        category_id: car.category_id || "",
        name: car.name,
        model: car.model,
        image: null
      });
      if (car.image_url) {
        setImagePreview(getImageUrl(car.image_url));
      } else {
        setImagePreview(null);
      }
    } else {
      setEditingCar(null);
      setCarFormData({ category_id: "", name: "", model: "", image: null });
      setImagePreview(null);
    }
    setShowCarModal(true);
  };

  return (
    <div>
      {/* Car Categories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Car Categories</h3>
          <button 
            onClick={() => openCategoryModal()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg"
          >
            + Add Category
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.length > 0 ? (
            categories.map((category: any) => (
              <div 
                key={category.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-4 hover:border-red-600/60 transition"
              >
                <h4 className="text-lg font-semibold mb-3">{category.name}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openCategoryModal(category)}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-2 rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-2 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No categories available. Add one to get started.
            </div>
          )}
        </div>
      </div>

      {/* Cars Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Cars</h3>
          <button 
            onClick={() => openCarModal()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg"
          >
            + Add Car
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car: any) => (
              <div 
                key={car.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden hover:border-red-600/60 transition"
              >
                <div className="h-48 bg-gray-800 overflow-hidden relative">
                  {car.image_url ? (
                    <img 
                      src={getImageUrl(car.image_url)} 
                      alt={car.name}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('Image loaded successfully:', getImageUrl(car.image_url))}
                      onError={(e) => {
                        console.error('Image load error for:', car.image_url);
                        console.error('Attempted URL:', getImageUrl(car.image_url));
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        // Show fallback content
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                              <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p class="text-sm">Failed to load image</p>
                              <p class="text-xs mt-1">${car.name}</p>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                      <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No image available</p>
                      <p className="text-xs mt-1">{car.name}</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    {car.category_name && (
                      <span className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {car.category_name}
                      </span>
                    )}
                    <h4 className="text-xl font-semibold">{car.name}</h4>
                    <p className="text-gray-400 text-sm">{car.model}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openCarModal(car)}
                      className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-4 py-2 rounded-lg text-sm transition font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCar(car.id)}
                      className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-sm transition font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No cars available. Add one to get started.
            </div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowCategoryModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="e.g., Sports Cars, SUVs"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition font-medium shadow-lg"
                >
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Modal */}
      {showCarModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto" onClick={() => setShowCarModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6 w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-6">
              {editingCar ? "Edit Car" : "Add New Car"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={carFormData.category_id}
                  onChange={(e) => setCarFormData({ ...carFormData, category_id: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Car Name</label>
                  <input
                    type="text"
                    value={carFormData.name}
                    onChange={(e) => setCarFormData({ ...carFormData, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                    placeholder="e.g., Ferrari"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Model</label>
                  <input
                    type="text"
                    value={carFormData.model}
                    onChange={(e) => setCarFormData({ ...carFormData, model: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                    placeholder="e.g., F8 Tributo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Car Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-red-600/50 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="carImageInput"
                  />
                  <label 
                    htmlFor="carImageInput"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {imagePreview ? (
                      <div className="relative w-full">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">Click to change image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400 text-sm">Click to upload car image</p>
                        <p className="text-gray-600 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCarModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCar ? handleUpdateCar : handleAddCar}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition font-medium shadow-lg"
                >
                  {editingCar ? "Update Car" : "Add Car"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}