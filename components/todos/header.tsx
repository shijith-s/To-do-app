import { Text, View } from "react-native";
import React, { useMemo } from "react";
import { useTodoList } from "@/hooks/useTodoList";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Header = () => {
  const { todos } = useTodoList();
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);

  const completedCount = useMemo<number>(() => {
    return todos.filter((todo) => todo.isCompleted).length;
  }, [todos]);

  const progress = useMemo<number>(() => {
    if (todos.length === 0) return 0;
    return Math.round((completedCount / todos.length) * 100);
  }, [completedCount, todos.length]);

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="flash-outline" color={colors.text} size={24} />
        </LinearGradient>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Today&apos;s Tasks</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {todos.length} completed
          </Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
