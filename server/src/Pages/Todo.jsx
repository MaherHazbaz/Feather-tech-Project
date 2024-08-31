import React, { useEffect, useState } from "react";
import axios from "axios";

import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";

const Index = () => {
  const [todo, setTodo] = useState("");
  const [empty, setEmp] = useState("");
  const [editId, setEditId] = useState(null); // Track the ID of the item being edited
  const [editText, setEditText] = useState(""); // Track the new text for the item being edited
  const [todos, setTodos] = useState([]);

  const base_url = "https://api.maher.life";

  const handleTodo = async () => {
    try {
      if (todo.length !== 0) {
        await axios.post(`${base_url}`, { todo });
        window.location.reload();
      } else {
        const emp = "Don't leave the text field empty";
        setEmp(emp);
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
    setEditId(data._id);
    setEditText(data.todo);
  };

  const handleUpdate = async (data) => {
    try {
      await axios.put(`${base_url}`, { id: data._id, todo: editText });
      setEditId(null);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (data) => {
    try {
      await axios.delete(`${base_url}/${data._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-6xl font-thin mb-6">To Do List</h1> <br />
      <div className="flex space-x-2 mb-6   ">
        <CustomInput
          type="text"
          value={todo}
          placeholder={empty || "Add a new task"}
          onChange={(e) => setTodo(e.target.value)}
        />
        <CustomButton button={"Add"} onClick={handleTodo} />
      </div>
      <div className="w-full max-w-md space-y-4">
        {todos?.map((data) => (
          <div
            key={data._id}
            className="grid grid-flow-col justify-between items-center  "
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
                  button={"Update"}
                  onClick={() => handleUpdate(data)}
                />
              ) : (
                <>
                  <div className=" grid grid-flow-col space-x-2">
                    <CustomButton
                      button={"Edit"}
                      onClick={() => handleEdit(data)}
                    />
                    <CustomButton
                      button={"Delete"}
                      onClick={() => handleDelete(data)}
                    />
                  </div>
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
