import { EmptyState } from "@/components/Chat/EmptyState";
import { ScrollToBottomButton } from "@/components/Chat/ScrollToBottomButton";
import { ErrorMessageComponent } from "@/components/Global/ErrorMessageComponent";
import { Header } from "@/components/Header";
import { CopyNotification } from "@/components/Messages/CopyNotification";
import { MessageBubble } from "@/components/Messages/MessageBubble";
import { MessageComposer } from "@/components/Messages/MessageComposer";
import { useChat } from "@/hooks/Chat/useChat";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MessageActionsType } from "@/types/chat";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const inputRef = useRef<any>(null);

  const {
    localMessages,
    isTyping,
    showScrollButton,
    scrollViewRef,
    error,
    handleSendMessage,
    scrollToBottom,
    handleScroll,
    updateMessageFeedback,
  } = useChat();

  const backgroundColor = useThemeColor({}, "background");

  const messageActions: MessageActionsType = {
    onCopy: async (_: string) => {
      setShowCopyNotification(true);
    },
    onLike: (messageId: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const message = localMessages.find((m) => m.id === messageId);
      const newFeedback = message?.feedback === "liked" ? null : "liked";
      updateMessageFeedback(messageId, newFeedback);
    },
    onDislike: (messageId: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const message = localMessages.find((m) => m.id === messageId);
      const newFeedback = message?.feedback === "disliked" ? null : "disliked";
      updateMessageFeedback(messageId, newFeedback);
    },
  };

  const handleSend = () => {
    handleSendMessage(input);
    setInput("");
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ErrorMessageComponent message={error.message || "An error occurred"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header />

        {/* Copy Notification */}
        <CopyNotification
          visible={showCopyNotification}
          onHide={() => setShowCopyNotification(false)}
        />

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {localMessages.length === 0 ? (
            <EmptyState onSuggestionPress={handleSuggestionPress} />
          ) : (
            localMessages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                actions={messageActions}
              />
            ))
          )}
        </ScrollView>

        <ScrollToBottomButton
          visible={showScrollButton && localMessages.length > 0}
          onPress={scrollToBottom}
        />

        <MessageComposer
          input={input}
          setInput={setInput}
          onSendMessage={handleSend}
          isTyping={isTyping}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
});
