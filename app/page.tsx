
'use client'


import { useState, useEffect, useCallback } from "react";

import { Todo } from "@/lib/types"
import RemoveTodos from "@/components/RemoveTodos";
import Search from "@/components/Search";
import Completed from "@/components/Completed";
import Filter from "@/components/Filter";
import Edit from "@/components/Edit";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [removedTodos, setRemovedTodos] = useState<number[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [editedTodos, setEditedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/getalltodos");
        const allTodos = await response.json();

        const updatedTodos = allTodos.data.map((todo: Todo) => {
          const editedTodo = editedTodos.find((edited: Todo) => edited.id === todo.id);
          return editedTodo || todo;
        });

        updatedTodos.sort((a: Todo, b: Todo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos);

        handleFilterChange("newest");
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();

  }, [editedTodos]);


  const handleRemoveSuccess = (removedTodoId: number) => {
    setRemovedTodos((prevRemovedTodos) => [...prevRemovedTodos, removedTodoId]);
    setFilteredTodos((prevFilteredTodos) =>
      prevFilteredTodos.filter((todo) => todo.id !== removedTodoId)
    );
  };

  const displayedTodos = isSearching ? filteredTodos : todos.filter((todo) => !removedTodos.includes(todo.id));


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

  const handleEditSuccess = (editedTodo: Todo) => {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === editedTodo.id);
      if (index === -1) {
        return [...prevTodos, editedTodo];
      }
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = editedTodo;

      return updatedTodos;
    });
  };



  return (
    <main className="flex flex-col items-center px-4">
      <div className="container mx-auto my-4 p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white bg-gray-100 text-black">

        <div className="">
          <Search
            todos={todos}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex justify-end mb-4">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedTodos.map((todo) => (
            <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4 dark:bg-gray-700 dark:text-white">
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
              <p className={`text-gray-700 mb-2 ${todo.description && 'dark:text-gray-300'}`}>{todo.description}</p>
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
    </main>
  );
};

export default Home;