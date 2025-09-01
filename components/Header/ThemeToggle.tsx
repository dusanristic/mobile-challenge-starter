import { useTheme } from "@/contexts/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { TouchableOpacity } from "react-native";

export const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();
  const iconColor = useThemeColor({}, "icon");

  const getIconName = () => {
    switch (themeMode) {
      case "light":
        return "sunny";
      case "dark":
        return "moon";
      default:
        return "phone-portrait";
    }
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const nextMode = themeMode === "light" ? "dark" : "light";

    setThemeMode(nextMode);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: iconColor + "10",
      }}
    >
      <Ionicons name={getIconName() as any} size={20} color={iconColor} />
    </TouchableOpacity>
  );
};
