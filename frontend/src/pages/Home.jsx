import React from "react";
import StoreView from "../components/store view/StoreView";
import WishList from "../components/wishlist/WishList";
import ProductSetup from "../components/product Setup/ProductSetup";

const Home = () => {
  return (
    <div className="relative">
      <StoreView />
      <WishList />
      <ProductSetup />
    </div>
  );
};

export default Home;
