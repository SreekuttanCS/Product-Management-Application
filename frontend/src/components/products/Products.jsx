import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const Products = ({ selectedSubs, search }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  useEffect(() => setPage(1), [selectedSubs, search]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const subcategoriesQuery =
        selectedSubs.length > 0
          ? `&subcategories=${selectedSubs.join(",")}`
          : "";
      const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";

      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?page=${page}&limit=${limit}${searchQuery}${subcategoriesQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(res.data.products || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
        setTotal(0);
      }
    };

    fetchProducts();
  }, [selectedSubs, page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default Products;
