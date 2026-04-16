import "react-native-gesture-handler";
import "react-native-screens"
import { NavigationContainer } from "@react-navigation/native";
import Nav from "./Navigation/Nav";

export default function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}

