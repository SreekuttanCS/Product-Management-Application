import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Products from "../products/Products";
import SubNav from "../navbar/SubNav";
import { setActiveComponent } from "../../redux/productSlice";

const StoreView = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const [selectedSubs, setSelectedSubs] = useState([]); // Local state for selected subcategories
  console.log(selectedSubs);

  return (
    <>
      <SubNav
        handleSelect={(component) => dispatch(setActiveComponent(component))} // Dispatching the action to set active component
      />
      <div className="flex">
        <Sidebar
          selectedSubs={selectedSubs}
          setSelectedSubs={setSelectedSubs} // Passing the local setter function for state updates
        />
        <Products selectedSubs={selectedSubs} />
      </div>
    </>
  );
};

export default StoreView;
