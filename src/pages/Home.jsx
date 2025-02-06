import React, { useState, useEffect } from "react";
import image1 from "../assets/about7.jpg";
import image2 from "../assets/about2.webp";
import image3 from "../assets/about5.png";
import image4 from "../assets/about4.jpg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const images = [image1, image2, image3, image4];
const Home = () => {
  const navigate = useNavigate();
  const [msgval, setmsgval] = useState("");
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

   
  const handleSend = () => {
    let numbers = [
      "917093055425",  // Replace with actual numbers
      "918309858080",
      "916304330681"
    ];
    
    let message = msgval;
    
    numbers.forEach((num, index) => {
      setTimeout(() => {
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`, "_blank");
      }, index * 2000);  // 2-second gap to avoid blocking
    });
     };
  
  
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
<div className="mt-2 p-3 w-full">
  <input type="text" placeholder="enter message you want to pass" className="p-3 justify-center w-full border-4" id="inputField"
         // Controlled input
        onChange={()=>{
          setmsgval(event.target.value)
        }}></input>
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
          <button className="bg-[#185a79] text-white px-4 py-2 rounded hover:bg-[#153D55]" onClick={handleSend}>
            Send 
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