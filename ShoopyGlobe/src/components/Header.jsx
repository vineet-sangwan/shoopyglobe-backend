import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../Redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items || []); // Default to empty array
  const user = useSelector((state) => state.auth.username); // Access user state

  // Calculate the total quantity of items in the cart
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0; // Fallback to 0 if cartItems is not an array

  const [isOpen, setIsOpen] = useState(false);

  // Logout handler
  const handleLogout = () => {
    try {
      dispatch(logoutSuccess()); // Dispatch the logout action
      console.log("logout success");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error); // Log any potential errors
    }
  };

  return (
    <nav className="bg-gradient-to-r from-red-500 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide">ShoopyGlobe</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* User Authentication & Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart">
            <button className="relative flex items-center justify-center focus:outline-none hover:text-yellow-300 transition duration-300">
              <BsCart3 size={28} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* User Authentication Links */}
          {user ? (
            // If user is logged in, show username and logout button
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Hello, {user}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in, show Login and Register links only on larger screens
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-500 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose
                  size={30}
                  className="hover:text-yellow-300 transition duration-300"
                />
              ) : (
                <AiOutlineMenu
                  size={30}
                  className="hover:text-yellow-300 transition duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-3 bg-purple-700 p-4 rounded-lg shadow-md">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>

          {/* Authentication Links in Mobile Menu */}
          {user ? (
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">Hello, {user}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-500 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
