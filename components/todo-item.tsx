import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useMemo } from "react";
import { type Todo, useTodoList } from "@/hooks/useTodoList";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  const { updateTodo, deleteTodo } = useTodoList();

  const handleTodoComplete = () => {
    updateTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted });
  };

  const handleTodoDelete = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo(todo.id),
      },
    ]);
  };

  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity style={styles.checkbox} onPress={handleTodoComplete}>
          <LinearGradient
            colors={
              todo.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              styles.checkboxInner,
              { borderColor: todo.isCompleted ? "transparent" : colors.border },
            ]}
          >
            {todo.isCompleted && (
              <Ionicons
                name="checkmark-outline"
                color={colors.text}
                size={24}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoText,
              todo.isCompleted && styles.todoTextCompleted,
            ]}
          >
            {todo.title}
          </Text>
        </View>
        <View style={styles.todoActions}>
          <TouchableOpacity style={[styles.actionButton]}>
            <Ionicons name="pencil-outline" color={colors.text} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton]}
            onPress={handleTodoDelete}
          >
            <Ionicons name="trash-outline" color={colors.danger} size={24} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
