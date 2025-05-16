import React from "react";
import {  useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import SubNav from "../navbar/SubNav";
import { selectActiveComponent } from "../../redux/productSlice";

const ProductSetup = () => {
  const activeComponent = useSelector(selectActiveComponent);

  const renderComponent = () => {
    switch (activeComponent) {
      case "product":
        return <AddProduct />;
      case "category":
        return <AddCategory />;
      case "subcategory":
        return <AddSubCategory />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        {activeComponent && (
          <div className="absolute z-10 top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow rounded-2xl border border-gray-400 w-1/2 h-3/4">
            {renderComponent()}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSetup;
