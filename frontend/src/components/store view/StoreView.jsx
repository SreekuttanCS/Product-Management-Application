import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Products from "../products/Products";
import SubNav from "../navbar/SubNav";
import { setActiveComponent } from "../../redux/productSlice";

const StoreView = () => {
  const dispatch = useDispatch();
  const [selectedSubs, setSelectedSubs] = useState([]);

  return (
    <>
      <SubNav
        handleSelect={(component) => dispatch(setActiveComponent(component))}
      />
      <div className="flex">
        <Sidebar
          selectedSubs={selectedSubs}
          setSelectedSubs={setSelectedSubs}
        />
        <Products selectedSubs={selectedSubs} />
      </div>
    </>
  );
};

export default StoreView;
