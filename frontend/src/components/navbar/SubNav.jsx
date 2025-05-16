import React from "react";
import NavButton from "./NavButton";

const SubNav = ({ handleSelect }) => {
  return (
    <div className="flex items-center p-4 justify-end">
      <div className="flex gap-4">
        <NavButton
          text="Add Category"
          onClick={() => handleSelect("category")}
        />
        <NavButton
          text="Add Sub Category"
          onClick={() => handleSelect("subcategory")}
        />
        <NavButton text="Add Product" onClick={() => handleSelect("product")} />
      </div>
    </div>
  );
};

export default SubNav;
