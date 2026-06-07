import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTodoList } from "@/hooks/useTodoList";

const TodoInput = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  const { addTodo } = useTodoList();

  const [text, setText] = useState("");

  const handleAddTodo = () => {
    if (text.trim() === "") return;
    addTodo({
      id: Date.now().toString(),
      title: text,
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setText("");
  };
  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What needs to be done?"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={handleAddTodo}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
          <LinearGradient
            colors={
              text.trim() === ""
                ? colors.gradients.muted
                : colors.gradients.primary
            }
            style={[
              styles.addButton,
              text.trim() === "" && styles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add-outline" color={colors.text} size={24} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
