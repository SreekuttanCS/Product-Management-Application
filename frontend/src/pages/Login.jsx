import React from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../components/Auth/AuthWrapper";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // login logic here
  };

  return (
    <AuthWrapper
      reverse={false} // Show side panel first
      sideTitle="Hello Friend!"
      sideText="Enter your personal details and start your journey with us"
      sideButtonText="SIGN UP"
      onSideButtonClick={() => navigate("/signup")}
      formTitle="Sign In"
      submitButtonText="SIGN IN"
      onSubmit={handleLogin}
    >
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
    </AuthWrapper>
  );
};

export default Login;
