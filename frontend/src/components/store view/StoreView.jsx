import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Products from "../products/Products";
import SubNav from "../navbar/SubNav";

const StoreView = () => {
  const [selectedSubs, setSelectedSubs] = useState([]);
  console.log(selectedSubs);

  return (
    <>
      <SubNav />
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
