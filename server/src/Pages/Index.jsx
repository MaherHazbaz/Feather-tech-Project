import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "./Todo";
import Welcome from "./Welcome";

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  );
};

export default index;
