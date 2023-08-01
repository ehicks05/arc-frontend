import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ className, disabled, onClick, children }: Props) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      'px-3 py-1.5 border',
      'text-black bg-white',
      'dark:border-gray-800 dark:text-white dark:bg-neutral-950',
      { 'opacity-50 cursor-default': disabled },
      { 'hover:bg-neutral-100 dark:hover:bg-neutral-900': !disabled },
      className,
    )}
  >
    {children}
  </button>
);

export default Button;
