import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import StoreView from "../components/store view/StoreView";
import WishList from "../components/wishlist/WishList";
import ProductSetup from "../components/product Setup/ProductSetup";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <Navbar onSearch={setSearch} />
      <StoreView search={search} />
      <WishList />
      <ProductSetup />
    </div>
  );
};

export default Home;
