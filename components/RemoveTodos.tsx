// components/RemoveTodos.tsx

import { Todo } from "@/lib/types";

interface RemoveTodosProps {
  todo: Todo;
  onRemoveSuccess: () => void;
}

const RemoveTodos: React.FC<RemoveTodosProps> = (
  { todo, onRemoveSuccess }
) => {
  const handleRemoveClick = async (id: number) => {
    try {
      const response = await fetch(`/api/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Successful, update your state or UI accordingly
        console.log("Todo removed successfully");
        onRemoveSuccess(); // Invoke the callback
        
      } else {
        // Failed, handle the error
        const errorData = await response.json();
        console.error(`Failed to remove todo: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while removing todo:", error);
    }
  };

  return (
    <div>
      <button
        className="text-red-500 hover:underline"
        onClick={() => handleRemoveClick(todo.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default RemoveTodos;
