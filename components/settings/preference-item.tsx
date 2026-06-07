import { View, Text, Switch, ColorValue } from "react-native";
import React, { useMemo } from "react";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface PreferenceItemProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: readonly [ColorValue, ColorValue];
  switchColor: ColorValue;
}

const PreferenceItem = ({
  title,
  value,
  onValueChange,
  icon,
  iconColor,
  switchColor,
}: PreferenceItemProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createSettingsStyles(colors), [colors]);
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <LinearGradient colors={iconColor} style={styles.settingIcon}>
          <Ionicons name={icon} color={colors.text} size={24} />
        </LinearGradient>
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          true: switchColor,
          false: colors.border,
        }}
      />
    </View>
  );
};

export default PreferenceItem;
