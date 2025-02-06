import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserMd, FaInfoCircle, FaPhoneAlt, FaCapsules } from 'react-icons/fa'; // Import FaCapsules icon
import Logo from '../assets/logo.png';

import "./Navbar.css";
const handleEmergency = () => {
  // Initiates a call to the emergency number 108
  window.location.href = 'tel:108';
};


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      {/* Navbar Header */}
      <div
        className="relative fixed top-0 left-0 w-full flex items-center justify-between text-sm pt-4 pb-3 border-b border-gray-400 bg-white z-[9999]"
        style={{
          left: '2cm',
          right: '2cm',
          width: 'calc(100% - 4cm)', 
        }}
      >

        {/* Logo */}
        <img className="width-[200px] im-logo flex items-center justify-center z-[10000] cursor-pointer" src={Logo} alt="Logo" />

        {/* Navigation Links */}
        <nav className="flex justify-center items-center w-full">
          <ul className="hidden md:flex items-center justify-center gap-6 text-[18px] font-medium">
            {/* Navigation Items */}
            {[
              { to:'/Medora/', label: 'HOME', icon: <FaHome /> },
              { to: '/Medora/doctors', label: 'DOCTORS', icon: <FaUserMd /> },
              { to: '/Medora/medicines', label: 'MEDICINES', icon: <FaCapsules /> }, 
              { to: '/Medora/about', label: 'ABOUT', icon: <FaInfoCircle /> },
              { to: '/Medora/contact', label: 'CONTACT', icon: <FaPhoneAlt /> },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'pt-5 pb-1 text-[#519fc4] border-b-2 border-[#185A79] hover:text-[#185A79] w-[50%] text-center transition-all duration-300 ease-in-out flex items-center gap-2'
                    : 'pt-5 pb-1 text-black hover:text-[#185A79] cursor-pointer text-center transition-all duration-300 ease-in-out flex items-center gap-2'
                }
                end
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </ul>
    


          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-4xl text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {showMenu ? '×' : '≡'}
            </button>
          </div>
          
        </nav>
        <div className="flex justify-end">
            <button 
              className="bg-[#b01e1ee0] mt-4 text-white px-4 py-2 rounded hover:bg-[#932121]"
              onClick={handleEmergency}
            >
              Emergency
            </button>
          </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="md:hidden fixed top-20 left-0 w-full h-full bg-white bg-opacity-95 shadow-lg z-50">
          {/* Close Button */}

          {/* Mobile Menu Items */}
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-black">
            {[
              { to: '/Medora/', label: 'HOME', icon: <FaHome /> },
              { to: '/Medora/doctors', label: 'DOCTORS', icon: <FaUserMd /> },
              { to: '/Medora/about', label: 'ABOUT', icon: <FaInfoCircle /> },
              { to: '/Medora/contact', label: 'CONTACT', icon: <FaPhoneAlt /> },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="w-full flex items-center justify-center py-3 cursor-pointer text-black hover:text-[#185A79] transition-colors duration-300 ease-in-out"
                onClick={() => setShowMenu(false)}
                end
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
            
          </ul>
          <button className="bg-[#b01e1ee0] text-white px-4 py-2 rounded hover:bg-[#153D55]" onClick={handleEmergency}>
            Emergency!
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;