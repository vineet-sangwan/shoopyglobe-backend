import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Ensure you import useSelector if you're using it
import { addToCart } from "../Redux/cartSlice";

const MensClothings = () => {
  const [mensClothes, setMensClothes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming you have a way to get authentication state and userId
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Example of getting authentication state
  const token = useSelector((state) => state.auth.token); // Example of getting the token
  const userId = useSelector((state) => state.auth.userId); // Example of getting the user ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setMensClothes(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally set an error state here to display in UI
      }
    };

    fetchProducts();
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

    const productId = product._id; // Ensure this is the correct property from your product data
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
      <h2 className="text-2xl mb-4 ml-5 mx-auto text-center font-extralight border border-white bg-black rounded-lg text-white drop-shadow-xl p-4">
        Summer Special Mens Clothing Discounted
      </h2>
      <div className="hidden lg:block">
        <Slider {...sliderSettings}>
          {mensClothes.map((product) => (
            <div key={product._id} className="p-4">
              {" "}
              {/* Ensure the key is unique */}
              <div className="flex flex-col h-full min-h-[300px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0 h-48 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
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
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500 transition ease-in-out duration-300"
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
        {mensClothes.map((product) => (
          <div
            key={product._id} // Ensure the key is unique
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-32 object-cover rounded-md mb-2"
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
                className="px-2 py-1 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500 transition ease-in-out duration-300"
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

export default MensClothings;
