import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          L’artisanat marocain <br className="hidden md:block" />
            l’honneur à Beni Mellal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Salon provincial de l’Artisanat à Béni Mellal : valorisation du patrimoine et moteur du développement local
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-300 transition flex items-center justify-center">
              Shop Now
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center md:text-left">
            <div>
              <span className="text-3xl font-bold text-orange-500">500+</span>
              <p className="text-gray-600">Products</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-orange-500">250K+</span>
              <p className="text-gray-600">Customers</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-orange-500">99%</span>
              <p className="text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden md:flex justify-center">
          <img 
            src="https://i0.wp.com/rni.ma/wp-content/uploads/2021/11/news_1524158250.jpg?resize=800%2C420&ssl=1" 
            alt="Tech Products Showcase" 
            className="rounded-lg shadow-xl transform hover:scale-105 transition duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;