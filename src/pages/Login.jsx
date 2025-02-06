import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpeg';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 

function Login() {
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    contact: '',
    password: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle change and update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form data
  const validate = () => {
    let tempErrors = { contact: '', password: '' };
    let isValid = true;

    // Validate email
    if (!formData.contact) {
      tempErrors.contact = 'contact is required';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      console.log('Form submitted:', formData);
      try {
        const url = `http://localhost:8080/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result)
        const { success, message, jwttoken, contact, error } = result;
        if (success) {
          // Show success toast
          toast.success('Login Successful!', {
            position: 'top-center',
            autoClose: 3000, // Toast will disappear after 3 seconds
          });
            // handleSuccess(message);
localStorage.setItem('token', result.jwttoken);

            localStorage.setItem('loggedInUser', contact);
            setTimeout(() => {
                navigate('/Medora/home')
            }, 1000)
        } else if (error) {
            const details = error?.details[0].message;
            // handleError(details);
            toast.error(details || 'Something went wrong, please try again', {
            position: 'top-center',
            autoClose: 3000,
          });
        } else if (!success) {
            // handleError(message);
            toast.error(message || 'Login failed. Please try again', {
              position: 'top-center',
              autoClose: 3000,
            });
        }
        console.log(result);
    } catch (err) {
        // handleError(err);
        toast.error('An error occurred while logging in. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
    }
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
      <div className="relative flex w-full max-w-4xl bg-[#153d55] bg-opacity-80 rounded-lg p-8 space-x-8 h-[50vh] z-10">
        {/* Left Section (Overlay) */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div
            className="absolute top-[-50px] bottom-[-50px] left-[5%] right-[5%] w-[90%] bg-[#9cd4f2] p-12 rounded-lg z-10"
            style={{
              top: '-50px', // Moves overlay up by 50px (outside the parent)
              bottom: '-50px', // Moves overlay down by 50px (outside the parent)
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/* LogIn Heading */}
              <h2 className="text-2xl font-bold text-[#153D55] mb-4">Log In</h2>

              <div>
                <input
                  type="number"
                  name="contact"
                  placeholder="Mobile Number"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#153D55] ${formData.contact && 'border-[#153D55]'}`}
                />
                {isSubmitted && errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#153D55] ${formData.password && 'border-[#153D55]'}`}
                />
                {isSubmitted && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-[#185a79d4] text-white py-3 rounded-lg hover:bg-[#153D55] transition-all duration-300 shadow-lg shadow-[#153D55]/50"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section (Text & Sign Up Link) */}
        <div className="w-1/2 flex flex-col justify-center text-white space-y-6">
          <h2 className="text-3xl font-light">Welcome Back</h2>
          <p className="text-lg">
            Please enter your credentials to login to your account.
          </p>
          <div  className="mt-4 text-[20px] font-bold text-white-500">
            Don't have an account?{' '}
            <Link to="/Medora/signup" className="font-bold text-[#519FC4] hover:text-[#bbdef1]">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
