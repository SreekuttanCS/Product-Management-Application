import { Heart } from "lucide-react";

const ProductActions = () => (
  <div className="flex justify-between items-center gap-4">
    <button className="bg-amber-500 hover:bg-amber-600 p-3 text-white w-40 rounded-2xl">
      Edit Product
    </button>
    <button className="bg-amber-500 hover:bg-amber-600 p-3 text-white w-40 rounded-2xl">
      Buy Now
    </button>
    <button aria-label="Add to wishlist">
      <Heart className="text-gray-700 hover:text-red-500" />
    </button>
  </div>
);

export default ProductActions;
