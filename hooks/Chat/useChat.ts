import { MessageType } from "@/types/chat";
import { generateAPIUrl } from "@/utils";
import { useChat as useAiChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import * as Haptics from "expo-haptics";
import { fetch as expoFetch } from "expo/fetch";
import { useEffect, useState } from "react";
import { useChatScroll } from "./useChatScroll";
import { useMessageStreaming } from "./useMessageStreaming";

export function useChat() {
  const [localMessages, setLocalMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const {
    scrollToBottom,
    handleScroll,
    checkAndAutoScroll,
    scrollViewRef,
    userHasScrolled,
  } = useChatScroll({
    setShowScrollButton,
    localMessages,
    isTyping,
  });

  const { messages, error, sendMessage } = useAiChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl("/api/chat"),
    }),
    onError: (error) => {
      console.error(error, "ERROR");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
    onFinish: () => {
      setIsTyping(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
  });

  useMessageStreaming({
    messages,
    setLocalMessages,
    setIsTyping,
    checkAndAutoScroll,
    scrollToBottom,
    userHasScrolled,
  });

  // Cleanup typing indicators when there are no messages
  useEffect(() => {
    if (messages.length === 0) {
      setLocalMessages([]);
      setIsTyping(false);
    }
  }, [messages.length]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || isTyping) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      feedback: null, // Initialize feedback property
    };

    // Add user message and typing indicator to the bottom (traditional chat order)
    const typingMessage: MessageType = {
      id: "typing",
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };
    setLocalMessages((prev) => {
      // Ensure no lingering typing message remains
      const withoutOldTyping = prev.filter((m) => m.id !== "typing");
      return [...withoutOldTyping, userMessage, typingMessage];
    });

    setIsTyping(true);

    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await sendMessage({ text: userMessage.content });
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove typing indicator on error
      setLocalMessages((prev) => prev.filter((m) => m.id !== "typing"));
      setIsTyping(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const updateMessageFeedback = (
    messageId: string,
    feedback: "liked" | "disliked" | null
  ) => {
    setLocalMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, feedback } : message
      )
    );
  };

  return {
    localMessages,
    isTyping,
    showScrollButton,
    scrollViewRef,
    error,
    handleSendMessage,
    scrollToBottom,
    handleScroll,
    updateMessageFeedback,
  };
}
