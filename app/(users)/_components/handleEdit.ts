// components/handleEdit.ts

import toast from 'react-hot-toast';

import { Todo } from '@prisma/client';

export const handleEdit = async (id: number, title: string, description: string, priority: number, userId: string, setIsEditing: (isEditing: boolean) => void, setTodos: (todos: Todo[]) => void) => {
  try {
    const response = await fetch('/api/yourtodos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, description, priority, userId})
    });

    if (!response.ok) {
      throw new Error('Response is not OK');
    }

    const updatedTodosResponse = await fetch('/api/yourtodos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'userId': userId
      },
    });
    const updatedTodos = await updatedTodosResponse.json();
    setTodos(updatedTodos);

    toast.success('Todo updated successfully');
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating todo:', error);
    toast.error('Failed to update todo');
  }
};