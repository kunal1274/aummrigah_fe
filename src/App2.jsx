import React, { useEffect, useState } from "react";
import cl from "../../server/utility/cl.js";
import axios from "axios";
import FetchSingleCustomer from "./GetSingleCustomer.jsx";

const baseUrl = `https://befr8n.vercel.app`;
const secondUrl = `/fms/api/v0`;
const thirdUrl = `/customer`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

// Taxi kit signup page

function SignUpForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign up
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400">
                👁️ {/* Replace with an actual eye icon */}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="countryCode"
                className="block text-sm font-medium text-gray-700"
              >
                Country Code
              </label>
              <input
                type="text"
                id="countryCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No
              </label>
              <input
                type="text"
                id="mobileNo"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-4 text-sm text-gray-500">OR SIGN UP WITH</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-6">
          <span className="text-gray-500 cursor-pointer">F</span>
          <span className="text-gray-500 cursor-pointer">T</span>
          <span className="text-gray-500 cursor-pointer">G</span>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleInputChange = (value, index) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 py-6 px-4">
      {/* Back Button and Title */}
      <div className="w-full flex items-center justify-start">
        <button className="text-gray-700 text-2xl">&#8592;</button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Verify code</h1>
      </div>

      {/* Code Instructions */}
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-2">
          A code has been sent to <br /> +33 234 556 7888 via SMS
        </p>

        {/* Code Input Fields */}
        <div className="flex justify-center space-x-4 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="w-12 h-16 text-center text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:ring-0"
            />
          ))}
        </div>

        {/* Resend Code */}
        <button className="text-blue-500 text-sm hover:underline">
          Resend code
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-4 w-2/3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "×"].map((key, index) => (
          <button
            key={index}
            className={`w-full h-16 flex items-center justify-center text-2xl font-bold ${
              key ? "bg-gray-100 hover:bg-gray-200" : "invisible"
            } rounded-md shadow-sm`}
            onClick={() => {
              if (key === "×") {
                const lastIndex = code.findLastIndex((digit) => digit !== "");
                if (lastIndex >= 0) {
                  handleInputChange("", lastIndex);
                }
              } else if (key !== "") {
                const firstEmptyIndex = code.findIndex((digit) => digit === "");
                if (firstEmptyIndex >= 0) {
                  handleInputChange(String(key), firstEmptyIndex);
                }
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

function VerifyCodeNoFill() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // Handle input changes
  const handleInputChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numeric input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(30); // Reset timer to 30 seconds
      // Trigger resend logic here
    }
  };

  // Countdown logic for resend timer
  React.useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 py-6 px-4">
      {/* Header */}
      <div className="w-full flex items-center justify-start mb-4">
        <button className="text-gray-700 text-2xl">&#8592;</button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Verify code</h1>
      </div>

      {/* Code Input Section */}
      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-sm text-center mb-4">
          A code has been sent to <br />
          +33 234 556 7888 via SMS
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="w-12 h-16 text-center text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:ring-0"
            />
          ))}
        </div>
        <button
          onClick={handleResendCode}
          className={`text-blue-500 text-sm ${
            timer > 0 ? "cursor-not-allowed" : "hover:underline"
          }`}
          disabled={timer > 0}
        >
          Resend code{" "}
          {timer > 0 ? `(0:${timer.toString().padStart(2, "0")})` : ""}
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-4 w-3/4 max-w-sm">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "×"].map((key, index) => (
          <button
            key={index}
            className={`w-full h-16 flex items-center justify-center text-2xl font-bold rounded-md ${
              key
                ? "bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                : "invisible"
            } shadow`}
            onClick={() => {
              if (key === "×") {
                const lastIndex = code.findLastIndex((digit) => digit !== "");
                if (lastIndex >= 0) {
                  handleInputChange("", lastIndex);
                }
              } else if (key !== "") {
                const firstEmptyIndex = code.findIndex((digit) => digit === "");
                if (firstEmptyIndex >= 0) {
                  handleInputChange(String(key), firstEmptyIndex);
                }
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Sign in
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                👁️
              </button>
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR SIGN IN WITH</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Country Code and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="country-code"
              >
                COUNTRY CODE
              </label>
              <input
                type="text"
                id="country-code"
                placeholder="Enter code"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mobile-number"
              >
                MOBILE NO
              </label>
              <input
                type="text"
                id="mobile-number"
                placeholder="Enter mobile no"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Social Sign In */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">OR SIGN IN WITH</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-blue-700">F</span>
          </button>
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-blue-400">T</span>
          </button>
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-red-500">G</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

const ProfileSidebar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-500 md:max-w-sm md:rounded-r-lg overflow-hidden">
      {/* Profile Section */}
      <div className="p-8 text-center">
        <div className="relative mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
          {/* User Icon */}
          <span className="text-gray-500 text-4xl font-semibold">👤</span>
          {/* Edit Icon */}
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
            ✏️
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-white">Carson</h2>
        <p className="text-white text-sm">carson@mobility.com</p>
      </div>

      {/* Menu Section */}
      <div className="bg-white flex-grow px-8 py-6">
        <ul className="space-y-6 text-gray-700">
          <li className="text-sm font-medium cursor-pointer hover:text-blue-500">
            RIDE HISTORY
          </li>
          <li className="text-sm font-medium cursor-pointer hover:text-blue-500">
            PAYMENT
          </li>
          <li className="text-sm font-medium cursor-pointer hover:text-blue-500 flex items-center justify-between">
            PROMOCODE
            <span className="w-5 h-5 text-sm bg-gray-100 text-gray-700 rounded-full flex items-center justify-center shadow-md">
              1
            </span>
          </li>
          <li className="text-sm font-medium cursor-pointer hover:text-blue-500">
            SUPPORT
          </li>
        </ul>
      </div>

      {/* Sign Out Section */}
      <div className="p-6 bg-white">
        <button className="text-sm font-medium text-blue-600 hover:underline">
          Sign out
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return <ProfileSidebar />;
};

// From Shyam
const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Dash<span className="text-black">Stack</span>
        </h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📊</span> Dashboard
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📦</span> Products
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">❤️</span> Favorites
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">💬</span> Inbox
          </li>
          <li className="flex items-center p-2 text-gray-700 bg-blue-100 text-blue-600">
            <span className="mr-3">📋</span> Order Lists
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📈</span> Product Stock
          </li>
        </ul>
      </nav>
      <div className="mt-10">
        <p className="ml-4 text-gray-500">PAGES</p>
        <ul>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">💵</span> Pricing
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📅</span> Calendar
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📝</span> To-Do
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">👥</span> Contact
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">💼</span> Invoice
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📊</span> UI Elements
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">👥</span> Team
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">📋</span> Table
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <ul>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">⚙️</span> Settings
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <span className="mr-3">🔌</span> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

const AppSidebar = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        {/* Your main content goes here */}
        <h1 className="text-3xl font-bold">Main Content</h1>
      </div>
    </div>
  );
};

// From Shyam
const AppOrderTypeSelection = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const orderTypes = [
    "Health & Medicine",
    "Book & Stationary",
    "Services & Industry",
    "Fashion & Beauty",
    "Home & Living",
    "Electronics",
    "Mobile & Phone",
    "Accessories",
  ];

  const toggleOrderType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Order Type</h2>
        <div className="flex flex-wrap mb-4">
          {orderTypes.map((type) => (
            <button
              key={type}
              className={`m-2 px-4 py-2 rounded-full ${
                selectedTypes.includes(type)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
              onClick={() => toggleOrderType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          *You can choose multiple Order types
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Apply Now
        </button>
      </div>
    </div>
  );
};

// From Shyam
const AppInvoicePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Invoice</h2>
        <div className="mb-6">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Invoice From :</p>
              <p>Virginia Walker</p>
              <p>9634 Krijik Locks Suite 635</p>
            </div>
            <div>
              <p className="font-semibold">Invoice To :</p>
              <p>Austin Miller</p>
              <p>Brookview</p>
            </div>
            <div>
              <p className="font-semibold">Invoice Date : 12 Nov 2019</p>
              <p>Due Date : 25 Dec 2019</p>
            </div>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Serial No.</th>
              <th className="py-2">Description</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Base Cost</th>
              <th className="py-2">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Children Toy</td>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">$20</td>
              <td className="border px-4 py-2">$40</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Makeup</td>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">$50</td>
              <td className="border px-4 py-2">$100</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">Asus Laptop</td>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">$1000</td>
              <td className="border px-4 py-2">$5000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">Iphone X</td>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">$1000</td>
              <td className="border px-4 py-2">$4000</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <div></div>
          <div>
            <p className="font-bold text-xl">Total = $4680</p>
            <div className="flex mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                Print
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// From Kunal
const AppCreateContact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        {/* Upload Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.761 0-5 2.239-5 5v3h10v-3c0-2.761-2.239-5-5-5z"
              />
            </svg>
          </div>
          <button className="text-blue-600 mt-2 text-sm hover:underline">
            Upload Photo
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2">Your email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-gray-600 mb-2">Position</label>
            <input
              type="text"
              placeholder="CEO"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 mb-2">Gender</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 bg-white">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

// From kunal
const AppDashboardTable = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4">
        <div className="text-xl font-bold text-blue-600">DashStack</div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          {/* Notification */}
          <div className="relative">
            <span className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Moni Roy</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-white shadow-md w-64 min-h-screen hidden md:block">
          <nav className="flex flex-col py-6 space-y-2">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-6 py-2 flex items-center"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-6 py-2 flex items-center"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-6 py-2 flex items-center"
            >
              Favorites
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-6 py-2 flex items-center"
            >
              Order Lists
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 px-6 py-2 flex items-center"
            >
              Settings
            </a>
          </nav>
        </aside>

        {/* Table Content */}
        <main className="flex-1 p-6">
          {/* Table Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Table</h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    NAME
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    ADDRESS
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    DATE
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    TYPE
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">00001</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Christine Brooks
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    089 Kutch Green Apt. 448
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    14 Feb 2019
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Electric</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">00002</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Rosie Pearson
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    979 Immanuel Ferry Suite 526
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    14 Feb 2019
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Book</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">00003</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Darrell Caldwell
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    8587 Frida Ports
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    14 Feb 2019
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medicine</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs">
                      Rejected
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

// From Kunal
const AppEditProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="border-b border-gray-200 mb-6">
          <ul className="flex space-x-4 text-gray-600">
            <li className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 cursor-pointer">
              Edit Profile
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Preferences</li>
            <li className="hover:text-blue-600 cursor-pointer">Security</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="col-span-full flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
          </div>

          {/* Input Fields */}
          <div>
            <label className="block text-gray-600 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">User Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              placeholder="charlenereed@gmail.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
              defaultValue="1990-01-25"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Present Address</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">
              Permanent Address
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">City</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Postal Code</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="45962"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Country</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="USA"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

function App1() {
  const [customerList, setCustomerList] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contactNum: "",
    currency: "",
    registrationNum: "",
    panNum: "",
    address: "",
    active: true,
  });
  const [message, setMessage] = useState("");
  const [customerID, setCustomerID] = useState("");

  async function deleteCustomer() {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${mergedUrl}/${customerID}`, {
          withCredentials: false,
        });
        alert("Customer deleted successfully.");
        //navigate("/"); // Redirect back to the customer list
        setMessage(`Customer ${customerID} has been deleted successfully`);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          setError("Error: No response from the server.");
        } else {
          setError(`Error: ${err.message}`);
        }
      }
    }
  }
  // Fetch Customers
  useEffect(() => {
    async function loadCustomers() {
      try {
        const dbResponse = await axios.get(mergedUrl, {
          headers: {
            // Authorization: `Bearer ${tokenCookie}`, // Uncomment if required
          },
          withCredentials: false,
        });
        cl("this is the db response", dbResponse.data);
        setCustomerList(dbResponse.data.data);
      } catch (error) {
        if (error.response) {
          cl(`Error in response ${error.response.data}`);
        } else if (error.request) {
          cl(`Error in Request ${error.request}`);
        } else {
          cl(`Error found in Generic section ${error}`);
        }
      }
    }

    loadCustomers();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Create New Customer
  const createCustomer = async (e) => {
    e.preventDefault();
    try {
      const dbResponse = await axios.post(
        mergedUrl,
        { ...newCustomer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      cl("Customer created successfully", dbResponse.data);
      setMessage("Customer created successfully!");
      setCustomerList((prev) => [...prev, dbResponse.data.data]);
      setNewCustomer({
        name: "",
        contactNum: "",
        currency: "",
        registrationNum: "",
        panNum: "",
        address: "",
        active: true,
      });
    } catch (error) {
      if (error.response) {
        cl(`Error in response ${error.response.data}`);
        setMessage(error.response.data.message || "Error creating customer");
      } else if (error.request) {
        cl(`Error in Request ${error.request}`);
        setMessage("Network error, please try again.");
      } else {
        cl(`Error found in Generic section ${error}`);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="text-3xl text-red-500 font-bold flex flex-col space-y-4 items-center">
        <div>Count of Customers: {customerList.length}</div>
        <ul>
          {customerList.map((ele, index) => (
            <li key={ele._id}>
              {ele._id} : {ele.name} - {ele.contactNum}
            </li>
          ))}
        </ul>

        <div>
          <h1> Get Single Customer by ID </h1>
          <FetchSingleCustomer />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h1>Delete Single Customer by ID</h1>
          {/* Input for Customer ID */}
          <input
            type="text"
            color="red-500"
            placeholder="Enter Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            className="border p-2 rounded w-129"
          />

          {/* Fetch Button */}
          <button
            onClick={deleteCustomer}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Customer
          </button>
        </div>

        <form
          onSubmit={createCustomer}
          className="flex flex-col space-y-4 border p-4 rounded-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCustomer.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="contactNum"
            placeholder="Contact Number"
            value={newCustomer.contactNum}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength={10}
          />
          <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={newCustomer.currency}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength={3}
          />
          <input
            type="text"
            name="registrationNum"
            placeholder="Registration Number"
            value={newCustomer.registrationNum}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength={16}
          />
          <input
            type="text"
            name="panNum"
            placeholder="PAN Number"
            value={newCustomer.panNum}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength={10}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={newCustomer.address}
            onChange={handleInputChange}
            className="border p-2 rounded"
          ></textarea>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={newCustomer.active}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
            />
            <span>Active</span>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Create Customer
          </button>
        </form>
        {message && <div className="text-green-500">{message}</div>}
      </div>
    </>
  );
}

export default App;
