import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const DiscountedProducts = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setDiscountedProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart!");
      return;
    }

    if (!token) {
      alert("No token found! Please log in again.");
      return;
    }

    // Ensure product ID is a string (MongoDB expects an ObjectId, which is a string)
    const productId = product._id; // Convert the product ID to a string

    dispatch(addToCart({ userId, productId, quantity: 1 }));
    alert(`${product.title} added to cart with quantity 1!`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4 ml-5 text-start font-extralight border border-white bg-black rounded-lg text-white drop-shadow-xl w-fit p-4">
        Special Discount
      </h2>
      <div className="hidden lg:block">
        <Slider {...sliderSettings}>
          {discountedProducts.map((product) => (
            <div key={product.id} className="p-4">
              <div className="flex flex-col h-full min-h-[200px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0 h-36 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-700 mt-1">
                    ${product.price}
                  </p>
                  <div className="mt-auto flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3 py-2 rounded-lg w-full transition ease-in-out duration-300 ${
                        isAuthenticated
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                      disabled={!isAuthenticated}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
        {discountedProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-contain rounded-md mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm font-bold text-gray-700 mt-1">
              ${product.price}
            </p>
            <div className="mt-2 flex flex-col space-y-2">
              <button
                onClick={() => handleAddToCart(product)}
                className={`px-2 py-1 rounded-lg w-full transition ease-in-out duration-300 ${
                  isAuthenticated
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                disabled={!isAuthenticated}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountedProducts;
