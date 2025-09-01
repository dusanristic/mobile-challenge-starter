import { MessageType, ToolCallType, WeatherDataType } from "@/types/chat";
import { UIDataTypes, UIMessage, UITools } from "ai";
import { useEffect } from "react";

export const useMessageStreaming = ({
  messages,
  setLocalMessages,
  setIsTyping,
  checkAndAutoScroll,
  scrollToBottom,
  userHasScrolled,
}: {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  setLocalMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsTyping: (isTyping: boolean) => void;
  checkAndAutoScroll: () => void;
  scrollToBottom: () => void;
  userHasScrolled: boolean;
}) => {
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        // Check if this is the final message:
        // - text part finished, OR
        // - tool result present (e.g., weather output)
        const hasDoneText = lastMessage.parts.some(
          (part) => part.type === "text" && (part as any).state === "done"
        );
        const hasToolOutput = lastMessage.parts.some(
          (part) => part.type === "tool-weather" && (part as any).output
        );
        const isFinalMessage = hasDoneText || hasToolOutput;

        if (!isFinalMessage) {
          // Streaming: update the existing typing message with partial content
          const streamingContent = lastMessage.parts
            .filter((part) => part.type === "text")
            .map((part) => (part as any).text || "")
            .join("");

          setLocalMessages((prev) => {
            const updated = [...prev];
            // Find last assistant message
            let lastAssistantIndex = -1;
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].role === "assistant") {
                lastAssistantIndex = i;
                break;
              }
            }

            if (lastAssistantIndex !== -1) {
              const current = updated[lastAssistantIndex];
              updated[lastAssistantIndex] = {
                ...current,
                // Replace temporary typing id with stable SDK id on first chunk
                id:
                  current.id === "typing"
                    ? (lastMessage as any).id
                    : current.id,
                content: streamingContent,
                isStreaming: true,
              } as MessageType;
              return updated;
            }

            // No assistant message yet, create a streaming one
            updated.push({
              id: (lastMessage as any).id,
              role: "assistant",
              content: streamingContent,
              timestamp: new Date(),
              isStreaming: true,
            });
            return updated;
          });

          setIsTyping(true);
          checkAndAutoScroll();
          return;
        }

        const content = lastMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("");

        // Extract tool calls
        const toolCalls: ToolCallType[] = lastMessage.parts
          .filter((part) => part.type === "tool-weather")
          .map((part) => {
            // The tool result is in part.output
            const weatherData = (part as any).output || {};
            return {
              type: "weather" as const,
              data: {
                location: weatherData.location || "Unknown",
                temperature: weatherData.temperature || 0,
              } as WeatherDataType,
            };
          });

        setLocalMessages((prev) => {
          const updated = [...prev];
          // Prefer the last streaming assistant message
          let indexToFinalize = -1;
          for (let i = updated.length - 1; i >= 0; i--) {
            if (updated[i].role === "assistant" && updated[i].isStreaming) {
              indexToFinalize = i;
              break;
            }
          }
          // Fallback to last assistant if none marked streaming
          if (indexToFinalize === -1) {
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].role === "assistant") {
                indexToFinalize = i;
                break;
              }
            }
          }

          if (indexToFinalize !== -1) {
            const existing = updated[indexToFinalize];
            updated[indexToFinalize] = {
              ...existing,
              // Keep the stable SDK id already set during streaming
              content,
              toolCalls,
              timestamp: new Date(),
              isStreaming: false,
            } as MessageType;
            return updated;
          }

          // No assistant message present, append a new one
          updated.push({
            id: (lastMessage as any).id,
            role: "assistant",
            content,
            toolCalls,
            timestamp: new Date(),
            isStreaming: false,
          });
          return updated;
        });

        // Clear typing state
        setIsTyping(false);

        // Ensure we land on the final message; respect user's manual scroll
        if (!userHasScrolled) {
          setTimeout(scrollToBottom, 200);
        }
      }
    }
  }, [messages, userHasScrolled]);
};
