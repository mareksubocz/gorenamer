import React from "react";

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      <span
        className="absolute z-10 invisible opacity-0 bg-gray-800 text-white text-sm rounded-md py-1 px-2 transition-opacity duration-300
                   bottom-full left-1/2 transform -translate-x-1/2 mb-2
                   group-hover:visible group-hover:opacity-100"
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
