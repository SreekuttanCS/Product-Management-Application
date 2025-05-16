import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/wishlistSlice";

const Navbar = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleWishlist());
  };
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <nav className="w-full bg-[#003F62] text-white px-8 py-4 flex items-center justify-between">
      <div className="flex items-center justify-around w-full">
        <div className="relative">
          <input
            type="text"
            className="bg-white h-[50px] min-w-96 px-2 rounded-2xl text-black"
            placeholder="Search any thing"
          />
          <button className="bg-amber-500 h-[50px] w-40 font-bold rounded-2xl absolute z-10 right-0 ">
            Search
          </button>
        </div>
        <div className="flex justify-around items-center gap-4">
          <span onClick={handleClick} className="cursor-pointer">
            <Heart size={30} />
          </span>

          <h4>Sign in</h4>

          <div className="flex gap-2 items-center">
            <ShoppingCart size={30} />
            <h4>Cart</h4>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
