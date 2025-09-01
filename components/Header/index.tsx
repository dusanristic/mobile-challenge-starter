import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "icon");

  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        ...styles.container,
        borderBottomColor: borderColor,
        backgroundColor,
      }}
    >
      <View style={styles.contentContainer}>
        <View>
          <Text
            style={{
              ...styles.textContainer,
              color: textColor,
            }}
          >
            ChatGPT
          </Text>
        </View>

        <ThemeToggle />
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
