import React from "react";

const CategorySelector = ({
  categories,
  subCategories,
  formData,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex  justify-around">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          className="border p-2 rounded w-100"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex  justify-around">
        <label className="block text-sm font-medium mb-2">SubCategory</label>
        <select
          name="subCategory"
          value={formData.subCategory}
          onChange={onChange}
          required
          className="border p-2 rounded w-100"
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory._id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
