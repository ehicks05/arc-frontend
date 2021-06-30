import React from "react";

const Button = ({ className, disabled, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-1 py-0.5 border ${
        disabled && "opacity-50 cursor-default"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
