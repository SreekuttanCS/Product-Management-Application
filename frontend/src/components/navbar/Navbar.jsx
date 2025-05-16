import { Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/wishlistSlice";

const Navbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    dispatch(toggleWishlist());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <nav className="w-full bg-[#003F62] text-white px-8 py-4 flex items-center justify-between">
      <div className="flex items-center justify-around w-full">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-white h-[50px] min-w-96 px-2 rounded-2xl text-black"
            placeholder="Search anything"
          />
          <button
            className="bg-amber-500 h-[50px] w-40 font-bold rounded-2xl absolute z-10 right-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex justify-around items-center gap-4">
          <span onClick={handleClick} className="cursor-pointer">
            <Heart size={30} />
          </span>

          {token ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <Link to="/login">Log in</Link>
          )}

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
