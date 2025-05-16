import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormFields from "../components/add product/FormFields";
import FormHeader from "../components/add product/FormHeader";
import ProductVariants from "../components/add product/ProductVariants";
import ProductImageUpload from "../components/add product/ProductImageUpload";
import CategorySelector from "../components/add product/CategorySelector";
import FormButtons from "../components/add product/FormButtons";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const product = res.data.product;
        setFormData({
          title: product.name || "",
          description: product.description || "",
          category: product.category?._id || "",
          subCategory: product.subCategory?._id || "",
          ram: product.variants?.[0]?.ram || "",
          price: product.variants?.[0]?.price || "",
          qty: product.variants?.[0]?.quantity || 1,
          image: null, // image upload will be handled separately
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

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
    if (formData.image) {
      body.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate(`/products/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg shadow-md flex flex-col gap-6"
    >
      <FormHeader>Edit Product</FormHeader>

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

export default EditProduct;
