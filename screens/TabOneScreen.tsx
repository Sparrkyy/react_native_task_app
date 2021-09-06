import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Log in / Sign up</Text>
			<Text>Username</Text>
			<TextInput
				style={{ height: 40, width: 200, borderColor: "gray", borderWidth: 1, padding: 10, color: "white" }}
				onChangeText={(text) => setUsername(text)}
				value={username}
			></TextInput>
			<Text>Password</Text>
			<TextInput
				style={{ height: 40, width: 200, borderColor: "gray", borderWidth: 1, padding: 10, color: "white" }}
				onChangeText={(text) => setPassword(text)}
				value={password}
			></TextInput>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 40,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
