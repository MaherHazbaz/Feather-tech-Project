import React from "react";

const CustomButton = ({ onClick, button, Link, to }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... hover:bg-blue-400 text-white font-bold py-2 px-14 border-b-4 border-white hover:border-pink-500 rounded "
    >
      {button}
    </button>
  );
};

export default CustomButton;
