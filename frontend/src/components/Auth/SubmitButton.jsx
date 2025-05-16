import React from "react";

const SubmitButton = ({ onClick, submitButtonText }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="text-white w-[200px] font-bold bg-amber-500  py-2 px-4 rounded-4xl"
    >
      {submitButtonText}
    </button>
  );
};

export default SubmitButton;
