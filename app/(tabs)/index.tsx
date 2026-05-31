import { useMemo } from "react";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "react-native";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header";
import TodoInput from "@/components/todo-input";
import TodoList from "@/components/todo-list";

export default function Index() {
  const { colors } = useTheme();
  const styles = useMemo(() => createHomeStyles(colors), [colors]);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <TodoInput />
        <TodoList />
      </SafeAreaView>
    </LinearGradient>
  );
}
