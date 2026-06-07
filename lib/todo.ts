import { Todo } from "@/hooks/useTodoList";
import { getDB } from "./database";

export const createTodoTable = async () => {
  console.log("Creating todo table");
  const db = await getDB();
  console.log("Database:", db);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
      completedAt TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT
    )
  `);
};

export const addTodo = async (todo: Todo) => {
  const db = await getDB();
  try {
    console.log("Adding todo:", todo);
    const result = await db.runAsync(
      "INSERT OR REPLACE INTO todos (title, isCompleted, completedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
      [
        todo.title,
        todo.isCompleted,
        todo.completedAt ? todo.completedAt.toISOString() : null,
        todo.createdAt.toISOString(),
        todo.updatedAt.toISOString(),
      ],
    );
    console.log("Result:", result);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async (): Promise<Todo[]> => {
  console.log("Getting todos");
  const db = await getDB();
  try {
    const result = await db.getAllAsync(
      "SELECT * FROM todos ORDER BY updatedAt DESC",
    );
    console.log("Todos:", result);
    return result.map((todo: any) => ({
      id: todo.id.toString(),
      title: todo.title,
      isCompleted: Boolean(todo.isCompleted),
      completedAt: todo.completedAt ? new Date(todo.completedAt) : null,
      createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
      updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : new Date(),
    }));
  } catch (error) {
    console.error("Error getting todos:", error);
    return [];
  }
};

export const updateTodo = async (todo: Todo) => {
  console.log("Updating todo:", todo);
  const db = await getDB();
  try {
    const result = await db.runAsync(
      "UPDATE todos SET title = ?, isCompleted = ?, completedAt = ?, updatedAt = ? WHERE id = ?",
      [
        todo.title,
        todo.isCompleted,
        todo.completedAt ? todo.completedAt.toISOString() : null,
        todo.updatedAt.toISOString(),
        todo.id,
      ],
    );
    console.log("Updated todo:", result);
    return result.changes;
  } catch (error) {
    console.error("Error updating todo:", error);
    return 0;
  }
};

export const deleteTodo = async (id: string) => {
  const db = await getDB();
  try {
    const result = await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
    return result.changes;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return 0;
  }
};
