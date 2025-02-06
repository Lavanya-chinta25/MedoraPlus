import React from "react";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Medora/'); // This will take you to the doctors page
  };
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Wavy Background */}
      <div className="absolute inset-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800" // Increased the height from 700 to 900 for higher waves
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* First Wave */}
          <path
            fill="#86C7EB"  // Updated color with reduced opacity
            fillOpacity="0.5"
            d="M0,450L60,410C120,370,240,290,360,250C480,210,600,210,720,250C840,290,960,370,1080,380C1200,390,1320,350,1380,330L1440,310L1440,700L1380,700C1320,700,1200,700,1080,700C960,700,840,700,720,700C600,700,480,700,360,700C240,700,120,700,60,700L0,700Z"
          ></path>

          <path
            fill="#185a79"  // Updated color with reduced opacity
            fillOpacity="0.7"
            d="M0,350L80,310C160,270,320,190,480,150C640,110,800,150,960,170C1120,190,1280,210,1360,220L1440,230L1440,700L1360,700C1280,700,1120,700,960,700C800,700,640,700,480,700C320,700,160,700,80,700L0,700Z"
          ></path>
          <path
            fill="#153D55"  // Updated color with reduced opacity
            fillOpacity="0.5"
            d="M0,250L60,270C120,290,240,360,360,380C480,400,600,410,720,390C840,370,960,330,1080,310C1200,290,1320,270,1380,250L1440,230L1440,700L1380,700C1320,700,1200,700,1080,700C960,700,840,700,720,700C600,700,480,700,360,700C240,700,120,700,60,700L0,700Z"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-48 pb-3 mb-2"> {/* Increased the padding for a taller footer */}
        <h4 className="uppercase font-bold tracking-widest mb-0 text-[#185a79]">
          Take the Tour of Medora
        </h4>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-180">
          Medora - Find Doctors Across India
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-0">
          Medora connects you with the best doctors across India. Know where doctors are available and easily book appointments based on their availability.
        </p>
        <button onClick={handleClick} className="bg-gray-200 text-[#153D55] font-bold px-6 py-3 rounded-full hover:bg-[#185a79] hover:text-white transition-all mt-4">
          Take the Tour
        </button>
        <hr className="my-3 border-t-1 border-[#d5d5d5d4]" />
        <p>&copy; {new Date().getFullYear()} Medora. All rights reserved.</p>
        {/* Horizontal Line */}
      </div>
    </footer>
  );
};

export default Footer;
