import React from "react";
import backgroundImage from "../assets/background.jpeg";

const Contact1 = () => {
  return (
    <section
      className="relative mb-40 w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "40vh", // Reduced height for the background
      }}
    >
      {/* Black overlay for the background image */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Content */}
      <div
        className="relative z-20 px-6 py-12 text-center text-white"
        style={{ marginTop: "10px" }} // Adjusted margin for alignment
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Contact Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="bg-white text-[#519fc4] rounded-lg shadow-lg p-4 text-center transition-all transform duration-300 hover:scale-105 hover:shadow-xl hover:w-[80%] hover:translate-y-[-10px]"
            style={{
              width: "75%", // Default width
              height: "160px",
              margin: "0 auto",
              transform: "translateY(20%)",
              position: "relative",
              zIndex: "30",
              boxShadow: "0 0.5cm 0.5cm rgba(21, 61, 85, 0.5)", // Custom shadow color and size
            }}
          >
            <i className="fas fa-phone-alt text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-700">+91 9670957889</p>
          </div>
          {/* Card 2 */}
          <div
            className="bg-white text-[#519fc4] rounded-lg shadow-lg p-4 text-center transition-all transform duration-300 hover:scale-105 hover:shadow-xl hover:w-[80%] hover:translate-y-[-10px]"
            style={{
              width: "75%", // Default width
              height: "160px",
              margin: "0 auto",
              transform: "translateY(20%)",
              position: "relative",
              zIndex: "30",
              boxShadow: "0 0.5cm 0.5cm rgba(21, 61, 85, 0.5)", // Custom shadow color and size
            }}
          >
            <i className="fas fa-envelope text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-700">info@medora.com</p>
          </div>
          {/* Card 3 */}
          <div
            className ="bg-white text-[#519fc4] rounded-lg shadow-lg p-4 text-center transition-all transform duration-300 hover:scale-105 hover:shadow-xl hover:w-[80%] hover:translate-y-[-10px]"
            style={{
              width: "75%", // Default width
              height: "160px",
              margin: "0 auto",
              transform: "translateY(20%)",
              position: "relative",
              zIndex: "30",
              boxShadow: "0 0.5cm 0.5cm rgba(21, 61, 85, 0.5)", // Custom shadow color and size
            }}
          >
            <i className="fas fa-map-marker-alt text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-700">70 Nuzvid Rd, AB , 521202</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
