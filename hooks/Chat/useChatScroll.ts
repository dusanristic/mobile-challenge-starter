import { MessageType } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useChatScroll = ({
  localMessages,
  setShowScrollButton,
  isTyping,
}: {
  localMessages: MessageType[];
  setShowScrollButton: (showScrollButton: boolean) => void;
  isTyping: boolean;
}) => {
  const scrollViewRef = useRef<any>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const lastMessageCountRef = useRef(0);
  const lastStreamingContentRef = useRef<string>("");

  const scrollToBottom = () => {
    setIsAutoScrolling(true);
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setUserHasScrolled(false);
    setShowScrollButton(false);

    // Reset auto-scrolling flag after animation
    setTimeout(() => {
      setIsAutoScrolling(false);
    }, 300);
  };

  // Keep last message visible when keyboard opens
  useEffect(() => {
    const onShow = () => {
      if (!userHasScrolled) {
        // Small delay to let layout adjust
        setTimeout(scrollToBottom, Platform.OS === "ios" ? 250 : 50);
      }
    };
    const sub1 = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      onShow
    );
    return () => {
      sub1.remove();
    };
  }, [userHasScrolled, scrollToBottom]);

  useEffect(() => {
    const hasNewMessage = localMessages.length > lastMessageCountRef.current;
    const lastMessage = localMessages[localMessages.length - 1];
    const hasStreamingUpdate =
      lastMessage?.isStreaming &&
      lastMessage.content !== lastStreamingContentRef.current;

    if (hasNewMessage) {
      lastMessageCountRef.current = localMessages.length;
    }

    if (lastMessage?.isStreaming) {
      lastStreamingContentRef.current = lastMessage.content;
    }

    // Auto-scroll if user hasn't manually scrolled up and there's new content
    if (!userHasScrolled && (hasNewMessage || hasStreamingUpdate)) {
      checkAndAutoScroll();
    }
  }, [localMessages, userHasScrolled]);

  const handleScroll = (event: any) => {
    // Don't track user scrolling during auto-scroll
    if (isAutoScrolling) return;

    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const isNearBottom = offsetY >= contentHeight - layoutHeight - 100;

    // Show scroll button if user has scrolled up (away from bottom)
    setShowScrollButton(!isNearBottom && !isTyping);

    // Track if user has manually scrolled away from bottom
    setUserHasScrolled(!isNearBottom);
  };

  // Auto-scroll when new messages arrive (if user hasn't manually scrolled up)
  const checkAndAutoScroll = () => {
    if (!userHasScrolled && localMessages.length > 0) {
      // Try immediately, then again after layout settles
      scrollToBottom();
      setTimeout(() => {
        scrollToBottom();
      }, 80);
      setTimeout(() => {
        scrollToBottom();
      }, 160);
    }
  };

  return {
    scrollToBottom,
    handleScroll,
    checkAndAutoScroll,
    scrollViewRef,
    userHasScrolled,
  };
};
