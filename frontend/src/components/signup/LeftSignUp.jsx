import React from "react";
import "./signup.css";
import bgImage from "../../assets/signup/bg.png";

const LeftSignUp = () => {
  return (
    <div
      className="w-[40%]   flex flex-col items-center justify-center gap-6 bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-center">
        <h2 className="text-white font-bold text-3xl my-4">Welcome Back</h2>
        <h4 className="text-white text-center font-light w-70 text-lg">
          To keep connected with us please login with your personal info
        </h4>
      </div>
      <button className="signup-btn">SIGN IN</button>
    </div>
  );
};

export default LeftSignUp;
