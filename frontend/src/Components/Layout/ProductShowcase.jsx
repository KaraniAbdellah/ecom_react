import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductShowcase = () => {
  const [products] = useState([
    {
      id: 1,
      name: ' joaillerie-bijouterie',
      price: 249.99,
      rating: 4.5,
      image: 'https://mda.gov.ma/wp-content/uploads/2020/07/Artisanat-du-Maroc-1-1024x538.jpg',
    },
    {
      id: 2,
      name: ' joaillerie-bijouterie',
      price: 599.99,
      rating: 4.7,
      image: 'https://latribunedemarrakech.com/wp-content/uploads/2019/02/artisanat-maroc.jpg',
    },
    {
      id: 3,
      name: ' joaillerie-bijouterie',
      price: 79.99,
      rating: 4.3,
      image: 'https://laquotidienne.ma/uploads/actualites/602e39252e13d.jpg',
    },
    {
      id: 4,
      name: ' joaillerie-bijouterie',
      price: 129.99,
      rating: 4.6,
      image: 'https://thumbs.dreamstime.com/b/colorful-carpets-street-marrakech-medina-morocco-detail-102503230.jpg?w=768',
    }
  ]);

  return (
    <section id='Features' className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Explore our latest and most popular tech  innovations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                  <span className="text-xl font-bold text-black">DH{product.price}</span>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-greenz-600 transition flex items-center justify-center">
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;