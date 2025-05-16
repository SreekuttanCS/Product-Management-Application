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
  onSubmit,
  submitButtonText,
}) => {
  return (
    <div
      className={`flex h-screen ${reverse ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* form section */}
      <div className="w-[60%] flex flex-1 flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-amber-500 text-4xl font-bold mb-6">{formTitle}</h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center  w-full max-w-sm gap-4"
        >
          {children}
          <button
            type="submit"
            className="text-white w-[200px] font-bold bg-amber-500  py-2 px-4 rounded-4xl "
          >
            {submitButtonText}
          </button>
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
          className="text-white w-[200px] font-bold bg-transparent border border-white py-2 p-4 mt-5 rounded-4xl  "
        >
          {sideButtonText}
        </button>
      </div>
    </div>
  );
};

export default AuthWrapper;
