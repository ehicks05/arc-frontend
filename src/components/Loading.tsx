import React from 'react';
import { TbMoodSad } from 'react-icons/tb';
import { TailSpin } from 'react-loader-spinner';

interface Props {
  error?: any;
}
const Loading = ({ error }: Props) => {
  if (error) {
    const message =
      'message' in error ? error.message : JSON.stringify(error, null, 2);
    return (
      <div className="flex flex-col gap-4 items-center px-4 py-16 m-4 max-w-screen-md w-full mx-auto rounded dark:bg-neutral-800">
        <div className="text-center text-3xl">Something went wrong.</div>
        <div className="text-center text-xl">{message}</div>
        <TbMoodSad size={128} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-grow">
      <TailSpin color="rgb(16 178 121)" />
    </div>
  );
};

export default Loading;
