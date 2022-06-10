import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nuevo Mensaje</Text>
        <TextInput
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
          style={styles.textField}
        ></TextInput>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.route.params.newMessage(this.state.message),
              this.setState({ message: "" });
          }}
        >
          <Text style={styles.btnTxt}>Enviar Mensaje</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textField: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 10,
    color: "black",
  },
  btn: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  btnTxt: {
    color: "#fff",
  },
});
