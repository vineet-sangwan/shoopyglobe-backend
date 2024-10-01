import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../Redux/cartSlice"; // Adjust the import path accordingly

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clear cart items when the component is rendered
  React.useEffect(() => {
    dispatch(removeItemFromCart());
  }, [dispatch]);

  const handleGoBack = () => {
    navigate("/"); // Redirect to home or any other page after confirmation
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your order is on its way!
        </p>
        <button
          onClick={handleGoBack}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-teal-600 hover:to-green-500 transition-all duration-300"
        >
          Continue Shopping
        </button>
        <div className="flex justify-center">
          <div className="animate-pulse">
            <AiOutlineCheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
