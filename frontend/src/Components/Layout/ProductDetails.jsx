import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import axios from "axios";
import { ArrowRight } from "lucide-react";


const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [SameProducts, setSameProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:5000/product/GetById/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setCategory(data.category);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product data: " + err);
        setLoading(false);
      }
    }
  
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (!category) return;
    
    async function GetSameProducts() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/product/GetAllProduct/${category}`
        );
        const SameProductFiltred = res.data.filter(
          (product) => product._id !== productId
        );
        setSameProducts(SameProductFiltred);
      } catch (err) {
        console.error("Error fetching same products:", err);
      }
    }
  
    GetSameProducts();
  }, [category]); 

  const NavigateToAnotherProduct = (e, item) => {
    console.log(item);
    navigate(`/details/${item._id}`);
    localStorage.setItem("PrevProductId", productId);
  }
  // const GoPrevProduct = () => {
  //   const PrevProduct = localStorage.getItem("PrevProductId");
  //   if (PrevProduct) {
  //     navigate(`/details/${PrevProduct}`);
  //   } 
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <p className="text-red-500 text-xl">{error}</p>
        <button
        // onClick={() => GoPrevProduct()}
          className="mt-4 flex items-center gap-2 text-orange-500"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-6xl mx-auto">
        <button
          className="flex hover:bg-gray-200 p-2 bg-gray-100 rounded-full items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} />
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-4 flex justify-center items-center bg-gray-50">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full max-w-md rounded-md object-contain h-64 md:h-96"
                />
              ) : (
                <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center rounded-md">
                  <p className="text-gray-400">No image available</p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.title || "Product Name"}
                </h1>
                <div className="flex items-center gap-1 bg-orange-100 text-orange-500 px-2 py-1 rounded">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>

              <div className="mt-2 flex items-center">
                <p className="text-3xl font-bold text-orange-500">
                  ${product.price || "0.00"}
                </p>
                {product.oldPrice && (
                  <p className="ml-2 text-gray-400 line-through">
                    ${product.oldPrice}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Description
                </h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {product.description || "No description available"}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Availability
                </h2>
                <p className="mt-2 text-gray-600">
                  {product.quantity > 0
                    ? `In Stock (${product.quantity} available)`
                    : "Out of Stock"}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/cards">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </Link>
                <Link to="/cards">
                  <button className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 px-6 rounded-lg transition-colors">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder for similar products */}
            {SameProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative text-end overflow-hidden">
                  <button onClick={(e) => NavigateToAnotherProduct(e, item)} className="bg-white z-20 hover:bg-gray-200 absolute top-0 right-0 p-2 rounded-full m-2 shadow-md transition">
                    <ArrowRight size={20} className="text-orange-600" />
                  </button>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 truncate">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-orange-500 font-bold">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
