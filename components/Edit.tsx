// components/Edit.tsx

'use client'

import { useState } from "react";

import { Todo } from "@/lib/types";

interface EditProps {
  todo: Todo;
  onEditSuccess: (updatedTodo: Todo) => void;
}

const Edit: React.FC<EditProps> = ({ todo, onEditSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEdit = async () => {
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
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onEditSuccess(updatedTodo);
        setIsEditing(false);
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
        className="text-blue-500 hover:underline"
        onClick={() => setIsEditing(!isEditing)}
      >
        Edit
      </button>

      {isEditing && (
        <div className="absolute top-0 right-0 mt-2 bg-white border border-gray-300 p-2 rounded shadow-md">
          <label htmlFor={`editedTitle-${todo.id}`}>Title:</label>
          <input
            type="text"
            id={`editedTitle-${todo.id}`}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border border-gray-300 p-1 mb-2"
          />

          <label htmlFor={`editedDescription-${todo.id}`}>Description:</label>
          <textarea
            id={`editedDescription-${todo.id}`}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border border-gray-300 p-1 mb-2"
          />

          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;
