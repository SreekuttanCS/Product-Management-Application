import React, { useEffect, useState, useCallback } from "react";
import WishListFetch from "../api/WishListFetch";
import { ChevronRight, X } from "lucide-react"; // Added X icon for remove
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlist,
  setWishlistItems,
  removeFromWishlist,
} from "../../redux/wishlistSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const { isWishList, items: wishlist } = useSelector(
    (state) => state.wishlist
  );
  const [loading, setLoading] = useState(true);

  const handleWishList = useCallback(() => {
    dispatch(toggleWishlist());
  }, [dispatch]);

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item));
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await WishListFetch();
        dispatch(setWishlistItems(data || []));
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [dispatch]);

  if (!isWishList) return null;

  return (
    <div className="absolute z-10 right-0 top-0 bg-white p-4 shadow-lg w-80 h-[400px] overflow-y-auto">
      <div className="flex justify-between border-b">
        <h2 className="text-xl font-semibold pb-2 mb-4">Wish List</h2>
        <span
          onClick={handleWishList}
          className="cursor-pointer"
          aria-label="Close wishlist"
        >
          <ChevronRight />
        </span>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map((product) => (
          <div
            key={product._id}
            className="mb-4 border p-2 rounded flex items-center justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => (e.target.src = "/placeholder.png")}
              className="w-16 h-16 object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-gray-600 text-sm">
                ${product.variants[0]?.price ?? "N/A"}
              </p>
            </div>
            <button
              onClick={() => handleRemove(product)}
              className="ml-2 text-red-500 hover:text-red-700"
              aria-label="Remove from wishlist"
            >
              <X size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WishList;
