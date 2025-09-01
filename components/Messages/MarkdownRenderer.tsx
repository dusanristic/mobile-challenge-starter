import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import Markdown from "react-native-markdown-display";

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isUser = false,
}) => {
  const textColor = useThemeColor(
    {},
    isUser ? "userMarkdownText" : "aiMarkdownText"
  );
  const linkColor = useThemeColor(
    {},
    isUser ? "userMarkdownLink" : "aiMarkdownLink"
  );
  const codeBackgroundColor = useThemeColor(
    {},
    isUser ? "userMarkdownCodeBg" : "aiMarkdownCodeBg"
  );
  const codeTextColor = useThemeColor(
    {},
    isUser ? "userMarkdownCodeText" : "aiMarkdownCodeText"
  );
  const borderColor = useThemeColor({}, "icon");

  const markdownStyles = {
    body: {
      color: textColor,
      fontSize: 16,
      lineHeight: 22,
    },
    heading1: {
      color: textColor,
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    heading2: {
      color: textColor,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 14,
      marginBottom: 6,
    },
    heading3: {
      color: textColor,
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 12,
      marginBottom: 4,
    },
    paragraph: {
      color: textColor,
      fontSize: 16,
      lineHeight: 22,
      marginTop: 8,
      marginBottom: 8,
    },
    strong: {
      color: textColor,
      fontWeight: "bold" as const,
    },
    em: {
      color: textColor,
      fontStyle: "italic" as const,
    },
    link: {
      color: linkColor,
      textDecorationLine: "underline" as const,
    },
    blockquote: {
      backgroundColor: codeBackgroundColor,
      borderLeftWidth: 4,
      borderLeftColor: linkColor,
      paddingLeft: 12,
      paddingVertical: 8,
      marginVertical: 8,
      fontStyle: "italic",
    },
    code_inline: {
      backgroundColor: codeBackgroundColor,
      color: codeTextColor,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "monospace",
    },
    code_block: {
      backgroundColor: codeBackgroundColor,
      color: codeTextColor,
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      fontSize: 14,
      fontFamily: "monospace",
      borderWidth: 1,
      borderColor: borderColor + "20",
    },
    fence: {
      backgroundColor: codeBackgroundColor,
      color: codeTextColor,
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      fontSize: 14,
      fontFamily: "monospace",
      borderWidth: 1,
      borderColor: borderColor + "20",
    },
    list_item: {
      color: textColor,
      fontSize: 16,
      lineHeight: 22,
      marginVertical: 2,
    },
    bullet_list: {
      marginVertical: 8,
    },
    ordered_list: {
      marginVertical: 8,
    },
    hr: {
      backgroundColor: borderColor + "40",
      height: 1,
      marginVertical: 16,
    },
    table: {
      borderWidth: 1,
      borderColor: borderColor + "40",
      borderRadius: 8,
      marginVertical: 8,
    },
    thead: {
      backgroundColor: codeBackgroundColor,
    },
    tbody: {
      backgroundColor: "transparent",
    },
    th: {
      color: textColor,
      fontWeight: "bold",
      padding: 8,
      borderWidth: 1,
      borderColor: borderColor + "40",
    },
    td: {
      color: textColor,
      padding: 8,
      borderWidth: 1,
      borderColor: borderColor + "40",
    },
  };

  return <Markdown style={markdownStyles}>{content}</Markdown>;
};
