import React, { useState, useEffect } from "react";
import AdminpageDisplay from "./AdminpageDisplay";
import axios from "axios";
import {Link} from "react-router-dom";
import { 
  ArrowLeft, 
} from 'lucide-react';

function Adminpageadd() {
  const [selectedCategory, setSelectedCategory] = useState("jeans");
  const [products, setProducts] = useState([]);
  const [Base64Data, setBase64Data] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: "Tagine", label: "Tagine" },
    { id: "Sac cuir", label: "Sac cuir" },
    { id: "Tapis", label: "Tapis" },
    { id: "Centimes", label: "Centimes" },
    { id: "Caftan", label: "Caftan" },
    { id: "Others", label: "Others" },
  ];

  // Form input references
  const titleInputRef = React.useRef(null);
  const descriptionInputRef = React.useRef(null);
  const priceInputRef = React.useRef(null);
  const quantityInputRef = React.useRef(null);
  const imageInputRef = React.useRef(null);

  // Convert Image To Base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Fetch all products function
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/product/GetAllProduct");
      setProducts(response.data);
      console.log("Products loaded:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Listen to Image changes
  useEffect(() => {
    const handleImageChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const base64 = await convertToBase64(file);
          setBase64Data(base64);
        } catch (error) {
          console.error("Error converting to Base64:", error);
        }
      }
    };

    const imageInput = imageInputRef.current;
    if (imageInput) {
      imageInput.addEventListener("change", handleImageChange);
      return () => {
        imageInput.removeEventListener("change", handleImageChange);
      };
    }
  }, []);

  // Fill form with product data when editing
  const populateForm = (product) => {
    if (titleInputRef.current) titleInputRef.current.value = product.title;
    if (descriptionInputRef.current) descriptionInputRef.current.value = product.description;
    if (priceInputRef.current) priceInputRef.current.value = product.price;
    if (quantityInputRef.current) quantityInputRef.current.value = product.quantity;
    setSelectedCategory(product.category);
    setBase64Data(product.image);
    setIsEditing(true);
    setEditProductId(product._id);
  };

  // Handle form submission (add or update)
  const handleSubmitProduct = async () => {
    const title = titleInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const price = priceInputRef.current.value;
    const quantity = quantityInputRef.current.value;

    if (!title || !description || !price || !quantity) {
      alert("Please fill all required fields");
      return;
    }

    const productData = {
      title,
      description,
      price,
      quantity,
      image: Base64Data,
      category: selectedCategory,
    };

    try {
      if (isEditing) {
        // Update existing product
        await axios.put(`http://127.0.0.1:5000/product/updateProduct/${editProductId}`, productData);
        console.log("Product updated successfully");
        
        // Refresh the products list
        fetchProducts();
      } else {
        // Add new product
        const response = await axios.post("http://127.0.0.1:5000/product/addProduct", productData);
        console.log("Product added successfully:", response.data);
        
        // Refresh the products list
        fetchProducts();
      }
      
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  // Reset form after submission
  const resetForm = () => {
    if (titleInputRef.current) titleInputRef.current.value = "";
    if (descriptionInputRef.current) descriptionInputRef.current.value = "";
    if (priceInputRef.current) priceInputRef.current.value = "";
    if (quantityInputRef.current) quantityInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = ""; // Reset file input
    setSelectedCategory("jeans");
    setBase64Data("");
    setIsEditing(false);
    setEditProductId(null);
  };

  // Handle update request from ProductDisplay component
  const handleUpdateRequest = (product) => {
    populateForm(product);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                  <Link to ="/">
                  <button
                    className="text-gray-600 hover:text-orange-500 hover:bg-gray-200 rounded-full p-2 transition"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  </Link>
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          {isEditing ? "Update Product" : "Add Product"}
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              ref={titleInputRef}
              className="title w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              ref={descriptionInputRef}
              rows="4"
              className="description w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (DH)
              </label>
              <input
                type="number"
                name="price"
                ref={priceInputRef}
                className="price w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                step="10"
                placeholder="Enter Price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                ref={quantityInputRef}
                className="quantity w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quantity"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              ref={imageInputRef}
              className="image w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
            {Base64Data && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current image:</p>
                <img src={Base64Data} alt="Product preview" className="h-20 object-contain mt-1" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Select a Category</h2>
            <form className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="category w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700">{category.label}</span>
                </label>
              ))}
            </form>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSubmitProduct}
              type="submit"
              className={`${
                isEditing ? "bg-orange-500 hover:bg-orange-700" : "bg-orange-500 hover:bg-orange-700"
              } text-white py-2 px-4 text-xl rounded-lg font-semibold transition`}
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>

            {isEditing && (
              <button
                onClick={resetForm}
                type="button"
                className="bg-gray-500 text-white py-2 px-4 text-xl rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <AdminpageDisplay 
          products={products} 
          setProducts={setProducts} 
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  );
}

export default Adminpageadd;