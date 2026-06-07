import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { Todo } from "@/hooks/useTodoList";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface TodoEditProps {
  todo: Todo;
  handleSave: (todo: Todo) => void;
  handleCancel: () => void;
}

export const TodoEdit = ({ todo, handleSave, handleCancel }: TodoEditProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  const [text, setText] = useState(todo.title);

  const handleSaveTodo = () => {
    if (text.trim() === "") return;
    handleSave({ ...todo, title: text, updatedAt: new Date() });
    handleCancel();
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.editInput}
        onSubmitEditing={handleSaveTodo}
      />
      <View style={styles.editButtons}>
        <TouchableOpacity onPress={handleSaveTodo}>
          <LinearGradient
            colors={colors.gradients.success}
            style={styles.editButton}
          >
            <Ionicons name="checkmark-outline" color={colors.text} size={24} />
            <Text style={styles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={styles.editButton}
          >
            <Ionicons name="close-outline" color={colors.text} size={24} />
            <Text style={styles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
