import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`}>
    <div className="h-[250px] w-[300px] border border-gray-400 p-4 rounded shadow">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-[100px] w-[100px]"
        />
      </div>
      <h3 className="font-semibold text-[#003F62] text-xl">{product.name}</h3>
      <div className="text-gray-600 font-semibold my-2 text-md">
        ${product.variants[0]?.price ?? "N/A"}
      </div>
      <div className="flex ">
        <Star size={20} strokeWidth={2.25} color="gray" fill="none" />
        <Star size={20} strokeWidth={2.25} color="gray" />
        <Star size={20} strokeWidth={2.25} color="gray" />
        <Star size={20} strokeWidth={2.25} color="gray" />
        <Star size={20} strokeWidth={2.25} color="gray" />
      </div>
    </div>
  </Link>
);

export default ProductCard;
