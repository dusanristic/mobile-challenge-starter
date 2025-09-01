import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CopyNotificationProps {
  visible: boolean;
  onHide: () => void;
}

export const CopyNotification: React.FC<CopyNotificationProps> = ({
  visible,
  onHide,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  const backgroundColor = useThemeColor(
    { light: "#4CAF50", dark: "#66BB6A" },
    "tint"
  );
  const textColor = useThemeColor({}, "background");

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });

      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(-20, { duration: 200 }, () => {
          runOnJS(onHide)();
        });
      }, 2000);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          ...styles.container,
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Message copied to clipboard
      </Text>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
