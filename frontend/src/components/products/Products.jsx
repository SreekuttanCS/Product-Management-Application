import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = ({ selectedSubs }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6; // products per page

  useEffect(() => {
    setPage(1);
  }, [selectedSubs]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const subcategoriesQuery =
        selectedSubs.length > 0
          ? `&subcategories=${selectedSubs.join(",")}`
          : "";

      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?page=${page}&limit=${limit}${subcategoriesQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedProducts = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(fetchedProducts);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
        setTotal(0);
      }
    };

    fetchProducts();
  }, [selectedSubs, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {!Array.isArray(products) || products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {products.map((product) => (
              <Link to={`/product/${product._id}`}>
                <div
                  key={product._id}
                  className="h-[250px] w-[300px] border border-gray-400 p-4 rounded shadow"
                >
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[100px] w-[100px]"
                    />
                  </div>
                  <h3 className="font-semibold text-[#003F62] text-xl">
                    {product.name}
                  </h3>
                  <div className="text-gray-600 font-semibold my-2 text-md">
                    ${product.variants[0]?.price ?? "N/A"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            {/* Previous Button */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    pageNum === page
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
