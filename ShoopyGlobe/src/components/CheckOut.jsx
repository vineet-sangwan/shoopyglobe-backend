import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cartItems);

  // Flatten the cart items if they are nested
  const flatCart = cart.flat();

  // Calculate total amount
  const total = flatCart.reduce(
    (acc, item) => acc + item.productDetails.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/orderConfirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        {flatCart.length === 0 ? (
          <p>
            Your cart is empty. Please add items to your cart before checking
            out.
          </p>
        ) : (
          flatCart.map((item) => (
            <div key={item.id} className="mb-4 border-b pb-2">
              <h4 className="text-xl font-semibold">
                {item.productDetails.title}
              </h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price per item: ${item.productDetails.price.toFixed(2)}</p>
              <p>
                Total: ${(item.productDetails.price * item.quantity).toFixed(2)}
              </p>
              {/* Display additional product details if available */}
              {item.productDetails.description && (
                <p>Description: {item.productDetails.description}</p>
              )}
              {item.productDetails.imageUrl && (
                <img
                  src={item.productDetails.imageUrl}
                  alt={item.productDetails.title}
                  className="mt-2 h-24 w-24 object-cover"
                />
              )}
            </div>
          ))
        )}
        <div className="flex justify-between font-semibold text-xl mt-6">
          <p>Total Amount:</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handleBuyNow}
          className="mt-8 py-2 px-4 bg-green-600 text-white rounded-lg w-full hover:bg-green-700 transition-all"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
