import React from "react";
import { Lock, Mail, User } from "lucide-react";
import InputField from "./InputField ";

const RightSignup = () => {
  return (
    <div className="w-[60%]  flex flex-col items-center justify-center">
      <div>
        <h2 className="text-amber-500 font-bold text-3xl my-4">
          Create Account
        </h2>
        <div className="w-full ">
          <InputField Icon={User} placeholder="Name" />
          <InputField Icon={Mail} placeholder="Email" />
          <InputField Icon={Lock} placeholder="Password" type="password" />
          <button className="signup-btn bg-amber-500 font-bold">SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default RightSignup;
