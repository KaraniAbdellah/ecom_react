import React, { useState } from 'react';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Search, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '/products' },
    { label: 'Features', href: '#Features' },
    { label: 'About', href: '#About' },
  ];



  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-gray-800">
            ArisanatStore
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-gray-600 hover:text-gray-900 transition duration-300"
              >
                {item.label}
              </a>
            ))}
            
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search 
                className="absolute left-2 top-3 text-gray-400" 
                size={18} 
              />
            </div>

            {/* Icons */}
            <div className="flex space-x-4">
              <button className="hover:bg-gray-100 p-2 rounded-full transition">
                <User size={24} className="text-gray-600" />
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-full transition relative">
                <ShoppingCart size={24} className="text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:bg-gray-200 block px-3 py-2 rounded-md"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <button className="mr-4">
                    <User size={24} className="text-gray-600" />
                  </button>
                  <button className="relative">
                    <ShoppingCart size={24} className="text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;