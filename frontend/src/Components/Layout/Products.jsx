import React, { useState } from 'react';
import {Link} from "react-router";


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

  const [products] = useState([
    {
      id: 1,
      name: 'KooK Moroccan Tagine',
      price: 249.99,
      rating: 4.5,
      category: 'Tagine',
      image: 'https://mda.gov.ma/wp-content/uploads/2020/07/Artisanat-du-Maroc-1-1024x538.jpg',
    },
    {
      id: 2,
      name: 'Babouche Belgha Cherbil',
      price: 599.99,
      rating: 4.7,
      category: 'Cherbil',
      image: 'https://latribunedemarrakech.com/wp-content/uploads/2019/02/artisanat-maroc.jpg',
    },
    {
      id: 3,
      name: 'Sac marocain',
      price: 79.99,
      rating: 4.3,
      category: 'sac cuir',
      image: 'https://laquotidienne.ma/uploads/actualites/602e39252e13d.jpg',
    },
    {
      id: 4,
      name: 'Tapis de chambre ',
      price: 129.99,
      rating: 4.6,
      category: 'Tapis',
      image: 'https://thumbs.dreamstime.com/b/colorful-carpets-street-marrakech-medina-morocco-detail-102503230.jpg?w=768',
    },
    {
      id: 5,
      name: 'centimes - Hassan II Pièce',
      price: 999.99,
      rating: 4.8,
      category: 'centimes',
      image: 'https://i.etsystatic.com/10624150/r/il/4c6c77/4242175675/il_1588xN.4242175675_d1ld.jpg',
    },
    {
      id: 6,
      name: 'Caftan Marocain',
      price: 89.99,
      rating: 4.2,
      category: 'caftan',
      image: 'https://www.h24info.ma/wp-content/uploads/2023/07/Caftan-Ntaa-unesco.jpg',
    },

    {
      id: 7,
      name: 'KooK Moroccan Tagine',
      price: 89.99,
      rating: 4.2,
      category: 'Tagine',
      image: 'https://www.infostourismemaroc.com/build/img/infos/porterie-artisanat-maroc-tourisme-maroc.jpg',
    },
    {
      id: 8,
      name: 'KooK Moroccan Tagine',
      price: 89.99,
      rating: 4.2,
      category: 'Tagine',
      image: 'https://static.medias24.com/content/uploads/2021/04/Exportation-du-tajine-marocain10.jpg?x40594',
    },
    {
      id: 9,
      name: 'Sac marocain',
      price: 79.99,
      rating: 4.3,
      category: 'sac cuir',
      image: 'https://as2.ftcdn.net/v2/jpg/00/92/25/39/1000_F_92253904_ozkxuYEfh2GEhtrG7DVvqCc3R4AelKaQ.jpg',
    },
    {
      id: 10,
      name: 'Tapis de chambre ',
      price: 129.99,
      rating: 4.6,
      category: 'Tapis',
      image: 'https://fer-et-pierre.com/3167-large_default/tapis-beni-ouarain-2.jpg',
    },
    {
      id: 11,
      name: 'centimes - Hassan II Pièce',
      price: 999.99,
      rating: 4.8,
      category: 'centimes',
      image: 'https://i.etsystatic.com/10624150/r/il/329984/4194515446/il_1588xN.4194515446_2ci1.jpg',
    },
    {
      id: 12,
      name: 'Sac marocain',
      price: 79.99,
      rating: 4.3,
      category: 'sac cuir',
      image: 'https://www.babouche-maroc.com/images/choukara_blanche.jpg',
    },
    {
      id: 13,
      name: 'Tapis de chambre ',
      price: 129.99,
      rating: 4.6,
      category: 'Tapis',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtaiIVGzdpqUntxuRzWhglf7g19Mnh3Ccu0w&s',
    },
    {
      id: 14,
      name: 'Caftan Marocain',
      price: 89.99,
      rating: 4.2,
      category: 'caftan',
      image: 'https://i.pinimg.com/736x/4e/e1/be/4ee1bedda971b10504e55b1baf24d03c.jpg',
    },
    {
      id: 15,
      name: 'Caftan Marocain',
      price: 89.99,
      rating: 4.2,
      category: 'caftan',
      image: 'https://i.pinimg.com/736x/35/e5/08/35e508d3f16f3ff591ebf864f6450ea6.jpg',
    },
    {
      id: 16,
      name: 'Maroc - 5 francs 1934',
      price: 999.99,
      rating: 4.8,
      category: 'centimes',
      image: 'https://i.ebayimg.com/images/g/Ba0AAOSw6DBm8slk/s-l1600.webp',
    },
    
  ]);

  const categories = ['All', 'Tagine', 'sac cuir', 'Tapis', 'centimes', 'caftan'];

  const filteredProducts = products.filter((product) => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              key={product.id} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-500' 
                            : 'text-gray-300'
                        }`}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({product.rating})</span>
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
