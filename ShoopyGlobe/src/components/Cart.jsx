import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import empty from "../assets/empty.jpg";
import { MdOutlineShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userId);
  const cart = useSelector((state) => state.cart.cartItems) || [];

  // Flatten the cart array
  const flatCart = cart.flat();

  useEffect(() => {
    if (user) {
      dispatch(getCartItems(user));
    }
  }, [dispatch, user]);

  const total = flatCart.reduce((acc, item) => {
    if (item.productDetails && item.productDetails.price !== undefined) {
      return acc + item.productDetails.price * item.quantity;
    }
    return acc; // If productDetails or price is undefined, just return the accumulator
  }, 0);

  const handleIncrease = async (cartItemId) => {
    await dispatch(increaseQuantity(cartItemId));
    dispatch(getCartItems(user)); // Refetch cart items after updating
  };

  const handleDecrease = async (cartItemId) => {
    await dispatch(decreaseQuantity(cartItemId));
    dispatch(getCartItems(user)); // Refetch cart items after updating
  };

  const removeHandler = async (cartItemId) => {
    await dispatch(removeItemFromCart(cartItemId));
    dispatch(getCartItems(user));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>

      {flatCart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center flex-grow mt-12">
          <MdOutlineShoppingCart size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <img
            src={empty}
            alt="Empty cart"
            className="w-72 h-auto rounded-lg shadow-lg mb-6"
          />
          <p
            className="mt-6 text-blue-600 underline cursor-pointer hover:text-blue-800"
            onClick={() => navigate("/")}
          >
            Go back to shopping
          </p>
        </div>
      ) : (
        <div className="flex-grow">
          <ul>
            {flatCart.map((item) => (
              <li
                key={item.cartItemId}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productDetails.image} // Ensure this property exists in your data
                    alt={item.productDetails.productName}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.productDetails.productName}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      Price:{" "}
                      <span className="font-bold">
                        ${item.productDetails.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-2">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => removeHandler(item.cartItemId)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleIncrease(item.cartItemId)}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
                  >
                    Increase
                  </button>
                  <button
                    onClick={() => handleDecrease(item.cartItemId)}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
                    disabled={item.quantity === 1}
                  >
                    Decrease
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-bold text-gray-800">
              Total: <span className="text-green-600">${total.toFixed(2)}</span>
            </h2>
            <button
              onClick={handleCheckout}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
