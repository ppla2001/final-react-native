import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.color1}>
          <Text> 1</Text>
        </View>
        <View style={styles.color2}>
          <Text> 2</Text>
        </View>
        <View style={styles.color3}>
          <Text> 3</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  color1: {
    flex: 1,
    backgroundColor: "red",
  },
  color2: {
    flex: 2,
    backgroundColor: "blue",
  },
  color3: {
    flex: 5,
    backgroundColor: "green",
  },
});
