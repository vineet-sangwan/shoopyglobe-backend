import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://via.placeholder.com/500x300"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-lg mb-4">
              At ShoopyGlobe, we are committed to bringing you the latest and
              greatest in electronics, fashion, and more. Our mission is to
              provide a seamless shopping experience with exceptional customer
              service and the best deals on the market.
            </p>
            <p className="text-lg">
              Our dedicated team works around the clock to curate the best
              products and ensure your satisfaction. Thank you for choosing us
              as your go-to shopping destination. We look forward to serving
              you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
