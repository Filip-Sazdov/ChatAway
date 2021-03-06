import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgcolor: "#090C08",
    };
  }

  render() {
    // This factory function will build all color "buttons" and assign the correct background color to them programatically.
    // It will also change the state for the bgcolor because we want to pass it to the Chat screen as props using the navigation
    const factoriseBgProps = (bgcolorinfunc) => {
      return (
        // This creates the outer rings for the default background selectors
        <TouchableOpacity
          key={bgcolorinfunc}
          style={[
            { backgroundColor: bgcolorinfunc },
            styles.defaultForColorCircles,
            this.state.bgcolor === bgcolorinfunc && styles.colorCirclesSelected,
          ]}
          onPress={() => this.setState({ bgcolor: bgcolorinfunc })}
        >
          {/* This creates the inner circles of background selectors */}
          <View
            key={bgcolorinfunc}
            style={[
              { backgroundColor: bgcolorinfunc },
              { zIndex: 1 },
              styles.defaultForSmallerCircles,
              this.state.bgcolor === bgcolorinfunc &&
                styles.colorCirclesSelected,
            ]}
          ></View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          style={styles.image}
        >
          <View style={styles.box1}>
            <Text style={styles.title}>ChatAway</Text>
          </View>
          <View style={styles.box2}>
            <View
              style={{
                flex: 1,
                width: "88%",
                alignSelf: "center",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  flex: 0.2,
                  flexDirection: "row",
                  borderColor: "gray",
                  borderWidth: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="user"
                  type="antdesign"
                  color="gray"
                  style={{ marginLeft: 15, marginRight: 10 }}
                />
                <TextInput
                  style={{
                    flex: 0.95,
                    color: "#757083",
                    opacity: 0.5,
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  placeholder="Your Name"
                />
              </View>
              <View style={{ flex: 0.33, justifyContent: "center" }}>
                <Text
                  style={{
                    color: "#757083",
                    opacity: 1,
                    fontWeight: "300",
                    fontSize: 16,
                    paddingBottom: 15,
                    textAlign: "center",
                  }}
                >
                  Choose Background Color:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {["#090C08", "#474056", "#8A95A5", "#B9C6AE"].map(
                    factoriseBgProps
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  backgroundColor: "#757083",
                  opacity: 1,
                  color: "#ffffff",
                  justifyContent: "center",
                }}
                onPress={() => {
                  if (this.state.name === "") {
                    Alert.alert("Please input a name!");
                  } else if (this.state.bgcolor === "") {
                    Alert.alert("Please select a color!");
                  } else {
                    this.props.navigation.navigate("Chat", {
                      name: this.state.name,
                      bgcolor: this.state.bgcolor,
                    }); //pass name and background color as props to the Chat view
                    this.setState({ name: "" }); // clear the state for name so the user has to input it.
                  }
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#ffffff",
                    alignSelf: "center",
                  }}
                >
                  Start Chatting
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  box1: {
    flex: 0.33,
    alignItems: "center",
    // alignContent: "center", //how does this not work for the content that is within the box???
    // justifyContent: "center",//how does this not work for the content that is within the box???
  },
  box2: {
    flex: 0.44,
    backgroundColor: "#fff",
    width: "88%",
    alignSelf: "center",
  },

  title: {
    flex: 1,
    // textAlign: "center",//This works like align self and justify self, WTF???
    // textAlignVertical: "center",//This works like align self and justify self, WTF???
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 30,
  },
  defaultForColorCircles: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
  },
  colorCirclesSelected: {
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
    transform: [{ scale: 1.5 }],
  },
  defaultForSmallerCircles: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    // padding: 10,
    // borderColor: "#fff",
    // borderWidth: 1,
  },
});
