import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { db } from "../../firebase/config";
import Message from "../../components/Message/Message";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("messages").onSnapshot((docs) => {
      const messages = [];

      docs.forEach((e) => {
        messages.push({
          id: e.id,
          data: e.data(),
        });
      });

      this.setState(
        {
          data: messages,
          loading: false,
        },
        () => console.log(this.state.data)
      );
    });
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        {!this.state.loading ? (
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Message info={item}></Message>}
          ></FlatList>
        ) : (
          <ActivityIndicator size={24} color="Black" />
        )}
      </View>
    );
  }
}
