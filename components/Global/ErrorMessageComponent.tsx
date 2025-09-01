import { StyleSheet, Text, View } from "react-native";

export const ErrorMessageComponent = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
