import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [],
		};
	}
	componentDidMount() {
		let { name, bgcolor } = this.props.route.params; // use destructuring
		this.props.navigation.setOptions({ title: name });

		this.setState({
			messages: [
				{
					_id: 1,
					text: "Hello developer",
					createdAt: new Date(),
					user: {
						_id: 2,
						name: "React Native",
						avatar: "https://placeimg.com/140/140/any",
					},
				},
				{
					_id: 2,
					text: `${name} has entered the chat.`,
					createdAt: new Date(),
					system: true,
				},
			],
		});
	}
	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));
	}

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: this.props.route.params.bgcolor === "#090C08" ? "#474056" : "#090C08",
					},
				}}
			/>
		);
	}

	render() {
		let { name, bgcolor } = this.props.route.params; //destructure props and use as variables

		return (
			<View style={{ flex: 1, backgroundColor: bgcolor }}>
				<GiftedChat
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={(messages) => this.onSend(messages)}
					user={{
						_id: 1,
					}}
				/>
				{/* check if android and do not let keyboard cover input field */}
				{Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
			</View>

			// <TouchableOpacity
			// 	accessible={true}
			// 	accessibilityLabel="More options"
			// 	accessibilityHint="Lets you choose to send an image or your geolocation."
			// 	accessibilityRole="button"
			// 	onPress={this._onPress}>
			// 	<View style={styles.button}>
			// 	...
			// 	</View>
			// </TouchableOpacity>

			// <View
			// 	style={{
			// 		flex: 1,
			// 		justifyContent: "center",
			// 		alignItems: "center",
			// 		backgroundColor: bgcolor,
			// 	}}
			// >
			// 	<Text
			// 		style={{
			// 			color: bgcolor === "#090C08" || bgcolor === "#474056" ? "#fff" : "#000", //Check colors and if they are the dark ones, make text color white.
			// 		}}
			// 	>
			// 		Hello {name}!
			// 	</Text>
			// </View>
		);
	}
}
