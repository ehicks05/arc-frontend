import { ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}

const Card = ({ children }: Props) => (
  <div className="flex flex-col gap-4 items-center px-4 py-16 m-4 max-w-screen-md w-full mx-auto rounded dark:bg-neutral-800">
    {children}
  </div>
);

export default Card;
