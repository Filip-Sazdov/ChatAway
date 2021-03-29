import React from "react";
import { View, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

export default class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../assets/background-image.png")} style={styles.image}>
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
								<Icon name="user" type="antdesign" color="gray" style={{ marginLeft: 15, marginRight: 10 }} />
								<TextInput
									style={{
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
								<View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
									<View style={{ width: 40, height: 40, backgroundColor: "#090C08", borderRadius: 20 }}></View>
									<View style={{ width: 40, height: 40, backgroundColor: "#474056", borderRadius: 20 }}></View>
									<View style={{ width: 40, height: 40, backgroundColor: "#8A95A5", borderRadius: 20 }}></View>
									<View style={{ width: 40, height: 40, backgroundColor: "#B9C6AE", borderRadius: 20 }}></View>
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
								onPress={() => this.props.navigation.navigate("Chat", { name: this.state.name })}
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
		flex: 0.44,
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
});
