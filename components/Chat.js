import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  LogBox,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

// Module to save data within browser cache
import AsyncStorage from "@react-native-community/async-storage";

// Module to check if machine is online or offline
import NetInfo from "@react-native-community/netinfo";

import MapView from "react-native-maps";

import CustomActions from "./CustomActions";

const firebase = require("firebase");
require("firebase/firestore");

LogBox.ignoreLogs([
  "Setting a timer for a long period of time",
  "Animated.event now requires a second argument for options",
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      image: null,
      location: null,
      uid: "",
      user: {
        _id: "",
        name: "",
      },
      isConnected: null,
    };
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD_TfZ3Lyysf2HRFhvqdYWVPDjJxgsM_cc",
      authDomain: "chataway-d7aa1.firebaseapp.com",
      projectId: "chataway-d7aa1",
      storageBucket: "chataway-d7aa1.appspot.com",
      messagingSenderId: "745169961622",
      appId: "1:745169961622:web:4c7f7117f2b63ea36f38b7",
      measurementId: "G-2ZBCT0H56B",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  async getMessages() {
    try {
      const messages = (await AsyncStorage.getItem("messages")) || "[]";
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // use netinfo to check if machine is online or offline
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // connect to messages collection
        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");

        // this unfortunatelly named method (authUnsubscribe) listens for changes in auth state and signs in user if no user is already signed in.
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            //update user state with currently active user data
            this.setState({
              uid: user._id,
              user: {
                _id: user.uid,
                name: name,
                avatar: "http://placeimg.com/140/140/any",
              },
              image: this.state.image,
              location: {
                latitude: 48.864601,
                longitude: 2.398704,
              },
            });

            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
        this.saveMessages();
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
        Alert.alert("You are offline, no messages can be sent!");
      }
    });

    let { name } = this.props.route.params; // use destructuring
    this.props.navigation.setOptions({ title: name });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
    this.authUnsubscribe && this.authUnsubscribe();
  }

  onSend(messages = []) {
    messages.forEach((message) => this.referenceChatMessages.add(message));

    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor:
              this.props.route.params.bgcolor === "#090C08"
                ? "#474056"
                : "#090C08",
          },
        }}
      />
    );
  }

  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    let { bgcolor } = this.props.route.params; //destructure props and use as variables
    const { user } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: bgcolor }}>
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={user}
        />
        {/* check if android and do not let keyboard cover input field */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
