import React from "react";
import { View, Text } from "react-native";

export default class Chat extends React.Component {
	componentDidMount() {
		let name = this.props.route.params.name; // OR ...
		// let { name } = this.props.route.params;

		this.props.navigation.setOptions({ title: name });
	}

	render() {
		let { name, bgcolor } = this.props.route.params; //destructure props and use as variables

		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: bgcolor,
				}}
			>
				<Text
					style={{
						color: bgcolor === "#090C08" || bgcolor === "#474056" ? "#fff" : "#000", //Check colors and if they are the dark ones, make text color white.
					}}
				>
					Hello {name}!
				</Text>
			</View>
		);
	}
}
