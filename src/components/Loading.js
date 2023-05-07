import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <TailSpin color="rgb(16 178 121)" />
      </div>
    );
  }

  if (error) {
    return <span>Error: {JSON.stringify(error, null, 2)}</span>;
  }
};

export default Loading;
