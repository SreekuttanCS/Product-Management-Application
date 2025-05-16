import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubCategory = ({ onDiscard }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !categoryId) {
      setMessage("Both category and subcategory name are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/subcategories",
        { name, categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Subcategory '${res.data.name}' added successfully!`);
      setName("");
      setCategoryId("");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      setMessage(errMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg shadow-md flex flex-col gap-6"
    >
      <h2 className="text-2xl font-semibold text-center">Add Subcategory</h2>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="">Select a Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Subcategory Name"
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
          Add Subcategory
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="text-gray-600 hover:underline"
        >
          Discard
        </button>
      </div>
    </form>
  );
};

export default AddSubCategory;
