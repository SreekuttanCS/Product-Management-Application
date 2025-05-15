import React from "react";

const InputField = ({ Icon, placeholder, type = "text" }) => {
  return (
    <div className="flex items-center text-gray-600 p-2 rounded mb-4">
      <Icon className="mr-2" color="gray" />
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none text-gray-600 w-full font-bold"
      />
    </div>
  );
};

export default InputField;
