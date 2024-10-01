import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-4">ShoopyGlobe</h2>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for electronics, fashion, and more.
              Discover great deals and stay ahead in style and technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-teal-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-teal-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-teal-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-teal-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-teal-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">1234 Market St, Suite 100</p>
            <p className="text-gray-400 mb-2">City, State, 12345</p>
            <p className="text-gray-400 mb-2">
              Email:{" "}
              <a
                href="mailto:info@shoopyglobe.com"
                className="hover:text-teal-400"
              >
                info@shoopyglobe.com
              </a>
            </p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-4">
          <p>&copy; 2024 ShoopyGlobe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
