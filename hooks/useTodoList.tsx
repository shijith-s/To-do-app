import { createContext, useContext, useMemo, useState } from "react";

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

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id: string, todo: Todo) => {
    setTodos(todos.map((t) => (t.id === id ? todo : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
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
