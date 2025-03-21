import React from "react";

type InputProps = {
  label?: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ label, type = "text", error, ...rest }) => {
  return (
    <div>
      {label &&
        <label className="block text-gray-300 font-normal text-xs mb-1">
          {label} {rest.required && <span>*</span>}
        </label>
      }
      <div className="relative">
        <input
          type={type}
          className={`border rounded-xl px-3 py-2 focus:outline-none w-full h-12 ${error ? "border-red-500" : "border-gray-300"}`}
          {...rest}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;