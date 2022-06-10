import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Search from "../screens/Search/Search";
import Messages from "../screens/Messages/Messages";

const Tab = createBottomTabNavigator();

export default function TabNavigation(props) {
  // console.log(props);
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: () => <Entypo name="message" size={24} color="black" />,
        }}
        initialParams={{
          newMessage: (message) => props.route.params.newMessage(message),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Ionicons name="search-circle" size={30} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
        }}
        initialParams={{
          logout: (email, password) =>
            props.route.params.logout(email, password),
        }}
      />
    </Tab.Navigator>
  );
}
