import React from "react";

const ProductImageUpload = ({ onChange }) => (
  <div className="flex justify-around  w-full">
    <label htmlFor="image" className="font-semibold">
      Product Image
    </label>
    <input
      type="file"
      name="image"
      onChange={onChange}
      required
      className="p-2 border rounded-md w-100"
    />
  </div>
);

export default ProductImageUpload;
