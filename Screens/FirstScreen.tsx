import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomBtn from "../Components/CustomBtn";

type FirstScreenNavigationProp = NativeStackNavigationProp<any, "FirstScreen">;

const FirstScreen: React.FC = () => {
  const navigation = useNavigation<FirstScreenNavigationProp>();

  function handleNavigate() {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/UtilityHub icon(No BG).png")}
        style={styles.icon}
      />

      <Text style={styles.title}>Welcome to Utility Hub</Text>

      <CustomBtn title="Get Started" onPress={handleNavigate} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50,
  }
});