import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const TabsLayout = () => {
  const { colors, themeStyles } = useTheme();
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: colors.bg,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          height: themeStyles.borderRadius * 2,
          paddingBottom: 5,
          paddingTop: 5,
          borderRadius: themeStyles.borderRadius,
          marginBottom: 10,
          marginHorizontal: 20,
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          position: "absolute",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
