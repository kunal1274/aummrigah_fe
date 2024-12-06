import React from "react";

import { FaBell, FaSearch } from "react-icons/fa";

import { FaHome, FaBox, FaHeart, FaEnvelope, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-600">DashStack</div>
      <nav className="flex flex-col space-y-4 mt-6">
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
        >
          <FaHome className="mr-3" /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
        >
          <FaBox className="mr-3" /> Products
        </a>
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
        >
          <FaHeart className="mr-3" /> Favorites
        </a>
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
        >
          <FaEnvelope className="mr-3" /> Inbox
        </a>
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
        >
          <FaCog className="mr-3" /> Settings
        </a>
      </nav>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white p-4 shadow flex justify-between items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-full py-2 px-4 pl-10 w-80"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl" />
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

const OrderTable = () => {
  const orders = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: "Electric",
      status: "Completed",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      type: "Book",
      status: "Processing",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      type: "Medicine",
      status: "Rejected",
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Address</th>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Type</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-4 border-b">{order.id}</td>
              <td className="p-4 border-b">{order.name}</td>
              <td className="p-4 border-b">{order.address}</td>
              <td className="p-4 border-b">{order.date}</td>
              <td className="p-4 border-b">{order.type}</td>
              <td className="p-4 border-b">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    order.status === "Completed"
                      ? "bg-green-500"
                      : order.status === "Processing"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
      <span>Showing 1-9 of 78</span>
      <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Order Lists</h1>
          <OrderTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default App;
