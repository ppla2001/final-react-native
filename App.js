import React from "react";
import { View } from "react-native";
import TabNavigation from "./src/Navigation/TabNavigation";
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";

export default function App() {
  return <TabNavigation></TabNavigation>;
}
