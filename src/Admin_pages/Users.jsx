import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";  
import usersData from "./users_data.json";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All Roles");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "Admin",
    email: "",
    status: "Active",
    joined: new Date().toLocaleDateString(),
  });

  const [users, setUsers] = useState(usersData); // Track users data in state

  const filteredUsers = users.filter((user) => {
    return (
      (filterRole === "All Roles" || user.role === filterRole) &&
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = { ...newUser, id: Date.now() }; // Ensure unique id for the new user
    setUsers([...users, newUserData]); // Add new user to the state
    setShowForm(false); // Hide form after submission
  };

  const handleCancel = () => {
    setShowForm(false); // Close form without saving
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId); // Remove the user by id
    setUsers(updatedUsers); // Update users state with the remaining users
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#185a79]">
        User Management
        <span className="block mt-2 border-b-4 border-[#185a79] w-20 mx-auto"></span>
      </h1>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-md p-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-md p-2"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option>All Roles</option>
          <option>Admin</option>
          <option>Doctor</option>
          <option>Patient</option>
        </select>
        <button
          className="bg-[#185a79] text-white px-4 py-2 rounded-md"
          onClick={() => setShowForm(true)}
        >
          Add New User
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md mb-6 w-1/2 mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#185a79] mb-4">Add New User</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded-md p-2 w-full"
              value={newUser.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-md p-2 w-full"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="border rounded-md p-2 w-full"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option>Admin</option>
              <option>Doctor</option>
              <option>Patient</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="border rounded-md p-2 w-full"
              value={newUser.status}
              onChange={handleInputChange}
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#185a79] text-white px-4 py-2 rounded-md"
            >
              Add User
            </button>
          </div>
        </form>
      )}

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-[#185a79]">User</th>
              <th className="p-4 text-left text-[#185a79]">Role</th>
              <th className="p-4 text-left text-[#185a79]">Email</th>
              <th className="p-4 text-left text-[#185a79]">Status</th>
              <th className="p-4 text-left text-[#185a79]">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto" style={{ maxHeight: '300px' }}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">
                  <span className="font-medium">{user.name}</span>
                  <br />
                  <span className="text-sm text-gray-500">
                    Joined {user.joined}
                  </span>
                </td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    <FaEdit size={18} /> {/* Edit Icon */}
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)} // Delete button logic
                  >
                    <FaTrash size={18} /> {/* Delete Icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p>
          Showing 1 to {filteredUsers.length} of {usersData.length} results
        </p>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded-md">Previous</button>
          <button className="px-3 py-1 border rounded-md bg-gray-100">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">Next</button>
        </div>
      </div>
      {/* User Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">User Statistics</h3>
          <p>Total Users: <span className="font-bold">1,234</span></p>
          <p>Active Users: <span className="text-green-500 font-bold">1,180</span></p>
          <p>Inactive Users: <span className="text-red-500 font-bold">54</span></p>
        </div>
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">User Roles</h3>
          <p>Admins: <span className="font-bold">8</span></p>
          <p>Doctors: <span className="font-bold">46</span></p>
          <p>Patients: <span className="font-bold">1,180</span></p>
        </div>
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">Recent Activity</h3>
          <p>New user registration<br></br> <span className="text-sm text-gray-400">2 minutes ago</span></p>
          <p>User profile updated<br></br> <span className="text-sm text-gray-400">15 minutes ago</span></p>
          <p>Password reset requested<br></br> <span className="text-sm text-gray-400">1 hour ago</span></p>
        </div>
      </div>

      {/* Backup & Maintenance Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">Backup & Maintenance</h3>
          <p>Last Backup<br></br> <span className="text-sm text-gray-400">2024-01-15 09:30 AM</span></p>
          <button className="mt-4 bg-[#185a79] text-white px-4 py-2 rounded hover:bg-[#153d55]">
            Create Backup
          </button>
        </div>
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">System Status</h3>
          <p className="text-green-500 font-bold">All Systems Operational</p>
          <button className="mt-4 bg-[#185a79] text-white px-4 py-2 rounded hover:bg-[#153d55]">
            Check Updates
          </button>
        </div>
        <div className="bg-white rounded shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-[#185a79]">Storage Usage</h3>
          <p>45% of 1TB used</p>
          <div className="relative w-full bg-gray-200 h-4 rounded mt-2">
            <div className="absolute bg-[#185a79] h-4 rounded" style={{ width: "45%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;