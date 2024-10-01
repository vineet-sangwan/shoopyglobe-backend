import React from "react";
import SliderSlick from "react-slick"; // Renaming the import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full max-w-7xl mt-8 mx-auto bg-black">
      <SliderSlick {...settings}>
        {" "}
        {/* Use the renamed import */}
        <div>
          <img
            src="https://rukminim1.flixcart.com/flap/700/300/image/b0e088ff138c58be.jpg?q=90"
            alt="Slide 1"
            className="w-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://rukminim1.flixcart.com/flap/700/300/image/aebf043a3a4f15d6.jpg?q=90"
            alt="Slide 2"
            className="w-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://rukminim1.flixcart.com/flap/700/300/image/c16af8723f41e655.jpeg?q=90"
            alt="Slide 3"
            className="w-full object-cover"
          />
        </div>
      </SliderSlick>
    </div>
  );
};

export default Slider;
