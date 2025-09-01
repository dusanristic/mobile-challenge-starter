import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MessageComposerProps {
  input: string;
  setInput: (text: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  input,
  setInput,
  onSendMessage,
  isTyping,
}) => {
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  // Theme colors
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "icon");
  const sendButtonColor = useThemeColor({}, "sendButtonColor");

  return (
    <Animated.View
      entering={FadeInUp}
      style={{
        ...styles.container,
        borderTopColor: borderColor + "20",
        backgroundColor,
      }}
    >
      <View style={styles.contentContainer}>
        {/* Attach Button */}
        <TouchableOpacity
          disabled={isTyping}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Alert.alert("Attach", "Attachment feature coming soon!");
          }}
          style={{
            ...styles.attachButtonContainer,
            backgroundColor: iconColor + "20",
            opacity: isTyping ? 0.5 : 1,
          }}
        >
          <Ionicons name="add" size={20} color={iconColor} />
        </TouchableOpacity>

        {/* Input */}
        <Animated.View
          style={{
            ...styles.inputAnimatedContainer,
            backgroundColor: iconColor + "10",
            borderColor: input.trim() ? tintColor + "50" : iconColor + "30",
            shadowColor: textColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: input.trim() ? 0.1 : 0,
            elevation: input.trim() ? 2 : 0,
          }}
        >
          <TextInput
            ref={inputRef}
            value={input}
            onChangeText={setInput}
            placeholder="Message ChatGPT..."
            placeholderTextColor={iconColor}
            multiline
            maxLength={4000}
            style={{
              ...styles.inputContainer,
              color: textColor,
            }}
            editable={!isTyping}
          />
        </Animated.View>

        {/* Send Button */}
        <TouchableOpacity
          onPress={onSendMessage}
          disabled={!input.trim() || isTyping}
          style={{
            ...styles.sendButtonContainer,
            backgroundColor:
              input.trim() && !isTyping ? tintColor : iconColor + "30",
          }}
        >
          <Ionicons
            name="send"
            size={18}
            color={input.trim() && !isTyping ? sendButtonColor : iconColor}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    marginBottom: 36,
    borderTopWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  attachButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputAnimatedContainer: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 40,
    maxHeight: 120,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  sendButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
