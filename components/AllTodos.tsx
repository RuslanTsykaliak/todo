'use client'
// client/components/AllTodos.tsx
import React, { useState, useEffect } from "react";
import { Todo } from "@lib/types"

const AllTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("api/getalltodos");
        console.log("Server Response:", response); // Log the response
        const allTodos = await response.json();
        setTodos(allTodos.data); // Assuming the todos are nested under the "data" property
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    // Call the fetchTodos function here
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold">{todo.title}</h2>
              <span
                className={`text-${todo.completed ? 'green' : 'red'}-500 font-bold`}
              >
                {todo.completed ? 'Completed' : 'Incomplete'}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{todo.description}</p>
            <div className="flex justify-between">
              <p className={`text-${todo.priority}-500 font-bold`}>
                Priority: {todo.priority}
              </p>
              <button className="text-blue-500 hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default AllTodos;
