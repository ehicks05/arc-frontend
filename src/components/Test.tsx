import React, { useState } from "react";
import AuthDialog from "./AuthDialog";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>toggle</button>

      <AuthDialog isOpen={isOpen} hideModal={() => setIsOpen(false)} />
    </div>
  );
};

export default Test;
