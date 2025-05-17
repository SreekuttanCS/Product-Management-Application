import React from "react";

const ProductVariants = ({ variantInputs, setVariantInputs }) => {
  const handleAttributeChange = (index, key, value) => {
    const updated = [...variantInputs];
    updated[index].attributes[key] = value;
    setVariantInputs(updated);
  };

  const handleKeyChange = (index, oldKey, newKey) => {
    const updated = [...variantInputs];
    const value = updated[index].attributes[oldKey];
    delete updated[index].attributes[oldKey];
    updated[index].attributes[newKey] = value;
    setVariantInputs(updated);
  };

  const handlePriceQtyChange = (index, field, value) => {
    const updated = [...variantInputs];
    updated[index][field] = value;
    setVariantInputs(updated);
  };

  const addAttributeField = (index) => {
    const updated = [...variantInputs];
    updated[index].attributes[""] = "";
    setVariantInputs(updated);
  };

  const addVariant = () => {
    setVariantInputs([
      ...variantInputs,
      { attributes: {}, price: "", quantity: "" },
    ]);
  };

  const removeVariant = (index) => {
    const updated = [...variantInputs];
    updated.splice(index, 1);
    setVariantInputs(updated);
  };

  return (
    <div className="">
      {variantInputs.map((variant, index) => (
        <div key={index} className="p-4  rounded shadow-sm">
          <h4 className="font-semibold mb-2">Variant {index + 1}</h4>

          {Object.entries(variant.attributes).map(([key, value], i) => (
            <div className="" key={i}>
              <input
                type="text"
                value={key}
                onChange={(e) => handleKeyChange(index, key, e.target.value)}
                placeholder="Attribute name"
                className="border p-2 rounded w-1/2"
              />
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  handleAttributeChange(index, key, e.target.value)
                }
                placeholder="Attribute value"
                className="border p-2 rounded w-1/2"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => addAttributeField(index)}
            className="text-blue-600 text-sm mb-2 "
          >
            + Add Attribute
          </button>

          <input
            type="number"
            name="price"
            value={variant.price}
            placeholder="Price"
            onChange={(e) =>
              handlePriceQtyChange(index, "price", e.target.value)
            }
            className="border p-2 rounded w-full mb-1"
          />
          <input
            type="number"
            name="quantity"
            value={variant.quantity}
            placeholder="Quantity"
            onChange={(e) =>
              handlePriceQtyChange(index, "quantity", e.target.value)
            }
            className="border p-2 rounded w-full mb-2"
          />

          <button
            type="button"
            onClick={() => removeVariant(index)}
            className="text-red-600 text-sm"
          >
            Remove Variant
          </button>
        </div>
      ))}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={addVariant}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          + Add Variant
        </button>
      </div>
    </div>
  );
};

export default ProductVariants;
