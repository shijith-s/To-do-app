import { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/useTheme";
import { TodoListProvider } from "@/hooks/useTodoList";
import { createTodoTable } from "@/lib/todo";
export default function RootLayout() {
  useEffect(() => {
    createTodoTable();
  }, []);

  return (
    <ThemeProvider>
      <TodoListProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TodoListProvider>
    </ThemeProvider>
  );
}
