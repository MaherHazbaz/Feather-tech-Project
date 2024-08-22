import React from "react";
import { useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [empty, setEmpty] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <>
      <div>Todo</div>
      <div></div>
    </>
  );
};

export default Todo;
