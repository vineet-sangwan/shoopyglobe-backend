import React from "react";
import Slider from "./Slider";
import DiscountedProducts from "../Utils/DiscountedProducts";
import MensClothings from "../Utils/MensClothings";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-100 min-h-screen py-6 px-4">
      {/* Welcome Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to ShoopyGlobe
        </h1>
        <p className="text-lg text-gray-600">
          Explore the latest trends and find your favorite products!
        </p>
      </section>

      {/* Slider Section */}
      <section className="mb-12">
        <Slider />
      </section>

      {/* Popular Categories Section */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Electronics
            </h3>
            <p className="text-gray-600">
              Find the latest in tech and gadgets.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Clothes</h3>
            <p className="text-gray-600">
              Fashionable apparel for every style.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Accessories
            </h3>
            <p className="text-gray-600">
              Trendy accessories to complete your look.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Home & Garden
            </h3>
            <p className="text-gray-600">
              Everything you need for a cozy home.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className="text-center">
        <p className="text-2xl text-yellow-600">
          Sale Products Get Discount upto 80%Off
        </p>
        <DiscountedProducts />
      </section>
      {/* clothes section slider  */}
      <section className="text-center mt-5">
        <p className="text-2xl text-yellow-600">
          Mens Clothes Get Discount upto 60%Off On Latest trends
        </p>
        <MensClothings />
      </section>
    </div>
  );
};

export default Home;
