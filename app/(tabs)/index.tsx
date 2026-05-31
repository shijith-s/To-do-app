import { useMemo } from "react";
import useTheme, { ColorScheme, ThemeStyles } from "@/hooks/useTheme";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTodoList, type Todo } from "@/hooks/useTodoList";

export default function Index() {
  const { toggleDarkMode, colors, themeStyles } = useTheme();
  const { todos, addTodo, updateTodo, deleteTodo, clearAllTodos } =
    useTodoList();
  const styles = useMemo(
    () => createStyles(colors, themeStyles),
    [colors, themeStyles],
  );

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoItemText}>{item.title}</Text>
      </View>
    );
  };

  const handleAddTodo = () => {
    addTodo({
      id: Date.now().toString(),
      title: "New Todo",
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View style={styles.todoListContainer}>
        <FlatList data={todos} renderItem={renderItem} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.button}>
          <Text style={styles.buttonText}>Switch Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme, themeStyles: ThemeStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      alignItems: "center",
      padding: 20,
      paddingTop: 100,
      marginBottom: 80,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: colors.text,
    },
    buttonContainer: {
      gap: 10,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: themeStyles.borderRadius,
    },
    buttonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    todoListContainer: {
      flex: 1,
      width: "100%",
      marginTop: 20,
    },
    todoItem: {
      padding: 10,
      borderRadius: themeStyles.borderRadius,
      backgroundColor: colors.surface,
      marginBottom: 10,
      paddingHorizontal: 30,
      paddingVertical: 20,
    },
    todoItemText: {
      color: colors.text,
    },
  });
