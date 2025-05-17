import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import {
  selectActiveComponent,
  resetActiveComponent,
} from "../../redux/productSlice";

const ProductSetup = () => {
  const activeComponent = useSelector(selectActiveComponent);
  const dispatch = useDispatch();

  const renderComponent = () => {
    switch (activeComponent) {
      case "product":
        return <AddProduct onDiscard={handleDiscard} />;
      case "category":
        return <AddCategory onDiscard={handleDiscard} />;
      case "subcategory":
        return <AddSubCategory onDiscard={handleDiscard} />;
      default:
        return null;
    }
  };

  const handleDiscard = () => {
    dispatch(resetActiveComponent());
  };

  return (
    <div>
      {activeComponent && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-[rgba(61,52,52,0.5)] z-9"
            onClick={handleDiscard}
          ></div>

          <div className="absolute z-10 top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/4 border-gray-400">
            {renderComponent()}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSetup;
