import React from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  loading: boolean;
  error: any;
}
const Loading = ({ loading, error }: Props) => {
  if (error) {
    return <span>Error: {JSON.stringify(error, null, 2)}</span>;
  }

      return (
      <div className="flex items-center justify-center flex-grow">
        <TailSpin color="rgb(16 178 121)" />
      </div>
    );
};

export default Loading;
