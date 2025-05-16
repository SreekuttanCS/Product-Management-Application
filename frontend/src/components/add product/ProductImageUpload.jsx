import React from "react";

const ProductImageUpload = ({ onChange }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="image" className="font-semibold">
      Product Image
    </label>
    <input
      type="file"
      name="image"
      onChange={onChange}
      required
      className="p-2 border rounded-md"
    />
  </div>
);

export default ProductImageUpload;
