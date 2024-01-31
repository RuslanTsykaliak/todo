


// app/your/page.tsx
// 'use client'

// import { SetStateAction, useEffect, useState } from "react";
// import { useFetchYourTodos } from "@/components/fetchedTodos";
// import { Todo } from "@prisma/client";
// import { useUser } from "@clerk/nextjs";

// export default function YourTodos() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);

//   const fetchYourTodos = useFetchYourTodos();
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       fetchYourTodos((fetchedYourTodos: SetStateAction<Todo[]>) => {
//         setTodos(fetchedYourTodos);
//         setDisplayedTodos(fetchedYourTodos);
//       });
//     }
//   }, [user]);

  // useEffect(() => {
  //   fetchYourTodos((fetchedYourTodos: SetStateAction<Todo[]>) => {
  //     setTodos(fetchedYourTodos);
  //     setDisplayedTodos(fetchedYourTodos);
  //   });
  // }, []);
// 
//   return (
//     <main className="flex flex-col items-center px-4">
//       <div className="container mx-auto my-4 p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white bg-gray-100 text-black">

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {displayedTodos.map((todo) => (
//             <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4 dark:bg-gray-700 dark:text-white">
//               <div className="flex items-start justify-between mb-2">
//                 <h2 className="text-xl font-semibold">{todo.title}
//                 </h2>
//               </div>
//               <p className={`text-gray-700 mb-2 ${todo.description && 'dark:text-gray-300'}`}>{todo.description}</p>
//               <div className="flex justify-between items-end ">
//                 <p className={`text-${todo.priority}-500 font-bold`}>
//                   Priority: {todo.priority}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
