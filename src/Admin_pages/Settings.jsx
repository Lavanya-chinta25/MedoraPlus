import React, { useState, useEffect } from "react";
import doctorsData from "./doctors_data.json"; // Import the JSON file

const Settings = () => {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    availability: "",
    location: "",
  });

  useEffect(() => {
    setDoctors(doctorsData); // Load doctors data
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setDoctors([...doctors, { ...newDoctor, id: doctors.length + 1 }]);
    setNewDoctor({ name: "", specialty: "", availability: "", location: "" });
    setShowForm(false); // Close the form after submission
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-md p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#185a79]">
          Settings & Administration
          <span className="block mt-2 border-b-4 border-[#185a79] w-20 mx-auto"></span>
        </h1>

        {/* Quick Settings and Rural Doctors Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Settings */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#185a79]">Quick Settings</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">System Theme</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Light Mode</option>
                <option>Dark Mode</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Language</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="emailNotifications" className="mr-2" />
              <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-600">
                Enable Email Notifications
              </label>
            </div>
          </div>

          {/* Rural Doctors Management */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#185a79]">Rural Doctors Management</h2>
            <button
              className="bg-[#185a79] text-white py-2 px-4 rounded-md mb-4 hover:bg-[#134d5d]"
              onClick={() => setShowForm(true)} // Show form when clicked
            >
              Add New Doctor
            </button>

            {/* Form to add a new doctor */}
            {showForm && (
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold mb-4 text-[#185a79]">Add New Doctor</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Specialty</label>
                  <input
                    type="text"
                    name="specialty"
                    value={newDoctor.specialty}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    value={newDoctor.availability}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newDoctor.location}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    onClick={() => setShowForm(false)} // Close form without saving
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    onClick={handleSubmit} // Submit the new doctor data
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Display Doctors List */}
            <div className="space-y-4 mt-6 max-h-[400px] overflow-y-auto">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-start p-4 bg-white shadow-sm rounded-md">
                  <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">Specialty: {doctor.specialty}</p>
                    <p className="text-sm text-gray-600">Available: {doctor.availability}</p>
                    <p className="text-sm text-gray-600">Location: {doctor.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">✏</button>
                    <button className="text-red-500 hover:text-red-700">🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Configuration and Security Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Configuration */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#185a79]">System Configuration</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Appointment Slot Duration</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Working Hours</label>
              <div className="flex gap-4">
                <input type="time" className="w-full p-2 border rounded-md" defaultValue="09:00" />
                <input type="time" className="w-full p-2 border rounded-md" defaultValue="17:00" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Maximum Appointments per Day</label>
              <input type="number" className="w-full mt-1 p-2 border rounded-md" defaultValue="20" />
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#185a79]">Security Settings</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password Policy</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Strong (8+ chars, special chars required)</option>
                <option>Moderate (6+ chars)</option>
                <option>Weak</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Session Timeout</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="twoFactor" className="mr-2" />
              <label htmlFor="twoFactor" className="text-sm font-medium text-gray-600">
                Enable Two-Factor Authentication
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;