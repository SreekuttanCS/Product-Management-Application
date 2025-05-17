import React from "react";

const FormFields = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="flex justify-around">
    <label htmlFor={name} className="font-semibold">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="p-2 border rounded-md w-100"
    />
  </div>
);

export default FormFields;
