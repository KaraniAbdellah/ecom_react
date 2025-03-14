import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aos from "aos";

import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  ArrowUpToLine,
  ArrowUpToLineIcon,
  ArrowRight,
} from "lucide-react";

const ProductsPage = ({ onBackToHome }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = [
    "All",
    "Tagine",
    "Sac cuir",
    "Tapis",
    "Centimes",
    "Caftan",
    "Others",
  ];

  const HandleStars = (e) => {
    const TargetEle = e.target.parentElement.parentElement;
    console.log(TargetEle);
    // Get The ELement That Exit After TargetEle
    const IdTargetEle = TargetEle.getAttribute("id");
    if (IdTargetEle) {
      for (let i = 0; i < 5; i++) {
        const TargetEle = document.getElementById(`${i + 1}`);
        if (i < Number(IdTargetEle)) {
          TargetEle.classList.add("text-yellow-500");
          TargetEle.classList.remove("text-gray-400");
        } else {
          TargetEle.classList.remove("text-yellow-500");
          TargetEle.classList.add("text-gray-400");
        }
      }
    }
  };

  const HandleCategory = (category) => {
    setSelectedCategory(category);

    // Check If The User Login
    console.log(localStorage.getItem("userId"));
    if (localStorage.getItem("userId")) {
      // Get All Products Category
      if (category == "All") {
        axios.get(`http://127.0.0.1:5000/product/GetAllProduct`).then((res) => {
          setFilteredProducts(res.data);
          setProducts(res.data);
        });
      } else {
        axios
          .get(`http://127.0.0.1:5000/product/GetAllProduct/${category}`)
          .then((res) => {
            setFilteredProducts(res.data);
            setProducts(res.data);
          });
      }
    }
  };

  const HandleSearchProduct = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const NewFilteredData = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(NewFilteredData);
  };

  const handleLike = (e) => {
    e.target.classList.add("bg-orange-400");
    e.target.nextElementSibling.classList.remove("bg-orange-400");
  };
  const handleDisLike = (e) => {
    e.target.previousElementSibling.classList.remove("bg-orange-400");
    e.target.classList.add("bg-orange-400");
  };

  useEffect(() => {
    console.log(localStorage.getItem("userId"));
    if (localStorage.getItem("userId")) {
      axios.get("http://127.0.0.1:5000/product/GetAllProduct").then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      });
      Aos.init();
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Back Button and Search */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/">
            <button
              onClick={onBackToHome}
              className="text-gray-600 hover:text-orange-500 hover:bg-gray-200 p-2 rounded-full transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          </Link>

          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => HandleSearchProduct(e)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => HandleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 pt-36 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              data-aos="fade-up"
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Link to={`/details/${product._id}`}>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                      <ArrowRight size={20} className="text-orange-600" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p
                      onClick={(e) => handleLike(e)}
                      className="like cursor-pointer mr-3 bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center"
                    >
                      👍
                    </p>
                    <p
                      onClick={(e) => handleDisLike(e)}
                      className="dislike cursor-pointer mr-3 bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center"
                    >
                      👎
                    </p>
                  </div>
                  <span className="text-xl font-bold text-orange-600">
                    ${product.price}
                  </span>
                </div>
                <Link to="/cards">
                  <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center">
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Cart
                  </button>
                </Link>
                <Link to={`/details/${product._id}`}>
                  <button
                    className="w-full mt-2 bg-gray-50 text-orange-600 font-semibold py-2 rounded-lg
                  hover:bg-orange-600 hover:text-white transition flex items-center
                  justify-center"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No products found matching your search or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
