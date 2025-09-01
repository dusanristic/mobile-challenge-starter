import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@theme_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const systemColorScheme = useSystemColorScheme();

  // Load saved theme preference on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  // Determine if we should use dark theme
  const isDark = themeMode === "dark";

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
