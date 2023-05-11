import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ className, disabled, onClick, children }: Props) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      'px-2 py-1 border',
      'text-black bg-white hover:bg-neutral-10',
      'dark:border-gray-700 dark:text-white dark:bg-neutral-950 dark:hover:bg-neutral-900',
      { 'opacity-50 cursor-default': disabled },
      className,
    )}
  >
    {children}
  </button>
);

export default Button;
