const ProductImage = ({ image, name }) => (
  <div className="w-[500px] h-[400px] flex justify-center items-center border rounded-2xl border-gray-400">
    <img
      src={image}
      alt={name}
      className="w-[300px] h-[300px] object-contain"
    />
  </div>
);

export default ProductImage;
