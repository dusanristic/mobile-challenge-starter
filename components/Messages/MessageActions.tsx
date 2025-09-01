import { useThemeColor } from "@/hooks/useThemeColor";
import { MessageActionsType, MessageType } from "@/types/chat";
import { formatTime } from "@/utils/datetime";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface MessageActionsProps {
  message: MessageType;
  actions: MessageActionsType;
  isUser: boolean;
}

export const MessageActions = ({
  message,
  actions,
  isUser,
}: MessageActionsProps) => {
  const iconColor = useThemeColor({}, "icon");

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      actions.onCopy(text);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(200)}
      style={{
        ...styles.messageActions,
        marginLeft: isUser ? 0 : 8,
        marginRight: isUser ? 8 : 0,
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: iconColor,
        }}
      >
        {formatTime(message.timestamp)}
      </Text>

      <TouchableOpacity
        onPress={() => copyToClipboard(message.content)}
        style={{ padding: 4 }}
      >
        <Ionicons name="copy-outline" size={16} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => actions.onLike(message.id)}
        style={{ padding: 4 }}
      >
        <Ionicons
          name={
            message.feedback === "liked" ? "thumbs-up" : "thumbs-up-outline"
          }
          size={16}
          color={message.feedback === "liked" ? "#4CAF50" : iconColor}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => actions.onDislike(message.id)}
        style={{ padding: 4 }}
      >
        <Ionicons
          name={
            message.feedback === "disliked"
              ? "thumbs-down"
              : "thumbs-down-outline"
          }
          size={16}
          color={message.feedback === "disliked" ? "#F44336" : iconColor}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  messageActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
});
