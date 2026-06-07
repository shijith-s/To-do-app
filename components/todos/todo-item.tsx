import { View, TouchableOpacity, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import { type Todo, useTodoList } from "@/hooks/useTodoList";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TodoPreview } from "./todo-preview";
import { TodoEdit } from "./todo-edit";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  const { updateTodo, deleteTodo } = useTodoList();
  const [isEditing, setIsEditing] = useState(false);

  const handleTodoComplete = () => {
    if (isEditing) return;
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

  const handleTodoEdit = (todo: Todo) => {
    updateTodo(todo.id, todo);
    setIsEditing(false);
  };

  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.checkbox}
          onPress={handleTodoComplete}
          disabled={isEditing}
        >
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
        {isEditing ? (
          <TodoEdit
            todo={todo}
            handleSave={handleTodoEdit}
            handleCancel={() => setIsEditing(false)}
          />
        ) : (
          <TodoPreview
            todo={todo}
            handleEdit={() => setIsEditing(true)}
            handleDelete={handleTodoDelete}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
