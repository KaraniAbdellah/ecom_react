import React, { useEffect, useState } from 'react';
import {Link} from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Heart 
} from 'lucide-react';

const ProductsPage = ({ onBackToHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [IsActiveStar, setIsActiveStar] = useState(false);

  const categories = ['All', 'Tagine', 'sac cuir', 'Tapis', 'centimes', 'caftan'];



  const HandleStars = (e) => {
    const TargetEle = e.target.parentElement.parentElement; 
    // Get The ELement That Exit After TargetEle
    const IdTargetEle = (TargetEle.getAttribute("id"));
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


  }

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/product/GetAllProduct").then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
    });

    // Category

  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Back Button and Search */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to ="/">
          <button
            onClick={onBackToHome} 
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={24} />
          </button>
          </Link>
          
          
          
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          
          <button className="text-gray-600 hover:text-gray-900 transition">
            <Filter size={24} />
          </button>
        </div>
        
        {/* Category Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedCategory === category 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                    <Heart size={20} className="text-orange-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p id='1' onClick={(e) => HandleStars(e)} className='text-gray-400'>
                      <FontAwesomeIcon className={`cursor-pointer mr-1`} icon={faStar} />
                    </p>
                    <p id='2' onClick={(e) => HandleStars(e)} className='text-gray-400'>
                      <FontAwesomeIcon className={`cursor-pointer mr-1`} icon={faStar} />
                    </p>
                    <p id='3' onClick={(e) => HandleStars(e)} className='text-gray-400'>
                      <FontAwesomeIcon className={`cursor-pointer mr-1`} icon={faStar} />
                    </p>
                    <p id='4' onClick={(e) => HandleStars(e)} className='text-gray-400'>
                      <FontAwesomeIcon className={`cursor-pointer mr-1`} icon={faStar} />
                    </p>
                    <p id='5' onClick={(e) => HandleStars(e)} className='text-gray-400'>
                      <FontAwesomeIcon className={`cursor-pointer mr-1`} icon={faStar} />
                    </p>

                  </div>
                  <span className="text-xl font-bold text-orange-600">${product.price}</span>
                </div>
                <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center">
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
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













// import Navbar from './Navbar'
// import {Link} from "react-router";

// export default function Produtcs() {

//   return (
//     <div>
//       <input className='border' type="text" />
//       <button className='bg-orange-400 mr-2'>Search</button>
//       <Link to="/">
//         <button className='bg-orange-400'>BAck To Home</button>
//       </Link>
//     </div>
//   )
// }
