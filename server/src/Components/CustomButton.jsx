import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ onclick, button, Link, to }) => {
  return (
    <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... hover:bg-blue-400 text-white font-bold py-2 px-14 border-b-4 border-white hover:border-pink-500 rounded ">
      {onclick}
      {button}
      {Link}
      {to}
    </button>
  );
};

export default CustomButton;
