import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

export const Header = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createSettingsStyles(colors), [colors]);
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="settings" color={colors.text} size={24} />
        </LinearGradient>
        <Text style={styles.title}>Settings</Text>
      </View>
    </View>
  );
};
