import React, { useEffect, useState } from "react";
import axios from "axios";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const Index = () => {
  const [todo, setTodo] = useState("");
  const [empty, setEmp] = useState("");
  const [editId, setEditId] = useState(null); // Track the ID of the item being edited
  const [editText, setEditText] = useState(""); // Track the new text for the item being edited
  const [todos, setTodos] = useState([]);

  const base_url = "http://localhost:5176";

  const handleTodo = async () => {
    try {
      if (todo.length !== 0) {
        const response = await axios.post(`${base_url}`, { todo });
        setTodos([...todos, response.data.data]); // Add the new todo to the state
        setTodo(""); // Clear the input field after adding a todo
        setEmp(""); // Clear the empty state
      } else {
        setEmp("Don't leave the text field empty");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const reg_todo = await axios.get(`${base_url}`);
        setTodos(reg_todo?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const handleEdit = (data) => {
    setEditId(data._id); // Set the ID of the item being edited
    setEditText(data.todo); // Set the current text of the item in the edit state
  };

  const handleUpdate = async (data) => {
    try {
      await axios.put(`${base_url}`, { id: data._id, todo: editText });
      setTodos(
        todos.map((todo) =>
          todo._id === data._id ? { ...todo, todo: editText } : todo
        )
      ); // Update the todo in the state
      setEditId(null); // Clear the edit state after updating
      setEditText(""); // Clear the edit text field
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (data) => {
    try {
      await axios.delete(`${base_url}/${data._id}`);
      setTodos(todos.filter((todo) => todo._id !== data._id)); // Remove the deleted todo from the state
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-6xl font-thin mb-6">To Do List</h1> <br />
      <div className="flex space-x-2 mb-6 ">
        <CustomInput
          type="text"
          value={todo}
          placeholder={empty || "Add a new task"} // If empty state is set, it will be displayed in red
          onChange={(e) => setTodo(e.target.value)}
        />
        <CustomButton
          button="Add"
          onClick={handleTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        />
      </div>
      <div className="w-full max-w-md space-y-4">
        {todos?.map((data) => (
          <div
            key={data._id}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
          >
            {editId === data._id ? (
              <CustomInput
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <h1 className="text-xl font-medium">{data.todo}</h1>
            )}
            <div className="flex space-x-2">
              {editId === data._id ? (
                <CustomButton
                  button="Update"
                  onClick={() => handleUpdate(data)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                />
              ) : (
                <>
                  <CustomButton
                    button="Edit"
                    onClick={() => handleEdit(data)}
                    className="bg-yellow-400 text-white py-1 px-3 rounded"
                  />
                  <CustomButton
                    button="Delete"
                    onClick={() => handleDelete(data)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
