import { StatusBar } from "react-native";
import React, { useMemo } from "react";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/settings/header";
import { Preferences } from "@/components/settings/preferences";

const Settings = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createSettingsStyles(colors), [colors]);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <Preferences />
        {/* danger zone */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
