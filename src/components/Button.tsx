import React from "react";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const Button = ({ className, disabled, onClick, children }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-2 py-1 border
      dark:border-gray-700
      text-black bg-white
      dark:text-white dark:bg-neutral-950
      hover:bg-neutral-100
      dark:hover:bg-neutral-900
      ${disabled && "opacity-50 cursor-default"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
