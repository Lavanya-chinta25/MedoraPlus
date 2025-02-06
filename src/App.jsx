import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation,Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile.jsx'
import Doctors from './pages/Doctors';
import RefreshHandler from './RefreshHandler';
import Chatbot from './chatbot/chatbot'
import Admin_Navbar from './components/Admin_Navbar';
import Medicine from './pages/Medicines';
import Dashboard from './Admin_pages/Dashboard';
import Messages from './Admin_pages/Messages';
import Settings from './Admin_pages/Settings';
import Users from './Admin_pages/Users';


const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const isAuthPage =
    location.pathname === '/Medora/signup' ||
    location.pathname === '/Medora/login' ||
    location.pathname === '/Medora/doctors';

  const isLoginOrSignup =
    location.pathname === '/Medora/signup' || location.pathname === '/Medora/login';

  const isMedicinesPage = location.pathname === '/Medora/medicines';

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever the location changes
  }, [location]);

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      {/* Conditional Navbar */}
      {isAuthenticated === "6304330681" ? <Admin_Navbar /> : !isAuthPage && <Navbar />}

      {/* Main Content Container */}
      <div
        className={isAuthPage ? 'no-margin' : 'page-container'}
        style={{
          marginLeft: isLoginOrSignup ? '0' : '2cm', // No margin for login/signup pages
          marginRight: isLoginOrSignup ? '0' : '2cm', // No margin for login/signup pages
        }}
      >
        <Routes>
          {isAuthenticated === '6304330681' ? (
            // Admin Routes
            <>
              <Route path="/Medora/" element={<Navigate to="/Medora/dashboard" replace />} />
              <Route path="/Medora/home" element={<Navigate to="/Medora/dashboard" replace />} />
              <Route path="/Medora/dashboard" element={<Dashboard />} />
              <Route path="/Medora/messages" element={<Messages />} />
              <Route path="/Medora/settings" element={<Settings />} />
              <Route path="/Medora/users" element={<Users />} />
            </>
          ) : (
            // Regular User Routes
            <>
              <Route path="/Medora/" element={<Home />} />
              <Route path="/Medora/home" element={<Home />} />
              <Route path="/Medora/bot" element={<Chatbot />} />
              <Route path="/Medora/signup" element={<Signup />} />
              <Route path="/Medora/login" element={<Login />} />
              <Route path="/Medora/contact" element={<Contact />} />
              <Route path="/Medora/about" element={<About />} />
              <Route path="/Medora/doctors" element={<Doctors />} />
              <Route path="/Medora/medicines" element={<Medicine />} />
            </>
          )}
        </Routes>

        {/* Footer for non-auth pages and excluding /medicines */}
        {!isAuthPage && !isMedicinesPage && <Footer />}
      </div>
    </>
  );
};

export default App;