// components/RemoveTodos.tsx

import toast from "react-hot-toast";

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
        toast.success("Todo removed successfully");
        onRemoveSuccess();

      } else {
        const errorData = await response.json();
        toast.error(`Failed to remove todo: ${errorData.message}`);
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
