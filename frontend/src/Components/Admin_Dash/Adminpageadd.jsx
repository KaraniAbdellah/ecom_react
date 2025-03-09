import React, { useState, useEffect } from "react";
import AdminpageDisplay from "./AdminpageDisplay";
import axios from "axios";

function Adminpageadd() {
  const [selectedCategory, setSelectedCategory] = useState("jeans");
  const [products, setProducts] = useState([]);
  const [Base64Data, setBase64Data] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

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

  // Listen to Image
  useEffect(() => { 
    const image_input = document.querySelector(".image");
    image_input.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const base64 = await convertToBase64(file);
          setBase64Data(base64);
        } catch (error) {
          console.error("Error converting to Base64:", error);
        }
      }
    });
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
    const title = titleInputRef.current;
    const description = descriptionInputRef.current;
    const price = priceInputRef.current;
    const quantity = quantityInputRef.current;

    const productData = {
      title: title.value,
      description: description.value,
      price: price.value,
      quantity: quantity.value,
      image: Base64Data,
      category: selectedCategory,
    };

    if (isEditing) {
      // Update existing product
      setProducts(products.map(prod => 
        prod._id === editProductId ? { ...productData, _id: editProductId } : prod
      ));
      resetForm();
    } else {
      // Add new product
      axios.post("http://127.0.0.1:5000/product/AddProduct", productData).then((res) => {
        
      });
      
      setProducts([...products, newProduct]);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    if (titleInputRef.current) titleInputRef.current.value = "";
    if (descriptionInputRef.current) descriptionInputRef.current.value = "";
    if (priceInputRef.current) priceInputRef.current.value = "";
    if (quantityInputRef.current) quantityInputRef.current.value = "";
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

      <AdminpageDisplay 
        products={products} 
        setProducts={setProducts} 
        onUpdate={handleUpdateRequest}
      />
    </div>
  );
}

export default Adminpageadd;