export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
  createdAt: string;
}