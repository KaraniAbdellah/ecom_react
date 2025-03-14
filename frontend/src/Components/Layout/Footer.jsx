import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "/products" },
    { label: "Features", href: "#Features" },
    { label: "About", href: "#About" },
  ];
  const handleSubmit = (e) => {
    const email = document.querySelector(".email");

    if (!email.value.trim()) {
      email.style.border = "2px solid red";
      return;
    }

    email.style.border = "";
    e.target.textContent = "Thanks";
    e.target.style.backgroundColor = "green";

    setTimeout(() => {
      e.target.textContent = "Send";
      e.target.style.backgroundColor = "rgb(249 115 22)";
      email.value = "";
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Crafting</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for cutting-edge L'artisanat and
              exceptional customer experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/KaraniAbdellah"
                className="text-gray-400 hover:text-white transition"
              >
                <Github size={24} />
              </a>
              <a
                href="https://x.com/karani66745"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/abdellah-karani-965928294/"
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <Link to="/cards">
                <li>
                  <button
                    className="mb-2 text-gray-400 hover:text-white transition"
                  >
                    Shipping Policy
                  </button>
                </li>
              </Link>
              <Link to="/cards">
                <li>
                  <button
                     className="mb-2 text-gray-400 hover:text-white transition"
                  >
                    Returns & Exchanges
                  </button>
                </li>
              </Link>
              <Link to="/cards">
                <li>
                  <button
                     className="mb-2 text-gray-400 hover:text-white transition"
                  >
                    FAQ
                  </button>
                </li>
              </Link>
              <Link to="/cards">
                <li>
                  <button
                     className="mb-2 text-gray-400 hover:text-white transition"
                  >
                    Support
                  </button>
                </li>
              </Link>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Feedback</h4>
            <p className="text-gray-400 mb-4">
            Share your feedback to help us improve!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Feedback..."
                className="w-full px-4 py-2 rounded-l-lg text-gray-900 email"
              />
              <button
                onClick={ (e) => handleSubmit(e)}
                className="bg-orange-600 hover:bg-orange-300 text-white px-4 py-2 rounded-r-lg transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Crafting. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
