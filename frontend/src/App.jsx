import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import ProductDetail from "./components/product detail/ProductDetail";
import EditProduct from "./pages/EditProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
            </>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <>
              <Navbar />
              <EditProduct />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
