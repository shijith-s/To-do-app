import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/useTheme";
import { TodoListProvider } from "@/hooks/useTodoList";

export default function RootLayout() {
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
