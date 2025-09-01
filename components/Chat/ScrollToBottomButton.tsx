import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScrollToBottomButtonProps {
  visible: boolean;
  onPress: () => void;
}

export const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({
  visible,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeInDown}
      style={{
        ...styles.container,
        bottom: Math.max(140, insets.bottom + 60),
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: tintColor,
          shadowColor: textColor,
          ...styles.buttonContainer,
        }}
      >
        <Ionicons name="chevron-down" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    zIndex: 1000,
  },
  buttonContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
