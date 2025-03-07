import React, { useState } from 'react';

function Adminpageadd() {
  const [selectedCategory, setSelectedCategory] = useState("jeans");

  const categories = [
    { id: "Tagine", label: "Tagine" },
    { id: "Sac cuir", label: "Sac cuir" },
    { id: "Tapis", label: "Tapis" },
    { id: "Centimes", label: "Centimes" },
    { id: "Caftan", label: "Caftan" },
    { id: "Others", label: "Others" },
  ];

  return (
    <div className="container mx-auto px-6 py-12 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Add Product
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (DH)</label>
              <input
                type="number"
                name="price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                step="10"
                placeholder="Enter Price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quantity"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold  mb-3">Select a Category</h2>
            <form className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700">{category.label}</span>
                </label>
              ))}
            </form>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 text-xl rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpageadd;
