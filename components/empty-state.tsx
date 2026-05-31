import { View, Text } from "react-native";
import React, { useMemo } from "react";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const EmptyState = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="clipboard-outline" color={colors.text} size={60} />
      </LinearGradient>
      <Text style={styles.emptyText}>No todos yet!</Text>
      <Text style={styles.emptySubtext}>Add a new todo to get started.</Text>
    </View>
  );
};

export default EmptyState;
