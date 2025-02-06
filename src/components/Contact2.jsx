import React,{useState,useRef} from "react";
import location from "../assets/map.jpg";
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpeg';
import { ToastContainer,toast } from 'react-toastify';  // Path to the map image in your assets folder

import 'react-toastify/dist/ReactToastify.css'; 
const Contact2 = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    subject: '',
    message: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null); // To track the focused field
  const scrollableRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name); // Track the focused field
  };

  const handleBlur = () => {
    setFocusedField(null); // Reset when focus leaves the input
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.fullName = "First Name is required.";
    if (!formData.contact) newErrors.contact = "Contact is required.";
    if (!formData.subject) newErrors.locality = "Subject is required.";
    if (!formData.message) newErrors.district = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (1) {
      try {
        console.log(formData)
        const url = `http://localhost:8080/auth/sendmsg`;
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
      console.log("enter")
    }
  };
  return (
    <section className="py-16 px-4 lg:px-20 bg-gray-100 top-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-tl-[50px] rounded-br-[50px] p-8 relative border-t-8 border-b-8 border-[#185a79]">
          <h2 className="text-2xl font-bold text-[#153D55] mb-6">
            Connect with Us Today
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text" name="firstName" onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="First Name"
                className="border border-gray-300 rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text" onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Last Name" name="lastName"
                className="border border-gray-300 rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <input
              type="number" name="contact" onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Your Mobile Number"
              className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text" name="subject" onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Subject"
              className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message" name="message"
              rows="4" onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-[#185a79] text-white py-2 px-6 rounded-md hover:bg-[153d55] transition"
            >
              Send a Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-[#185a79] font-semibold">GET IN TOUCH</h3>
          <h2 className="text-2xl font-bold text-[#153d55]">
            Inquire About Upcoming Medical Camps
          </h2>
          <p className="text-gray-600">
            Reach out to learn more about our upcoming medical camps. 
            We’re committed to providing accessible healthcare to rural communities,
            offering consultations, treatments, and preventative care.
          </p>
          <div  className="border rounded-lg overflow-hidden">
            <img
              src={location}
              alt="Location Map"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
