import React from "react";
import LeftSignUp from "../components/signup/LeftSignUp";
import RightSignup from "../components/signup/RightSignup";

const Signup = () => {
  return (
    <div className="flex h-screen">
      <LeftSignUp />
      <RightSignup />
    </div>
  );
};

export default Signup;
