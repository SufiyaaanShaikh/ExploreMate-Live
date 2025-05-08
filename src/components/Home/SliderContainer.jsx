import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const images = require.context("../../images", false, /\.(png|jpe?g|svg)$/);

const destinations = [
  { image: "manali.jpg", alt: "1", title: "Manali, Himachal" },
  { image: "laddak.jpg", alt: "2", title: "Ladakh, Kashmir" },
  { image: "ooty.jpg", alt: "3", title: "Ooty, Tamil Nadu" },
  { image: "darjeeling.jpg", alt: "4", title: "Darjeeling, West Bengal" },
  { image: "Andaman Nicobar.jpg", alt: "5", title: "Andaman Nicobar" },
  { image: "udaipur.jpg", alt: "6", title: "Udaipur, Rajasthan" },
  { image: "Coorg.jpg", alt: "7", title: "Coorg" },
  { image: "varanasi.jpg", alt: "8", title: "Varanasi, Uttar Pradesh" },
];

function SliderContainer() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        // settings: {
        //   slidesToShow: 3,
        //   slidesToScroll: 3,
        //   infinite: true,
        //   dots: true
        // }
      },
      {
        // breakpoint: 600,
        // settings: {
        //   slidesToShow: 2,
        //   slidesToScroll: 2,
        //   initialSlide: 2
        // }
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="group relative transition duration-300 ease-in-out slide"
          >
            {/* Image */}
            <img
              src={images(`./${destination.image}`)}
              alt={destination.alt}
              className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transform transition duration-500 ease-in-out"
            />

            <div className="absolute w-max bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-4  group-hover:opacity-100 group-hover:bottom-10 transition-all duration-500 ease-in-out opacity-0 text-center rounded">
              {/* Title */}
              <h2 className=" text-base font-bold text-white mb-2  opacity-0 group-hover:opacity-100 group-hover:bottom-16 transition-all duration-500 ease-in-out">
                {destination.title}
              </h2>

              {/* View More Button */}
              <Link
                to="/wiki"
                className="inline-block text-xs font-medium text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 opacity-0 group-hover:opacity-100 group-hover:bottom-8 transition-all duration-500 ease-in-out"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderContainer;
