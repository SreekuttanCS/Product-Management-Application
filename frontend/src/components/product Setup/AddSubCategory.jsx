import React, { useState } from "react";
import axios from "axios";

const AddSubCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Category name cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/subcategories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Category '${res.data.name}' added successfully!`);
      setName(""); // Clear input
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      setMessage(errMsg);
    }
  };

  const handleDiscard = () => {
    setName("");
    setMessage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg shadow-md flex flex-col gap-6"
    >
      <h2 className="text-2xl font-semibold text-center">Add Category</h2>

      <option
        type="text"
        placeholder="Select Category "
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Enter Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      />

      {message && <p className="text-sm text-center text-red-500">{message}</p>}

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-2 rounded-2xl hover:bg-amber-600"
        >
          Add Category
        </button>
        <button
          type="button"
          onClick={handleDiscard}
          className="text-gray-600 hover:underline"
        >
          Discard
        </button>
      </div>
    </form>
  );
};

export default AddSubCategory;
