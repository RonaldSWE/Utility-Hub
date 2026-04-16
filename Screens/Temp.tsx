import React, { useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Mode =
  | "C_F"
  | "F_C"
  | "C_K"
  | "K_C"
  | "F_K"
  | "K_F";

const TemperatureConverter: FC = () => {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("C_F");

  const convert = (): void => {
    const temp: number = parseFloat(value);
    if (isNaN(temp)) return;

    let res: number = 0;
    let label: string = "";

    switch (mode) {
      case "C_F":
        res = (temp * 9) / 5 + 32;
        label = "°F";
        break;

      case "F_C":
        res = ((temp - 32) * 5) / 9;
        label = "°C";
        break;

      case "C_K":
        res = temp + 273.15;
        label = "K";
        break;

      case "K_C":
        res = temp - 273.15;
        label = "°C";
        break;

      case "F_K":
        res = ((temp - 32) * 5) / 9 + 273.15;
        label = "K";
        break;

      case "K_F":
        res = ((temp - 273.15) * 9) / 5 + 32;
        label = "°F";
        break;
    }

    setResult(`${res.toFixed(2)} ${label}`);
  };

  const OptionButton: FC<{ title: string; value: Mode }> = ({
    title,
    value,
  }) => {
    const active = mode === value;

    return (
      <TouchableOpacity
        style={[styles.option, active && styles.optionActive]}
        onPress={() => setMode(value)}
      >
        <Text style={[styles.optionText, active && styles.optionTextActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Temperature Converter</Text>
        <Text style={styles.subtitle}>Fast & clean unit conversion</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <TextInput
          placeholder="Enter temperature"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholderTextColor="#7aa7ff"
        />

        {/* Options */}
        <View style={styles.grid}>
          <OptionButton title="C ➡ F" value="C_F" />
          <OptionButton title="F ➡ C" value="F_C" />
          <OptionButton title="C ➡ K" value="C_K" />
          <OptionButton title="K ➡ C" value="K_C" />
          <OptionButton title="F ➡ K" value="F_K" />
          <OptionButton title="K ➡ F" value="K_F" />
        </View>

        <TouchableOpacity style={styles.button} onPress={convert}>
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>
      </View>

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

export default TemperatureConverter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7ff",
    padding: 20,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e66ff",
  },

  subtitle: {
    fontSize: 13,
    color: "#6b8cff",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  input: {
    backgroundColor: "#f0f5ff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d6e4ff",
    marginBottom: 15,
    color: "#1e66ff",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  option: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f0f5ff",
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d6e4ff",
  },

  optionActive: {
    backgroundColor: "#1e66ff",
    borderColor: "#1e66ff",
  },

  optionText: {
    color: "#1e66ff",
    fontWeight: "600",
    fontSize: 12,
  },

  optionTextActive: {
    color: "#fff",
  },

  button: {
    backgroundColor: "#1e66ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  resultCard: {
    marginTop: 20,
    backgroundColor: "#eaf1ff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  resultText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e66ff",
  },
});