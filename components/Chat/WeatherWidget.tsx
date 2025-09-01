import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface WeatherData {
  location: string;
  temperature: number;
}

interface WeatherWidgetProps {
  data: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "icon");

  const getWeatherIcon = (temp: number) => {
    if (temp < 32) return "snow";
    if (temp < 50) return "cloudy";
    if (temp < 70) return "partly-sunny";
    return "sunny";
  };

  const getWeatherColor = (temp: number) => {
    if (temp < 32) return "#4A90E2";
    if (temp < 50) return "#7B68EE";
    if (temp < 70) return "#FFA500";
    return "#FF6B35";
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(100)}
      style={{
        ...styles.container,
        backgroundColor,
        borderColor: borderColor + "20",
        shadowColor: textColor,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.weatherContent}>
            <Ionicons
              name={getWeatherIcon(data.temperature) as any}
              size={18}
              color="white"
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: textColor,
            }}
          >
            Weather
          </Text>
        </View>
      </View>

      {/* Weather Info */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            ...styles.infoContent,
            color: getWeatherColor(data.temperature),
          }}
        >
          {data.temperature}°F
        </Text>

        <Text
          style={{
            ...styles.textContent,
            color: iconColor,
          }}
        >
          {data.location}
        </Text>
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  weatherContent: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textContent: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
});
