import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type FirstScreenNavigationProp = NativeStackNavigationProp<any, "FirstScreen">;

const Home: React.FC = () => {
  const navigation = useNavigation<FirstScreenNavigationProp>();

  function handleNavigateToBMI() {
    navigation.navigate("BMI");
  };

  function handleNavigateToTemp() {
    navigation.navigate("Temp");
  };

  function handleNavigateToWeight() {
    navigation.navigate("Weight");
  };

  function handleNavigateToTaskTracker() {
    navigation.navigate("TaskTracker");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Utility Hub</Text>
      <Text style={styles.subHeader}>Choose a tool to get started</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={handleNavigateToBMI}>
          <Image source={require("../assets/BMI.png")} style={styles.img} />
          <Text style={styles.cardTitle}>BMI Calculator</Text>
          <Text style={styles.cardDesc}>Calculate your BMI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleNavigateToTemp}>
          <Image source={require("../assets/Temp.png")} style={styles.img} />
          <Text style={styles.cardTitle}>Temperature Converter</Text>
          <Text style={styles.cardDesc}>Convert temperatures instantly</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleNavigateToWeight}>
          <Image source={require("../assets/Weight.png")} style={styles.img} />
          <Text style={styles.cardTitle}>Weight Converter</Text>
          <Text style={styles.cardDesc}>Convert from weight unit to another</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleNavigateToTaskTracker}>
          <Image source={require("../assets/TaskTracker.png")} style={styles.img} />
          <Text style={styles.cardTitle}>Task Tracker</Text>
          <Text style={styles.cardDesc}>Track your daily tasks</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fc",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "800",
    color: "#04027b",
  },

  subHeader: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 220,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",

    // shadow (premium soft card)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0104a0",
    textAlign: "center",
  },

  cardDesc: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
  },
})