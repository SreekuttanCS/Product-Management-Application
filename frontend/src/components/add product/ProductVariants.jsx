import React from "react";
import FormFields from "./FormFields";

const ProductVariants = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-6">
    <FormFields
      label="RAM"
      type="text"
      name="ram"
      value={formData.ram}
      onChange={handleChange}
      placeholder="Enter RAM"
      required={true}
    />
    <FormFields
      label="Price"
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      placeholder="Enter price"
      required={true}
    />
    <FormFields
      label="Quantity"
      type="number"
      name="qty"
      value={formData.qty}
      onChange={handleChange}
      placeholder="Enter quantity"
      required={false}
    />
  </div>
);

export default ProductVariants;
