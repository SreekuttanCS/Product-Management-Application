import React, { useState, useEffect } from "react";
import axios from "axios";
import FormFields from "../add product/FormFields";
import FormHeader from "../add product/FormHeader";
import ProductVariants from "../add product/ProductVariants";
import ProductImageUpload from "../add product/ProductImageUpload";
import CategorySelector from "../add product/CategorySelector";
import FormButtons from "../add product/FormButtons";

const AddProduct = ({ onDiscard }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subCategory: "",
    ram: "",
    price: "",
    qty: 1,
    image: null,
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subcategories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variants = [
      { ram: formData.ram, price: formData.price, quantity: formData.qty },
    ];

    if (
      !formData.title ||
      !formData.price ||
      !formData.ram ||
      !formData.image ||
      !formData.category ||
      !formData.subCategory
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const body = new FormData();
    body.append("name", formData.title);
    body.append("description", formData.description);
    body.append("category", formData.category);
    body.append("subCategory", formData.subCategory);
    body.append("variants", JSON.stringify(variants));
    body.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/products/", body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDiscard = () => {
    setFormData({
      title: "",
      description: "",
      subCategory: "",
      ram: "",
      price: "",
      qty: 1,
      image: null,
      category: "",
    });
    onDiscard();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg shadow-md flex flex-col gap-6"
    >
      <FormHeader />

      <FormFields
        label="Product Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required={true}
        placeholder="Enter product title"
      />

      <FormFields
        label="Description"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required={false}
        placeholder="Enter description"
      />

      <ProductVariants formData={formData} handleChange={handleChange} />

      <ProductImageUpload onChange={handleChange} />

      <CategorySelector
        categories={categories}
        subCategories={subCategories}
        formData={formData}
        onChange={handleChange}
      />

      <FormButtons onSubmit={handleSubmit} onDiscard={handleDiscard} />
    </form>
  );
};

export default AddProduct;
