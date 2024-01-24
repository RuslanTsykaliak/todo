// components/SearchComponent.tsx

"use client";


import { useState, useEffect } from "react";
import { Todo } from "@/lib/types";

interface SearchComponentProps {
  todos: Todo[];
  onSearch: (filteredTodos: Todo[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ todos, onSearch,}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
      if (searchQuery) {
        const filteredTodos = todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        onSearch(filteredTodos);
      } else {
        onSearch(todos);
      }
    }, [searchQuery, todos]);

    return (
      <section className="overflow-hidden py-16 md:py-20 lg:py-28">
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Search Todo"
          autoFocus
          autoComplete="off"
          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black placeholder-grey shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-black dark:shadow-signUp"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
      </section>
    );
  }

  export default SearchComponent;