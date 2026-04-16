import React, { useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Mode =
  | "KG_LB"
  | "LB_KG"
  | "KG_G"
  | "G_KG"
  | "G_LB"
  | "LB_G";

const WeightConverter: FC = () => {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("KG_LB");

  const convert = (): void => {
    const input = parseFloat(value);
    if (isNaN(input)) return;

    let res = 0;
    let label = "";

    switch (mode) {
      case "KG_LB":
        res = input * 2.20462;
        label = "lb";
        break;

      case "LB_KG":
        res = input / 2.20462;
        label = "kg";
        break;

      case "KG_G":
        res = input * 1000;
        label = "g";
        break;

      case "G_KG":
        res = input / 1000;
        label = "kg";
        break;

      case "G_LB":
        res = (input / 1000) * 2.20462;
        label = "lb";
        break;

      case "LB_G":
        res = (input / 2.20462) * 1000;
        label = "g";
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
      <View style={styles.header}>
        <Text style={styles.title}>Weight Converter</Text>
        <Text style={styles.subtitle}>kg • g • lb conversion tool</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Enter weight"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholderTextColor="#7aa7ff"
        />

        <View style={styles.grid}>
          <OptionButton title="kg ➡ lb" value="KG_LB" />
          <OptionButton title="lb ➡ kg" value="LB_KG" />
          <OptionButton title="kg ➡ g" value="KG_G" />
          <OptionButton title="g ➡ kg" value="G_KG" />
          <OptionButton title="g ➡ lb" value="G_LB" />
          <OptionButton title="lb ➡ g" value="LB_G" />
        </View>

        <TouchableOpacity style={styles.button} onPress={convert}>
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

export default WeightConverter;

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