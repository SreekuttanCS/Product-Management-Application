const ProductThumbnails = ({ image }) => (
  <div className="flex gap-4 mt-6 ml-6">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="border border-gray-400 rounded-2xl overflow-hidden w-40 h-40 flex justify-center items-center"
      >
        <img
          src={image}
          alt={`Thumbnail ${i}`}
          className="object-cover w-full h-full"
        />
      </div>
    ))}
  </div>
);

export default ProductThumbnails;
