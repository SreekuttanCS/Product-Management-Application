import React from "react";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default FormInput;
