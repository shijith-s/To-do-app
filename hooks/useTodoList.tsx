import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as TodoDB from "@/lib/todo";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, todo: Todo) => void;
  deleteTodo: (id: string) => void;
  clearAllTodos: () => void;
}

const TodoListContext = createContext<TodoListContextType | undefined>(
  undefined,
);

export const TodoListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    console.log("Fetching todos");
    const fetchTodos = async () => {
      try {
        const todos = await TodoDB.getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    TodoDB.addTodo(todo);
  };

  const updateTodo = (id: string, todo: Todo) => {
    setTodos(todos.map((t) => (t.id === id ? todo : t)));
    TodoDB.updateTodo(todo);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
    TodoDB.deleteTodo(id);
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [todos]);

  return (
    <TodoListContext.Provider
      value={{
        todos: sortedTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        clearAllTodos,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => {
  const value = useContext(TodoListContext);
  if (!value) {
    throw new Error("useTodoList must be used within a TodoListProvider");
  }
  return value;
};
