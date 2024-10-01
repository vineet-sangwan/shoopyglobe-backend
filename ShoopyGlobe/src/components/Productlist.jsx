import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../Redux/productsSlice";
import { getProductById } from "../Redux/productsSlice";
import { addToCart } from "../Redux/cartSlice";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  // Get products data from Redux
  const products = useSelector((state) => state.products.productsdata);
  const token = useSelector((state) => state.auth.token);
  const message = useSelector((state) => state.products.message);
  const userId = useSelector((state) => state.auth.userId);
  const searchQuery = useSelector((state) => state.search || "");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchQuery) {
      dispatch(getProductById(searchQuery)); // Fetch products based on search query
    } else {
      dispatch(fetchAllProducts()); // Fetch all products if no search query
    }
  }, [dispatch, searchQuery]);

  // Add product to cart with quantity of 1 and authentication check
  const addItemsToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart!");
      return;
    }

    if (!token) {
      alert("No token found! Please log in again.");
      return;
    }

    // Always add with quantity 1
    dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
    alert(`${product.productName} added to cart with quantity 1!`);
  };

  // Filter products based on the search query
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto p-6">
      {/* Header and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-4 px-6 rounded-lg shadow-lg text-center lg:text-left">
          Product List
        </h2>
        <div className="mt-6 lg:mt-0 lg:w-1/2 lg:ml-6">
          <SearchBar />
        </div>
      </div>

      {/* Display Message */}
      {message && <p className="text-red-500">{message}</p>}

      {/* Product Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li
              key={product._id} // Use _id as the key
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.thumbnail}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {product.productName}
              </h3>
              <p className="text-xl font-bold text-green-600 mb-4">
                ${product.price}
              </p>

              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={() => addItemsToCart(product)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
