import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const TypingIndicator: React.FC = () => {
  const iconColor = useThemeColor({}, "icon");

  const dot1Opacity = useSharedValue(0.3);
  const dot2Opacity = useSharedValue(0.3);
  const dot3Opacity = useSharedValue(0.3);

  useEffect(() => {
    // Animate dots in sequence
    dot1Opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 400 })
      ),
      -1
    );

    dot2Opacity.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1
      )
    );

    dot3Opacity.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1
      )
    );
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{ ...styles.dotStyle, backgroundColor: iconColor }, dot1Style]}
      />
      <Animated.View
        style={[{ ...styles.dotStyle, backgroundColor: iconColor }, dot2Style]}
      />
      <Animated.View
        style={[{ ...styles.dotStyle, backgroundColor: iconColor }, dot3Style]}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
