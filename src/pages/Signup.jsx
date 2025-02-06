import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpeg';
import { ToastContainer,toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    contact: '',
    gender: '',
    locality: '',
    district: '',
    state: '',
    pincode: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null); // To track the focused field
  const scrollableRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name); // Track the focused field
  };

  const handleBlur = () => {
    setFocusedField(null); // Reset when focus leaves the input
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords must match.";
    if (!formData.contact) newErrors.contact = "Contact is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.locality) newErrors.locality = "Locality is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.pincode) newErrors.pincode = "Pincode is required.";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const url = `http://localhost:8080/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        const { success, message, error } = result;

        if (success) {
          toast.success("Signup successful! Please log in."); // Show success toast
          setTimeout(() => {
            navigate('/Medora/login');
          }, 1000);
        } else if (error) {
          toast.error(`Error: ${error.details[0].message}`); // Show error toast
        } else if (!success) {
          toast.error(message || "Signup failed! Please try again."); // Show general error toast
        }

      } catch (err) {
        toast.error("Something went wrong. Please try again later.");
      }
    } else {
      // If there are form errors, show them
      toast.error("Please fill in all required fields correctly.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Parent Container */}
      <div className="relative flex w-full max-w-4xl bg-[#153d55] bg-opacity-80 rounded-lg p-8 space-x-8 h-[70vh] z-10">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center text-white space-y-6">
          <h2 className="text-3xl font-light">Create an Account</h2>
          <p className="text-lg">
            Welcome to our platform. Please fill in the details below to sign up.
          </p>
          <div className="mt-6">
            <p className="text-xl font-semibold text-white">
              Already have an account?{' '}
              <Link to="/Medora/login" className="text-[#bbdef1] hover:text-[#519FC4]">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute top-[-30px] bottom-[-30px] left-[5%] right-[5%] w-[90%] bg-[#9cd4f2] p-12 rounded-lg z-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 h-full">
              {/* Signup Heading */}
              <h3 className="text-[28px] font-bold text-[#153D55] mb-4">Sign Up</h3>

              {/* Scrollable Fields */}
              <div
                className="overflow-y-auto flex-grow space-y-4 p-4"
                ref={scrollableRef}
                style={{
                  scrollbarWidth: 'thin', // For Firefox
                  scrollbarColor: '#519FC4 transparent', // Scrollbar color
                  boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.1)', // Inner shadow effect
                }}
              >
                {/* Custom Scrollbar Styling */}
                <style>
                  {`
                    ::-webkit-scrollbar {
                      width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                      background: #519FC4;
                      border-radius: 5px;
                    }
                  `}
                </style>

                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.fullName || (focusedField === 'fullName' && !formData.fullName) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'fullName' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.password || (focusedField === 'password' && !formData.password) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'password' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.confirmPassword || (focusedField === 'confirmPassword' && !formData.confirmPassword) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'confirmPassword' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Contact */}
                <div>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.contact || (focusedField === 'contact' && !formData.contact) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'contact' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                </div>

                {/* Gender */}
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.gender || (focusedField === 'gender' && !formData.gender) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'gender' ? 'border-[3px]' : ''}`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                {/* Locality */}
                <div>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Locality"
                    value={formData.locality}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.locality || (focusedField === 'locality' && !formData.locality) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'locality' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
                </div>

                {/* District */}
                <div>
                  <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.district || (focusedField === 'district' && !formData.district) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'district' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                {/* State */}
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.state || (focusedField === 'state' && !formData.state) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'state' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.pincode || (focusedField === 'pincode' && !formData.pincode) ? 'border-red-500' : 'border-[#153d55]'} ${focusedField === 'pincode' ? 'border-[3px]' : ''}`}
                    required
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-[#153d55] text-white font-semibold rounded-lg hover:bg-[#519FC4]"
               >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
