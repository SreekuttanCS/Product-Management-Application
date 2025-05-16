import React from "react";

const CategorySelector = ({
  categories,
  subCategories,
  formData,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="category" className="font-semibold">
      Category
    </label>
    <select
      name="category"
      value={formData.category}
      onChange={onChange}
      className="p-2 border rounded-md"
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>

    <label htmlFor="subCategory" className="font-semibold">
      SubCategory
    </label>
    <select
      name="subCategory"
      value={formData.subCategory}
      onChange={onChange}
      className="p-2 border rounded-md"
    >
      <option value="">Select SubCategory</option>
      {subCategories.map((subCategory) => (
        <option key={subCategory.id} value={subCategory.id}>
          {subCategory.name}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelector;
