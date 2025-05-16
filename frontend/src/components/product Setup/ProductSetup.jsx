import React from "react";
import AddProduct from "./AddProduct";

const ProductSetup = () => {
  return (
    <div className="absolute z-10 top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow rounded-2xl border-1 border-gray-400 w-1/2  h-3/4">
      <AddProduct />
    </div>
  );
};

export default ProductSetup;
