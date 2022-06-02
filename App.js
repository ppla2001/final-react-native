import React from "react";
import { View } from "react-native";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";

export default function App() {
  return (
    <View>
      <Login></Login>
      <Register></Register>
    </View>
  );
}
