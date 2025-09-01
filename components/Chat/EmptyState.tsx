import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface EmptyStateProps {
  onSuggestionPress: (suggestion: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onSuggestionPress,
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a short story about a robot",
    "Help me plan a weekend trip",
    "What's the weather like today?",
  ];

  return (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.container}>
      <View
        style={{
          backgroundColor: tintColor,
          ...styles.iconContainer,
        }}
      >
        <Ionicons name="chatbubble-ellipses" size={32} color={iconColor} />
      </View>

      <Text
        style={{
          ...styles.title,
          color: textColor,
        }}
      >
        How can I help you today?
      </Text>

      <Text
        style={{
          ...styles.subtitle,
          color: iconColor,
        }}
      >
        I'm here to assist you with any questions or tasks you might have.
      </Text>

      {/* Message Suggestions */}
      <View style={{ marginTop: 32, gap: 12 }}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onSuggestionPress(suggestion);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={{
              backgroundColor,
              borderColor: iconColor + "30",
              shadowColor: textColor,
              ...styles.suggestionContainer,
            }}
          >
            <Text style={{ ...styles.suggestionText, color: textColor }}>
              {suggestion}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  suggestionContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    textAlign: "center",
  },
});
