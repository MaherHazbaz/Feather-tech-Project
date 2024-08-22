import React from "react";
import CustomButton from "../Components/CustomButton";
import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <>
      <div className="w-screen  justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...  h-screen space-x-5 grid sm:grid-rows-1 md:grid-rows-3">
        <div className="text-white font-light text-7xl shadow-2xl rounded-sm px-8 py-3 ">
          <h1>Welcome </h1>
          <h2 className="text-xl px-7">To Do List</h2>
        </div>
        <div></div>
        <div className="px-12 animate-bounce">
          <Link to={"/todo"}>
            <CustomButton button={"Get Started"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
