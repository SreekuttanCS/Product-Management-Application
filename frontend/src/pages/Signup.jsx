import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../components/Auth/AuthWrapper";
import { Lock, Mail, User } from "lucide-react";
import InputField from "../components/Auth/InputField ";
import axios from "axios";
import SubmitButton from "../components/Auth/submitButton";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthWrapper
      reverse={true}
      sideTitle="Welcome Back!"
      sideText="  To keep connected with us please login with your personal info
"
      sideButtonText="SIGN IN"
      onSideButtonClick={() => navigate("/login")}
      formTitle="Create Account"
      submitButtonText="SIGN UP"
      onSubmit={handleSignup}
    >
      <InputField
        Icon={User}
        placeholder="Name"
        onChange={handleChange("name")}
      />
      <InputField
        Icon={Mail}
        placeholder="Email"
        onChange={handleChange("email")}
      />
      <InputField
        Icon={Lock}
        placeholder="Password"
        onChange={handleChange("password")}
        type="password"
      />
      <SubmitButton submitButtonText={"SIGN UP"} onClick={handleSignup} />
    </AuthWrapper>
  );
};

export default Signup;
