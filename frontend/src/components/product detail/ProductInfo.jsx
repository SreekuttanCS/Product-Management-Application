const ProductInfo = ({ name, variant }) => (
  <div className="px-3 flex flex-col gap-2">
    <h2 className="text-[#003F62] font-medium text-2xl">{name}</h2>
    <h3 className="text-xl font-semibold">${variant?.price}</h3>
    <h3>
      Availability:
      <span
        className={variant?.quantity > 0 ? "text-green-700" : "text-red-600"}
      >
        {variant?.quantity > 0 ? " In Stock" : " Out of Stock"}
      </span>
    </h3>
    {variant?.quantity > 30 && (
      <p className="text-gray-500 text-sm">
        Hurry up! Only {variant.quantity} left in stock
      </p>
    )}
  </div>
);

export default ProductInfo;
