import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import TabNavigation from "./TabNavigation";
import Comments from "../screens/Comments/Comments";
import { auth, db } from "../firebase/config";

const Stack = createNativeStackNavigator();

export default class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: false,
      errorMessageRegister: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ Logged: true });
      }
    });
  }

  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => this.setState({ Logged: true }))
      .catch((e) => console.log(e));
  }

  register(email, password, username) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        db
          .collection("users")
          .add({
            owner: email,
            name: username,
            createdAt: Date.now(),
          })
          .catch((e) => console.log(e))
      )
      .then((response) => this.setState({ Logged: true }))
      .catch((e) => this.setState({ errorMessageRegister: e.message }));
  }

  logout() {
    auth
      .signOut()
      .then((response) => this.setState({ Logged: false }))
      .catch((e) => console.log(e));
  }

  newMessage(message) {
    db.collection("messages")
      .add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        message: message,
        likes: [],
        comments: [],
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.Logged ? (
            <Stack.Group>
              <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
                options={{ headerShown: false }}
                initialParams={{
                  logout: (email, password) => this.logout(email, password),
                  newMessage: (message) => this.newMessage(message),
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Comments"
                component={Comments}
                options={{ headerShown: false }}
                initialParams={{
                  newComment: (message) => this.newComment(message),
                }}
              ></Stack.Screen>
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
                initialParams={{
                  login: (email, password) => this.login(email, password),
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Register"
                children={(props) => (
                  <Register
                    register={(email, password, username) =>
                      this.register(email, password, username)
                    }
                    errorMessageRegister={this.state.errorMessageRegister}
                    {...props}
                  ></Register>
                )}
                options={{ headerShown: false }}
                initialParams={{
                  register: (email, password) => this.register(email, password),
                }}
              ></Stack.Screen>
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
