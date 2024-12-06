import { useState, useEffect } from "react";
import axios from "axios";
import cl from "../../server/utility/cl.js";

const baseUrl = `https://befr8n.vercel.app`;
const secondUrl = `/fms/api/v0`;
const thirdUrl = `/customer`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

function UpdateCustomer({ customerId, onSuccess }) {
  const [customer, setCustomer] = useState({
    name: "",
    contactNum: "",
    currency: "",
    registrationNum: "",
    panNum: "",
    address: "",
    active: true,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the customer details on load
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await axios.get(`${mergedUrl}/${customerId}`, {
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
      }
    }

    fetchCustomer();
  }, [customerId]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  }

  // Update customer
  async function handleUpdate() {
    if (window.confirm("Are you sure you want to update this customer?")) {
      setLoading(true);
      try {
        const response = await axios.put(
          `${mergedUrl}/${customerId}`,
          customer,
          {
            withCredentials: false,
          }
        );
        cl("Updated Customer Response:", response.data);
        alert("Customer updated successfully.");
        if (onSuccess) onSuccess(); // Callback to refresh the customer list
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          setError("Error: No response from the server.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!customer.name && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Update Customer</h1>
      <form>
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNum"
            value={customer.contactNum}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Currency:</label>
          <input
            type="text"
            name="currency"
            value={customer.currency}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Registration Number:</label>
          <input
            type="text"
            name="registrationNum"
            value={customer.registrationNum}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNum"
            value={customer.panNum}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Address:</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label>
            Active:
            <input
              type="checkbox"
              name="active"
              checked={customer.active}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
              className="ml-2"
            />
          </label>
        </div>
      </form>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Update Customer"}
      </button>
    </div>
  );
}

export default UpdateCustomer;
