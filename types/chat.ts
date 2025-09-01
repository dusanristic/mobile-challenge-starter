export interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  toolCalls?: ToolCallType[];
  feedback?: "liked" | "disliked" | null;
}

export interface ToolCallType {
  type: "weather";
  data: WeatherDataType;
}

export interface WeatherDataType {
  location: string;
  temperature: number;
}

export interface MessageActionsType {
  onCopy: (text: string) => void;
  onLike: (messageId: string) => void;
  onDislike: (messageId: string) => void;
}
