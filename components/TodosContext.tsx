import { createContext, useContext, useState } from 'react';
import { Todo } from '@/lib/types';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};
