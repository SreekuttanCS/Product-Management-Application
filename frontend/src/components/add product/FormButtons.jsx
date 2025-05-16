import React from "react";

const FormButtons = ({ onSubmit, onDiscard }) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <button
        type="submit"
        onClick={onSubmit}
        className="bg-amber-500 text-white px-6 py-2 rounded-2xl hover:bg-amber-600"
      >
        Add Product
      </button>
      <button
        type="button"
        onClick={onDiscard}
        className="text-gray-600 hover:underline"
      >
        Discard
      </button>
    </div>
  );
};

export default FormButtons;
