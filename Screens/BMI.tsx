import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string | number | null>(null);
  const [status, setStatus] = useState<string>("");

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w) return;

    const result = w / (h * h);
    setBmi(result.toFixed(1));

    if (result < 18.5) setStatus("Underweight");
    else if (result < 25) setStatus("Normal");
    else if (result < 30) setStatus("Overweight");
    else setStatus("Obese");
  };

  return (
    <View style={styles.container}>

      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>BMI Calculator</Text>
        <Text style={styles.subtitle}>Track your body index easily</Text>
      </View>

      {/* Input Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          placeholder="Enter your height"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          style={styles.input}
          placeholderTextColor="#8fb7ff"
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          placeholder="Enter your weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          placeholderTextColor="#8fb7ff"
        />

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
      </View>

      {/* Result Card */}
      {bmi && (
        <View style={styles.resultCard}>
          <Text style={styles.resultValue}>BMI: {bmi}</Text>
          <Text style={styles.resultStatus}>{status}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7ff",
    padding: 20,
    justifyContent: "center",
  },

  headerCard: {
    marginBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e66ff",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b8cff",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  label: {
    fontSize: 14,
    color: "#1e66ff",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#f0f5ff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d6e4ff",
    marginBottom: 10,
    color: "#1e66ff",
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

  resultValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e66ff",
  },

  resultStatus: {
    fontSize: 16,
    marginTop: 4,
    color: "#3b4b7a",
    fontWeight: "600",
  },
});