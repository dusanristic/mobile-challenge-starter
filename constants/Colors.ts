/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    // App colors
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    // Message colors
    userMessageBg: "#E3F2FD",
    aiMessageBg: "#fff",
    userText: "#1976D2",
    aiText: "#000000",
    userAvatar: "#1976D2",
    aiAvatar: "#10a37f",
    messageBorder: "#E0E0E0",
    // Markdown colors
    userMarkdownText: "#1976D2",
    aiMarkdownText: "#000000",
    userMarkdownLink: "#1565C0",
    aiMarkdownLink: "#1976D2",
    userMarkdownCodeBg: "#E3F2FD",
    aiMarkdownCodeBg: "#F5F5F5",
    userMarkdownCodeText: "#0D47A1",
    aiMarkdownCodeText: "#333333",
    sendButtonColor: "#FFFFFF",
  },
  dark: {
    // App colors
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    // Message colors
    userMessageBg: "#1E3A8A",
    aiMessageBg: "#374151",
    userText: "#60A5FA",
    aiText: "#FFFFFF",
    userAvatar: "#3B82F6",
    aiAvatar: "#059669",
    messageBorder: "#4B5563",
    // Markdown colors
    userMarkdownText: "#60A5FA",
    aiMarkdownText: "#FFFFFF",
    userMarkdownLink: "#93C5FD",
    aiMarkdownLink: "#60A5FA",
    userMarkdownCodeBg: "#1E3A8A",
    aiMarkdownCodeBg: "#374151",
    userMarkdownCodeText: "#93C5FD",
    aiMarkdownCodeText: "#E5E7EB",
    sendButtonColor: "#60A5FA",
  },
};
