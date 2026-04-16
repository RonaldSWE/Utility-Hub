import "react-native-gesture-handler";
import "react-native-screens"
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "../Screens/FirstScreen";
import Home from "../Screens/Home";
import BMI from "../Screens/BMI";
import Weight from "../Screens/Weight";
import Temp from "../Screens/Temp";
import TaskTracker from "../Screens/TaskTracker";
import { View } from "react-native";

const Stack = createStackNavigator();

const Nav: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue", // or "#001aff"
        },
        headerTintColor: "#fff", // makes back button + title white
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      initialRouteName="FirstScreen"
    >
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ title: "Utility Hub" }} />
      <Stack.Screen name="BMI" component={BMI} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="Temp" component={Temp} />
      <Stack.Screen name="TaskTracker" component={TaskTracker} />
    </Stack.Navigator>
  );
};

export default Nav;
