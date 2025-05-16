import React from "react";
import bgImage from "../../assets/auth/bg.png";

const AuthWrapper = ({
  reverse = false,
  sideTitle,
  sideText,
  sideButtonText,
  onSideButtonClick,
  formTitle,
  children,

}) => {
  return (
    <div
      className={`flex h-screen ${reverse ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* form section */}
      <div className="w-[60%] flex flex-1 flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-amber-500 text-4xl font-bold mb-6">{formTitle}</h2>
        <form
         
          className="flex flex-col items-center  w-full max-w-sm gap-4"
        >
          {children}
          
        </form>
      </div>

      {/* side section  */}
      <div
        className="w-[40%] flex flex-1 flex-col justify-center items-center p-10  text-center bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2 className=" font-bold text-3xl mb-4">{sideTitle}</h2>
        <p className="text-white text-center font-light w-80 text-lg">
          {sideText}
        </p>
        <button
          onClick={onSideButtonClick}
          className="text-white w-[200px] font-bold bg-transparent border border-white py-2 p-4 rounded-4xl  transition"
        >
          {sideButtonText}
        </button>
      </div>
    </div>
  );
};

export default AuthWrapper;
