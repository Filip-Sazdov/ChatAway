import React, { Component } from "react";
import { StyleSheet, ScrollView, View, TextInput, Text, Alert, Button } from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Start from "./components/Start";
import Chat from "./components/Chat";

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { text: "" };
	// }

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Start">
					<Stack.Screen name="Start" component={Start} />
					<Stack.Screen name="Chat" component={Chat} />
				</Stack.Navigator>
			</NavigationContainer>
			// <ScrollView>
			// 	<Text style={{ fontSize: 110 }}>This text is so big! And so long! You have to scroll!</Text>
			// </ScrollView>
			// <View style={styles.container}>
			// 	<View style={styles.box1}></View>
			// 	<View style={styles.box2}>
			// 		<TextInput
			// 			style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
			// 			onChangeText={(text) => this.setState({ text })}
			// 			value={this.state.text}
			// 			placeholder="Type here ..."
			// 		/>
			// 		<Text>You wrote: {this.state.text}</Text>
			// 		<Button title="Press me..." onPress={() => this.alertMyText({ text: this.state.text })} />
			// 	</View>
			// 	<View style={styles.box3}></View>
			// </View>
		);
	}
}
