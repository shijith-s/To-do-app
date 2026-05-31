import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import useTheme, { ColorScheme, ThemeStyles } from "@/hooks/useTheme";

const Settings = () => {
  const { colors, themeStyles } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, themeStyles),
    [colors, themeStyles],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

const createStyles = (colors: ColorScheme, themeStyles: ThemeStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
  });
