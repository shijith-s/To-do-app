import { View, Text, TouchableOpacity } from "react-native";
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
    deleteTodo(todo.id);
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
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
