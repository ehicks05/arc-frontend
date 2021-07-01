import React from "react";

const Button = ({ className, disabled, onClick, children }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-1 py-0.5 border
      dark:border-gray-600
      text-black bg-white
      dark:text-white dark:bg-black
      hover:bg-gray-100
      dark:hover:bg-gray-900
      ${disabled && "opacity-50 cursor-default"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
