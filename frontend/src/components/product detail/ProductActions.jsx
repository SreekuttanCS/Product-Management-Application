import { useDispatch } from "react-redux";
import axios from "axios";
import WishListIcon from "../wishlist/WishListIcon";
import { addToWishlist, toggleWishlist } from "../../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";

const ProductActions = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddWish = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/wishlist/${productId}`,
        {}, // No body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(addToWishlist(response.data));
      dispatch(toggleWishlist());
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={handleEdit}
        className="bg-amber-500 hover:bg-amber-600 p-3 text-white w-40 rounded-2xl"
      >
        Edit Product
      </button>
      <button className="bg-amber-500 hover:bg-amber-600 p-3 text-white w-40 rounded-2xl">
        Buy Now
      </button>
      <WishListIcon onClick={handleAddWish} />
    </div>
  );
};

export default ProductActions;
  