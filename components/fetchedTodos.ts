// components/fetchedTodos.ts

import { useUser } from "@clerk/nextjs";
import { Todo } from "@prisma/client";

export const useFetchTodos = () => {
  const fetchTodos = async (setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    const response = await fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let fetchedTodos = await response.json();

    setTodos(fetchedTodos);
  };

  return fetchTodos;
};

////

export const useFetchYourTodos = () => {
  const { user } = useUser();
  const fetchYourTodos = async (setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    if (!user) {
      // console.log("Fetch failed")
      return;
    }

    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'userId': user.id,
    };

    const response = await fetch('/api/yourtodos', {
      method: 'GET',
      headers: headers,
    });

    let fetchedYourTodos = await response.json();

    setTodos(fetchedYourTodos);
  };
  // console.log("Fetch successful")
  return fetchYourTodos;
};
