import React from "react";

type InputProps = {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  required = false,
  value,
  onChange,
  error
}) => {
  return (
    <div>
      <label className="block text-gray-300 font-normal text-xs mb-1">
        {label} {required && <span>*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`border rounded-xl px-3 py-2 focus:outline-none w-full h-12 ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;