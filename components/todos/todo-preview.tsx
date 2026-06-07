import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "@/hooks/useTodoList";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";

export const TodoPreview = ({
  todo,
  handleEdit,
  handleDelete,
}: {
  todo: Todo;
  handleEdit: () => void;
  handleDelete: () => void;
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  return (
    <View style={styles.todoPreview}>
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
        <TouchableOpacity
          style={[styles.actionButton]}
          onPress={handleEdit}
          disabled={todo.isCompleted}
        >
          <Ionicons
            name="pencil-outline"
            color={todo.isCompleted ? colors.textMuted : colors.text}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton]} onPress={handleDelete}>
          <Ionicons name="trash-outline" color={colors.danger} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
