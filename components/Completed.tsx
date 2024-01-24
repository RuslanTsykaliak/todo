// components/Completed.tsx

import React, { useState } from 'react';

interface CompletedProps {
  todoId: number;
  completed: boolean;
  onToggleCompletion: (completed: boolean) => void;
}

const Completed: React.FC<CompletedProps> = ({ todoId, completed, onToggleCompletion }) => {
  const [loading, setLoading] = useState(false);

  const toggleCompletion = async (newCompletionStatus: boolean) => {
    try {
      const response = await fetch(`/api/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todoId, completed: newCompletionStatus }),
      });

      if (response.ok) {
        onToggleCompletion(newCompletionStatus);
      } else {
        console.error('Failed to update completion status');
      }
    } catch (error) {
      console.error('Error updating completion status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`text-white fodnt-bol py-2 px-4 rounded ${
        !completed ? 
        'bg-red-500'
        : 
        'bg-green-500' 
      }`}
      onClick={() => toggleCompletion(!completed)}
      disabled={loading}
    >
      {loading ? 'Updating...' : !completed ? 'Incomplete' : 'Completed'}
    </button>
  );
};

export default Completed;
