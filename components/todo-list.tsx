import { FlatList } from "react-native";
import React, { useMemo } from "react";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import TodoItem from "./todo-item";
import { useTodoList } from "@/hooks/useTodoList";
import EmptyState from "@/components/empty-state";

const TodoList = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  const { todos } = useTodoList();

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} />}
      keyExtractor={(item) => item.id}
      style={styles.todoList}
      contentContainerStyle={styles.todoListContent}
      ListEmptyComponent={<EmptyState />}
    />
  );
};

export default TodoList;
