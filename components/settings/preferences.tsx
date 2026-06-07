import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text } from "react-native";
import PreferenceItem from "./preference-item";

export const Preferences = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = useMemo(() => createSettingsStyles(colors), [colors]);
  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <PreferenceItem
        title="Dark Mode"
        value={isDarkMode}
        onValueChange={toggleDarkMode}
        icon="moon"
        iconColor={colors.gradients.primary}
        switchColor={colors.primary}
      />
      <PreferenceItem
        title="Notifications"
        value={true}
        onValueChange={() => {}}
        icon="notifications"
        iconColor={colors.gradients.warning}
        switchColor={colors.warning}
      />
      <PreferenceItem
        title="Auto Sync"
        value={true}
        onValueChange={() => {}}
        icon="sync"
        iconColor={colors.gradients.success}
        switchColor={colors.success}
      />
    </LinearGradient>
  );
};
