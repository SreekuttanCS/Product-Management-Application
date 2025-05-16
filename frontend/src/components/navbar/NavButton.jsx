import React from "react";

const NavButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-amber-500  h-[50px] px-3 text-white font-bold rounded-2xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavButton;
