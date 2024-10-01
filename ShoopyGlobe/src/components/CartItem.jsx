import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/cartSlice"; // Import actions from cartSlice

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Handle removing item from cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  // Handle increasing the quantity of the item
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(item.id));
  };

  // Handle decreasing the quantity of the item
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        {/* Product Thumbnail */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">Price: ${item.price}</p>
        </div>
      </div>

      {/* Quantity controls and total price */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {/* Decrease Quantity Button */}
          <button
            onClick={handleDecreaseQuantity}
            className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
          >
            -
          </button>
          {/* Display Quantity */}
          <span className="mx-2">{item.quantity}</span>
          {/* Increase Quantity Button */}
          <button
            onClick={handleIncreaseQuantity}
            className="px-2 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
          >
            +
          </button>
        </div>

        {/* Display Total Price */}
        <p className="font-semibold">${item.price * item.quantity}</p>

        {/* Remove Button */}
        <button
          onClick={handleRemoveFromCart}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// PropTypes for type-checking the item prop
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
