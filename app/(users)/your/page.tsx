'use client'

// import { requireSession } from '@clerk/nextjs/server';
import { SignIn, UserButton, UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { useFetchTodos } from '@/components/fetchedTodos';
import { useEffect, useState } from 'react';
// import { Todo } from '@prisma/client';

export default function User() {
  // const { userId } = auth();
  // const [todos, setTodos] = useState<Todo[]>([]);
  
  
  // Import the Clerk user session on the server

// Modify your fetchTodos function
// const fetchTodos = useFetchTodos();

// // Change to this
// const fetchTodos = async () => {
//   // Get the Clerk user ID from the session
//   const { userId } = requireSession();

//   // Fetch the todos for the current user
//   const response = await fetch(`/api/todos`);
//   const todos = await response.json();
//   return setTodos(todos);
// };

// Call the function in useEffect
// useEffect(() => {
//   fetchTodos();
// }, []);



  return (
    <div className="h-screen">
      {/* <UserButton /> */}
      <div>
        Welcome to your personal Todos!
      </div>
    </div>
  );
}


