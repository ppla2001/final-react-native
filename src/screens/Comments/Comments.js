import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
    };
  }

  componentDidMount() {
    // console.log(this.props);
    const docId = this.props.route.params.id;
    // console.log(docId);
    db.collection("messages")
      .doc(docId)
      .onSnapshot((doc) => {
        // console.log(doc.data().comments)
        this.setState({
          comments: doc.data().comments,
        });
      });
    //   .then();
    //   .catch((e) => console.log(e));
  }

  sendComment(theComment) {
    const comment = {
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      description: theComment,
    };
    if (theComment !== "") {
      db.collection("messages")
        .doc(this.props.route.params.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
        })
        .then(
          (response) => console.log(response),
          this.setState({ newComment: "" })
        )
        .catch((e) => console.log(e));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Comments</Text> */}
        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text>{item.owner}</Text>
              <Text> {item.description}</Text>
            </View>
          )}
        ></FlatList>
        <View>
          <TextInput
            placeholder="Comment"
            onChangeText={(text) => this.setState({ newComment: text })}
            value={this.state.newComment}
            keyboardType="default"
            style={styles.inputComment}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.sendComment(this.state.newComment)}
            style={styles.btnComment}
          >
            <Text>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    marginTop: 30,
  },
  containerComment: {
    flexDirection: "row",
    width: "90%",
  },
  inputComment: {
    borderWidth: 1,
    backgroundColor: "#c3c3c3",
    width: "80%",
  },
  btnComment: {
    width: "80%",
    padding: 10,
    backgroundColor: "#d3d3d3",
  },
});
