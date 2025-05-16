import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../components/Auth/AuthWrapper";
import { Lock, Mail } from "lucide-react";
import InputField from "../components/Auth/InputField ";
import axios from "axios";
import SubmitButton from "../components/Auth/submitButton";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthWrapper
      reverse={false}
      sideTitle="Hello Friend!"
      sideText="Enter your personal details and start your journey with us"
      sideButtonText="SIGN UP"
      onSideButtonClick={() => navigate("/signup")}
      formTitle="Sign In"
      submitButtonText="SIGN IN"
      onSubmit={handleLogin}
    >
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
      <SubmitButton submitButtonText={"SIGN UP"} onClick={handleLogin} />
    </AuthWrapper>
  );
};

export default Login;
