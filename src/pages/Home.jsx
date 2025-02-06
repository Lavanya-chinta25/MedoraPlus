import React, { useState, useEffect } from "react";
import image1 from "../assets/about7.jpg";
import image2 from "../assets/about2.webp";
import image3 from "../assets/about5.png";
import image4 from "../assets/about4.jpg";
import { useNavigate } from 'react-router-dom';

const images = [image1, image2, image3, image4];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Medora/doctors'); // This will take you to the doctors page
  };
  const handleClick2 = () => {
    navigate('/Medora/bot'); // This will take you to the doctors page
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="relative w-full mt-10">
      {/* Image container */}
      <div className="relative w-full h-[440px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Buttons and Dots (Outside the Image Container) */}
      <div className="flex flex-col items-center mt-6">
        {/* Buttons  */}
        <div className="flex justify-center space-x-4">
          <button className="bg-[#185A79] text-white px-4 py-2 rounded hover:bg-[#153D55]"  onClick={handleClick2}>
            Chat with Us
          </button>
          <button className="bg-[#185a79] text-white px-4 py-2 rounded hover:bg-[#153D55]" onClick={handleClick}>
            View Doctors
          </button>
        </div>

        {/* Dots for navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-[#185a79]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;