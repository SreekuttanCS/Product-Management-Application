import React from "react";
import NavButton from "./NavButton";

const SubNav = () => {
  const handleButton = () => {
    console.log();
  };
  return (
    <div className="flex items-center py-4 justify-around ">
      <h4 className="text-lg">Home</h4>
      <div className="flex gap-4">
        <NavButton text={"Add Category"} onClick={handleButton} />
        <NavButton text={"Add Sub Category"} onClick={handleButton} />
        <NavButton text={"Add Product"} onClick={handleButton} />
      </div>
    </div>
  );
};

export default SubNav;
