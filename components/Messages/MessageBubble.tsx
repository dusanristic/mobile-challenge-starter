import { useThemeColor } from "@/hooks/useThemeColor";
import { MessageActionsType, MessageType } from "@/types/chat";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { TypingIndicator } from "../Chat/TypingIndicator";
import { WeatherWidget } from "../Chat/WeatherWidget";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { MessageActions } from "./MessageActions";

const { width } = Dimensions.get("window");

interface MessageBubbleProps {
  message: MessageType;
  actions: MessageActionsType;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  actions,
}) => {
  const isUser = message.role === "user";

  // Theme colors
  const backgroundColor = useThemeColor(
    {},
    isUser ? "userMessageBg" : "aiMessageBg"
  );
  const textColor = useThemeColor({}, isUser ? "userText" : "aiText");
  const borderColor = useThemeColor({}, "messageBorder");
  const avatarColor = useThemeColor({}, isUser ? "userAvatar" : "aiAvatar");

  return (
    <Animated.View
      key={message.id}
      entering={isUser ? SlideInRight : SlideInLeft}
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        opacity: message.isStreaming ? 0.7 : 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: isUser ? "flex-end" : "flex-start",
        }}
      >
        {/* Avatar - Only show for AI messages on the left */}
        {!isUser && (
          <View
            style={{
              ...styles.avatarContainer,
              backgroundColor: avatarColor,
            }}
          >
            <Text style={styles.avatarText}>A</Text>
          </View>
        )}

        {/* Message Content */}
        <View
          style={{
            maxWidth: width * 0.75,
            alignItems: isUser ? "flex-end" : "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor,
              borderBottomLeftRadius: isUser ? 18 : 4,
              borderBottomRightRadius: isUser ? 4 : 18,
              borderWidth: isUser ? 0 : 1,
              borderColor,
              shadowColor: textColor,
              ...styles.messageContent,
            }}
          >
            {message.content && (
              <MarkdownRenderer content={message.content} isUser={isUser} />
            )}

            {message.isStreaming && <TypingIndicator />}

            {/* Tool Calls */}
            {message.toolCalls && message.toolCalls.length > 0 && (
              <View style={{ marginTop: message.content ? 12 : 0 }}>
                {message.toolCalls.map((toolCall, toolIndex) => {
                  if (toolCall.type === "weather") {
                    return (
                      <WeatherWidget key={toolIndex} data={toolCall.data} />
                    );
                  }
                  return null;
                })}
              </View>
            )}
          </View>

          {!message.isStreaming && (
            <MessageActions
              message={message}
              actions={actions}
              isUser={isUser}
            />
          )}
        </View>

        {/* Avatar - Only show for user messages on the right */}
        {isUser && (
          <View
            style={{
              backgroundColor: avatarColor,
              ...styles.avatarContainer,
            }}
          >
            <Text style={styles.avatarText}>U</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginRight: 8,
    marginLeft: 8,
  },
  messageContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
