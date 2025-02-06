//import React from "react";

function Header() {
    return (
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://ai-public.creatie.ai/gen_page/medical-logo.png"
              alt="Medical Logo"
              className="h-10 mr-4"
            />
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-[#185A79] hover:text-[#134964]">
                Dashboard
              </a>
              <a href="#" className="text-[#185A79] hover:text-[#134964]">
                Messages
              </a>
              <a href="#" className="text-[#185A79] hover:text-[#134964]">
                Settings
              </a>
              <a href="#" className="text-[#185A79] hover:text-[#134964]">
                Users
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="p-2">
              <i className="fas fa-user-circle text-2xl text-gray-700"></i>
            </button>
          </div>
        </div>
      </header>
    );
  }
  
  function UserMessages() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">User Messages</h3>
        <div className="space-y-4">
          <div className="border p-4 rounded text-center">
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-600">john@example.com</p>
            <p className="text-sm text-gray-500">Question about appointments</p>
            <div className="flex justify-end gap-2 mt-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">Reply</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function OfficeHours() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">Office Hours Management</h3>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-center">
              <span className="font-semibold text-lg">Monday - Friday</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="time" className="border rounded p-1" defaultValue="09:00" /> -
              <input type="time" className="border rounded p-1" defaultValue="18:00" />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="text-center">
              <span className="font-semibold text-lg">Saturday - Sunday</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="time" className="border rounded p-1" defaultValue="09:00" /> -
              <input type="time" className="border rounded p-1" defaultValue="13:00" />
            </div>
          </div>
          <button className="bg-[#185A79] text-white px-4 py-2 rounded mt-4 w-full">
            Update Hours
          </button>
        </div>
      </div>
    );
  }
  
  function ContactInfo() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Address</label>
            <input type="text" className="border rounded p-2" defaultValue="123 Medical Street" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Phone</label>
            <input type="text" className="border rounded p-2" defaultValue="(555) 123-4567" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Email</label>
            <input type="email" className="border rounded p-2" defaultValue="info@medical.com" />
          </div>
          <button className="bg-[#185A79] text-white px-4 py-2 rounded mt-4 w-full">
            Save Changes
          </button>
        </div>
      </div>
    );
  }
  
  function SystemStatus() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">System Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Server Status</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Online</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Database</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Connected</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Last Backup</span>
            <span className="text-gray-600">2 hours ago</span>
          </div>
          <button className="bg-[#185A79] text-white px-4 py-2 rounded mt-4 w-full">
            Run Backup
          </button>
        </div>
      </div>
    );
  }
  
  function RecentActivities() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">Recent Activities</h3>
        <ul className="space-y-2">
          <li className="text-gray-700">User John updated office hours</li>
          <li className="text-gray-700">New message from Jane Doe</li>
          <li className="text-gray-700">Backup completed successfully</li>
        </ul>
      </div>
    );
  }
  
  function QuickActions() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">Quick Actions</h3>
        <div className="space-y-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add New User</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded w-full">Generate Report</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Update Settings</button>
        </div>
      </div>
    );
  }
  
  function AnalyticsDashboard() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <h3 className="text-xl font-bold text-[#185A79] mb-4">Analytics Dashboard</h3>
        <div className="space-y-4">
          <div className="text-gray-700">Users Online: <span className="font-bold">120</span></div>
          <div className="text-gray-700">Messages Sent: <span className="font-bold">300</span></div>
          <div className="text-gray-700">System Uptime: <span className="font-bold">99.9%</span></div>
        </div>
      </div>
    );
  }
  
  function Main() {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-[#185A79] mb-12 text-center relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-[#185A79] after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2">
            Admin Control Panel
          </h1>
          <div className="mb-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <UserMessages />
                <OfficeHours />
                <ContactInfo />
                <SystemStatus />
                <RecentActivities />
                <QuickActions />
                <AnalyticsDashboard />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  function Dashboard() {
    return (
      <div className="bg-gray-50 font-['Inter'] flex flex-col min-h-screen">
        <Header />
        <Main />
      </div>
    );
  }
  
  export default Dashboard;