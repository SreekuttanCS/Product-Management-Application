import { Heart } from "lucide-react";

const WishListIcon = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Heart className="text-gray-700 hover:text-red-500" />
    </button>
  );
};

export default WishListIcon;
