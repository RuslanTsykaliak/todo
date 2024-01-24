'use client'

//components/AllTodos.tsx

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { Todo } from "@/lib/types"
import RemoveTodos from './RemoveTodos';
import SearchComponent from "./SearchComponent";
import Completed from "./Completed";
import Filter from "./Filter";
import Edit from "./Edit";

const AllTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("api/getalltodos");
        console.log("Server Response:", response);

        const allTodos = await response.json();
        setTodos(allTodos.data || []);
        setFilteredTodos(allTodos.data || []); // Initialize filteredTodos with all todos
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);  // Empty dependency array to run the effect only once when the component is mounts 

  const handleRemoveSuccess = (removedTodoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== removedTodoId));
    setFilteredTodos((prevFilteredTodos) =>
      prevFilteredTodos.filter((todo) => todo.id !== removedTodoId)
    );
  };

  const handleSearch = (filteredTodos: Todo[]) => {
    setFilteredTodos(filteredTodos);
    setIsSearching(true);
  };

  const handleFilterChange = useCallback((filter: string | number) => {
    switch (filter) {
      case "done":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "undone":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
        case "priority-high":
          setFilteredTodos([...todos].sort((a, b) => (b as any).priority - (a as any).priority));
          break;
        case "priority-low":
          setFilteredTodos([...todos].sort((a, b) => (a as any).priority - (b as any).priority));
          break;
        break;
      case "newest":
        setFilteredTodos([...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        break;
      case "oldest":
        setFilteredTodos([...todos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [todos]);

  const handleEditSuccess = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
    setFilteredTodos((prevFilteredTodos) =>
      prevFilteredTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      <Filter onFilterChange={handleFilterChange} />

      <SearchComponent
        todos={todos}
        onSearch={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {((isSearching ? filteredTodos : todos) || []).map((todo) => (
          <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold">{todo.title}</h2>

              <Completed
                todoId={todo.id}
                completed={todo.completed}
                onToggleCompletion={(newCompletionStatus) => {
                  setTodos((prevTodos) =>
                    prevTodos.map((t) => (t.id === todo.id ? { ...t, completed: newCompletionStatus } : t))
                  );
                }}
              />

            </div>
            <p className="text-gray-700 mb-2">{todo.description}</p>
            <div className="flex justify-between items-end ">
              <p className={`text-${todo.priority}-500 font-bold`}>
                Priority: {todo.priority}
              </p>
              <div className="flex space-x-4">

                <div className="text-blue-500 hover:underline">
                    <Edit 
                    todo={todo} 
                    onEditSuccess={handleEditSuccess} 
                    />
                </div>

                <RemoveTodos
                  todo={todo}
                  onRemoveSuccess={() => handleRemoveSuccess(todo.id)}
                />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTodos;
