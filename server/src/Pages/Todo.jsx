import React, { useState, useEffect } from "react";
import CustomButton from "../Components/CustomButton";
import CustomInput from "../Components/CustomInput";
import axios from "axios";

function App() {
  const baseUrl = "http://localhost:3000/user";
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(baseUrl);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const res = await axios.post(baseUrl, { name: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`${baseUrl}/${todoId}`, { name: updateTodo });
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, name: updateTodo } : todo
        )
      );
      setUpdateTodo("");
      setTodoId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid justify-center items-center space-y-7 grid-rows-4">
      <h1 className="text-5xl font-thin">To-Do List</h1>
      <div className="grid grid-cols-2 space-x-5">
        <CustomInput
          type="text"
          value={newTodo}
          label={"Add a new task"}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <CustomButton button={"Add"} onClick={handleAddTodo} />
      </div>
      <div className="grid grid-cols-2 space-x-5">
        <CustomInput
          type="text"
          value={updateTodo}
          label="Update task"
          onChange={(e) => setUpdateTodo(e.target.value)}
        />

        <CustomButton button={"Update"} onClick={handleUpdateTodo} />
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.name}
            <button
              onClick={() => {
                setUpdateTodo(todo.name);
                setTodoId(todo._id);
              }}
            >
              Update
            </button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
