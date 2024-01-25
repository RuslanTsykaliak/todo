// components/Edit.tsx

'use client'

import { useState } from "react";
import toast from "react-hot-toast";

import { Todo } from "@/lib/types";
import { Button } from "./ui/button";
import { useTodos } from './TodosContext';

interface EditProps {
  todo: Todo;
  onEditSuccess: (updatedTodo: Todo) => void;
}

const Edit: React.FC<EditProps> = ({ todo, onEditSuccess }) => {
  const { todos, setTodos } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleEdit = async () => {
    const priorityAsInt = parseInt(editedPriority, 10);

    try {
      const response = await fetch("/api/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          title: editedTitle,
          description: editedDescription,
          priority: priorityAsInt,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onEditSuccess(updatedTodo);
        setIsEditing(false);
        toast.success("Todo updated successfully");
      } else {
        console.error("Failed to update todo:", response.status);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-blue-500 hover:underline dark:text-blue-300 dark:hover:text-blue-400"
        onClick={() => setIsEditing(!isEditing)}
      >
        Edit
      </button>

      {isEditing && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 p-4 rounded shadow-md min-w-1/4 max-w-3/4 z-50 overflow-auto"
        >
          <label htmlFor={`editedTitle-${todo.id}`} className="text-black dark:text-white">Title:</label>
          <input
            type="text"
            id={`editedTitle-${todo.id}`}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border border-gray-300 p-1 mb-2 dark:bg-gray-700 dark:text-white"
          />

          <label htmlFor={`editedDescription-${todo.id}`} className="text-black dark:text-white">Description:</label>
          <textarea
            id={`editedDescription-${todo.id}`}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border border-gray-300 p-1 mb-2 dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-4 text-black dark:text-white">
            Priority:
            <select
              name="priority"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {[...Array(10).keys()].map((number) => (
                <option key={number + 1} value={number + 1}>
                  {number + 1}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between">
            <Button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Close
            </Button>

            <Button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
