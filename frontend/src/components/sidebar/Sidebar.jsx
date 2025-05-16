import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ selectedSubs, setSelectedSubs }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const catRes = await axios.get("http://localhost:5000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const subCatRes = await axios.get(
          "http://localhost:5000/api/subcategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories(catRes.data);
        setSubCategories(subCatRes.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (catId) => {
    setExpanded((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const toggleSub = (subId) => {
    setSelectedSubs((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const handleAllCategories = () => {
    setSelectedSubs([]); // Clear subcategory selections to fetch all products
  };

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200 min-h-screen">
      <div className="mb-4 text-sm text-gray-500">Home &gt;</div>
      <h2 className="font-semibold text-gray-700 mb-3">Categories</h2>

      <div
        className="text-blue-600 cursor-pointer mb-2"
        onClick={handleAllCategories}
      >
        All categories
      </div>

      {categories.map((cat) => (
        <div key={cat._id} className="mb-2">
          <div
            className="flex justify-between items-center cursor-pointer font-medium"
            onClick={() => toggleExpand(cat._id)}
          >
            <span>{cat.name}</span>
            {subCategories.length > 0 && (
              <span>{expanded.includes(cat._id) ? "▾" : "▸"}</span>
            )}
          </div>

          {expanded.includes(cat._id) && (
            <div className="ml-4 mt-1">
              {subCategories
                .filter((sub) => sub.category._id === cat._id)
                .map((sub) => (
                  <div key={sub._id} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={sub._id}
                      checked={selectedSubs.includes(sub._id)}
                      onChange={() => toggleSub(sub._id)}
                      className="mr-2"
                    />
                    <label htmlFor={sub._id}>{sub.name}</label>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
