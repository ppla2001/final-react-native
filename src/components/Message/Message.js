import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../firebase/config";
import firebase from "firebase";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numLikes: 0,
      myLike: false,
      arrLikes: [],
      arrComments: [],
    };
  }

  componentDidMount() {
    const document = this.props.info.data;

    const isMyLike = document.likes.includes(auth.currentUser.email);
    if (document.likes) {
      this.setState({
        numLikes: document.likes.length,
      });
    }

    if (isMyLike) {
      this.setState({
        myLike: true,
      });
    }
  }

  like() {
    db.collection("messages")
      .doc(this.props.info.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((response) => {
        this.setState({
          myLike: true,
          numLikes: this.state.numLikes + 1,
        });
      })
      .catch((e) => console.log(e));
  }

  unlike() {
    db.collection("messages")
      .doc(this.props.info.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then((response) => {
        this.setState({
          myLike: false,
          numLikes: this.state.numLikes - 1,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    const document = this.props.info.data;
    return (
      <>
        <View style={styles.container}>
          <View>
            <Text style={styles.messageOwner}>{document.owner}</Text>
            <Text style={styles.messageText}>{document.message}</Text>
          </View>

          <View style={styles.containerLike}>
            <Text style={styles.likesCounter}> {this.state.numLikes}</Text>
            {this.state.myLike ? (
              <TouchableOpacity onPress={() => this.unlike()}>
                <FontAwesome name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.like()}>
                <FontAwesome name="heart-o" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Comments", {
              id: this.props.info.id,
            })
          }
        >
          <Text>Comentar</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 5,
    backgroundColor: "#F5E6E8",
    marginHorizontal: 10,
    marginTop: 8,
  },
  messageOwner: {
    fontWeight: 600,
  },
  messageText: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  containerLike: {
    flexDirection: "row",
  },
  likesCounter: {
    marginRight: 8,
  },
});
