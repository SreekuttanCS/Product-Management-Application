import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subCategory: "",
    ram: "",
    price: "",
    qty: 1,
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const token = localStorage.getItem("token");
  // Fetch categories and subcategories from the backend on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subcategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleQtyChange = (increment) => {
    setFormData((prev) => ({
      ...prev,
      qty: Math.max(1, prev.qty + increment),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variants = [
      {
        ram: formData.ram,
        price: formData.price,
        quantity: formData.qty,
      },
    ];

    if (
      !formData.title ||
      !formData.price ||
      !formData.ram ||
      !formData.image ||
      !formData.category ||
      !formData.subCategory
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const body = new FormData();
    body.append("name", formData.title);
    body.append("description", formData.description);
    body.append("category", formData.category); // ✅ send name
    body.append("subCategory", formData.subCategory); // ✅ send name
    body.append("variants", JSON.stringify(variants));
    body.append("image", formData.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDiscard = () => {
    setFormData({
      title: "",
      description: "",
      subCategory: "",
      ram: "",
      price: "",
      qty: 1,
      image: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg shadow-md flex flex-col gap-6"
    >
      <h2 className="text-2xl font-semibold text-center">Add Product</h2>

      {/* Title */}
      <div className="flex flex-col">
        <label className="font-medium">Title</label>
        <input
          name="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
          required
          className="border border-gray-500 rounded px-3 py-2"
        />
      </div>

      {/* Variants */}
      <div className="flex flex-col gap-3">
        <label className="font-medium">Variants</label>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm">RAM</label>
              <input
                name="ram"
                type="text"
                onChange={handleChange}
                value={formData.ram}
                className="w-full border border-gray-500 rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm">Price</label>
              <input
                name="price"
                type="text"
                onChange={handleChange}
                value={formData.price}
                className="w-full border border-gray-500 rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="p-2 border border-gray-500 rounded"
                >
                  <ChevronLeft size={16} />
                </button>
                <span>{formData.qty}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="p-2 border border-gray-500 rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="font-medium">Category</label>
        <select
          name="category"
          onChange={handleChange}
          value={formData.category}
          className="border border-gray-500 rounded px-3 py-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div className="flex flex-col">
        <label className="font-medium">Sub Category</label>
        <select
          name="subCategory"
          onChange={handleChange}
          value={formData.subCategory}
          className="border border-gray-500 rounded px-3 py-2"
          required
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory.name}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="font-medium">Description</label>
        <input
          name="description"
          type="text"
          onChange={handleChange}
          value={formData.description}
          className="border border-gray-500 rounded px-3 py-2"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="font-medium">Upload Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-500 rounded px-3 py-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-2 rounded-2xl hover:bg-amber-600"
        >
          Add Product
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

export default AddProduct;
