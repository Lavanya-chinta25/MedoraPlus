import React, { useState, useEffect } from "react";

// const fs = require('fs');
const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("All Messages");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(3);
    

  // Handle pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const handleNext = () => {
    if (currentPage < Math.ceil(messages.length / messagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 min-h-screen mt-20 w-full">
      <div className="w-full mx-auto shadow-lg rounded-md p-6">
        
        {/* Message Management Section */}
        <div className="shadow-md rounded-md p-6 mb-6">
          <h1 className="text-4xl font-bold text-[#185a79] mb-4 text-center pb-1 border-[#185a79] w-max mx-auto">
            Message Management
            <span className="block mt-2 border-b-4 border-[#185a79] w-20 mx-auto"></span>
          </h1>
        </div>

        {/* Inbox Messages Section */}
        <div className="shadow-md rounded-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#185a79]">Inbox Messages</h2>
            <div className="flex justify-end items-center gap-4">
              <button className="bg-[#185A79] text-white py-2 px-4 rounded-md hover:bg-[#153d55]">Mark All Read</button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete Selected</button>
            </div>
          </div>
          <div className="mt-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`border p-4 rounded-md mb-2 ${
                  message.status === "new" ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{message.name}</p>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  {message.status === "new" && (
                    <span className="bg-blue-200 text-white text-xs py-1 px-2 rounded-full">New</span>
                  )}
                </div>
                <p className="mt-2 text-gray-700">{message.message}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <p>Showing {indexOfFirstMessage + 1}-{indexOfLastMessage} of {messages.length} messages</p>
            <div className="flex items-center gap-2">
              <button
                className="py-1 px-3 border rounded-md"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button className="py-1 px-3 border rounded-md bg-[#185a79] text-white">{currentPage}</button>
              <button
                className="py-1 px-3 border rounded-md"
                onClick={handleNext}
                disabled={currentPage === Math.ceil(messages.length / messagesPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="shadow-md rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#185a79] mb-4">Message Filters</h2>
          <div className="flex justify-between items-center">
            <select
              className="border py-2 px-4 rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All Messages</option>
              <option>Unread Messages</option>
              <option>Read Messages</option>
            </select>
            <select
              className="border py-2 px-4 rounded-md"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <select
              className="border py-2 px-4 rounded-md"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="shadow-md rounded-md p-8 mb-8">
        <h2 className="text-xl font-semibold text-[#185a79] mb-4">Message Statistics</h2>
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="text-sm font-bold text-black">Total Messages</p>
            <p className="text-3xl font-bold text-[#185a79]">156</p>
            <p className="text-xs text-gray-600">Last 30 days</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="text-sm font-bold text-black">Response Rate</p>
            <p className="text-3xl font-bold text-[#185a79]">98%</p>
            <p className="text-xs text-gray-600">Average</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="text-sm font-bold text-black">Average Response Time</p>
            <p className="text-3xl font-bold text-[#185a79]">2.4h</p>
            <p className="text-xs text-gray-600">Last 7 days</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="text-sm font-bold text-black">Unread Messages</p>
            <p className="text-3xl font-bold text-[#185a79]">12</p>
            <p className="text-xs text-gray-600">Current</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MessageManagement;