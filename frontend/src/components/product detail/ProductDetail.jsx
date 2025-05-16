import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductVariants from "./ProductVariants";
import ProductActions from "./ProductActions";
import ProductThumbnails from "./ProductThumbnails";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        setError("Product not found or failed to load.");
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (error)
    return <div className="text-red-600 text-center mt-6">{error}</div>;
  if (!product) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 py-5">
      <div className="flex flex-col items-center gap-4">
        <ProductImage image={product.image} name={product.name} />
        <ProductThumbnails image={product.image} />
      </div>

      <div className="flex flex-col gap-8 max-w-md">
        <ProductInfo name={product.name} variant={product.variants[0]} />
        <ProductVariants variants={product.variants} />
        <ProductActions />
      </div>
    </div>
  );
};

export default ProductDetail;
