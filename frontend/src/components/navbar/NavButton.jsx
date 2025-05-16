import React from "react";

const NavButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-amber-500 h-[50px] px-3 text-white font-bold rounded-2xl hover:bg-amber-600 transition"
    >
      {text}
    </button>
  );
};

export default NavButton;
