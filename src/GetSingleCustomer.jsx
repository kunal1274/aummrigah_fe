import { useState } from "react";
import cl from "../../server/utility/cl.js";
import axios from "axios";

const baseUrl = `https://befr8n.vercel.app`;
const secondUrl = `/fms/api/v0`;
const thirdUrl = `/customer`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

function FetchSingleCustomer() {
  const [customerId, setCustomerId] = useState(""); // Customer ID input
  const [customer, setCustomer] = useState(null); // Store fetched customer data
  const [error, setError] = useState(null); // Handle errors

  // Function to fetch a single customer
  const fetchCustomer = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await axios.get(`${mergedUrl}/${customerId}`, {
        headers: {
          // Authorization: `Bearer ${tokenCookie}`, // Add token if needed
        },
        withCredentials: false,
      });
      cl("Fetched Customer:", response.data);
      setCustomer(response.data.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${err.message}`);
      }
      setCustomer(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Fetch Customer Details</h1>

      {/* Input for Customer ID */}
      <input
        type="text"
        placeholder="Enter Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="border p-2 rounded w-129"
      />

      {/* Fetch Button */}
      <button
        onClick={fetchCustomer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch Customer
      </button>

      {/* Display Fetched Customer Details */}
      {customer && (
        <div className="mt-4 p-4 border rounded w-1/2">
          <h2 className="text-lg font-bold">Customer Details:</h2>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Contact:</strong> {customer.contactNum}
          </p>
          <p>
            <strong>Currency:</strong> {customer.currency}
          </p>
          <p>
            <strong>Registration No:</strong> {customer.registrationNum}
          </p>
          <p>
            <strong>PAN No:</strong> {customer.panNum}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          <p>
            <strong>Active:</strong> {customer.active ? "Yes" : "No"}
          </p>
        </div>
      )}

      {/* Display Error if Any */}
      {error && <div className="text-red-500 font-semibold mt-4">{error}</div>}
    </div>
  );
}

export default FetchSingleCustomer;
