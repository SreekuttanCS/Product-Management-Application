const ProductVariants = ({ variants }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <h3 className="font-semibold">RAM:</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map(({ _id, ram }) => (
          <span key={_id} className="border px-3 py-1 rounded-md bg-gray-100">
            {ram}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-3">
      <h3 className="font-semibold">Quantity:</h3>
      <div className="flex items-center gap-2 border px-3 py-1 rounded-md">
        <button className="font-bold text-lg">-</button>
        <span className="px-2">0</span>
        <button className="font-bold text-lg">+</button>
      </div>
    </div>
  </div>
);

export default ProductVariants;
