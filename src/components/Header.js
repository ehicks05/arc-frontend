import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ title, titleClass, showSettings, setShowSettings }) => {
  return (
    <header className="flex p-4 justify-between">
      <Link to="/">{title}</Link>
      <div role="button" onClick={() => setShowSettings(!showSettings)}>
        {showSettings ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default React.memo(Header);
