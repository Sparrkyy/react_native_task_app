import * as React from "react";
import { StyleSheet, TextInput, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const TESTING_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM0ZjEyMjlhODM0ZTAwMTY1MjZiMWUiLCJpYXQiOjE2MzA4NTk1NTR9.TmCNPZcXbiHIji4e9SEAbolyI42LBLX38QzWz4KsH2U";

interface oneTask {
	__v: number;
	_id: string;
	completed: boolean;
	description: string;
	owner: string;
}

export default function TabTwoScreen() {
	const [todos, setTodos] = React.useState<oneTask[]>([]);
	const [input, setInput] = React.useState("");

	React.useEffect(() => {
		const getTasks = async () => {
			const alltasks = await fetch("https://task-manager-api-v2.herokuapp.com/tasks", {
				method: "GET",
				cache: "default",
				headers: {
					Authorization: TESTING_TOKEN,
					"Content-Type": "application/json",
				},
			});
			const tasks: oneTask[] = await alltasks.json();
			console.log(tasks);
			setTodos(tasks);
		};
		getTasks();
	}, []);

	const handleItemAdd = async () => {
		const taskToSave = { description: input, completed: false };
		setInput("");
		console.log(taskToSave);
		try {
			const savedTask = await fetch("https://task-manager-api-v2.herokuapp.com/tasks", {
				method: "POST",
				headers: {
					Authorization: TESTING_TOKEN,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskToSave),
			});
			const jsonTask = await savedTask.json();
			setTodos([...todos, jsonTask]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleItemDelete = async (ele: oneTask) => {
		setTodos((prev) => prev.filter((item) => item._id !== ele._id));
		try {
			await fetch("https://task-manager-api-v2.herokuapp.com/tasks/" + ele._id, {
				method: "DELETE",
				headers: {
					Authorization: TESTING_TOKEN,
					"Content-Type": "application/json",
				},
			});
		} catch (e) {}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>To Do</Text>
			<View>
				<TextInput style={styles.textInput} onChangeText={(text) => setInput(text)} value={input}></TextInput>
				<Button title='add a to do' onPress={(press) => handleItemAdd()}>
					Add
				</Button>
			</View>

			<View>
				{todos.map((ele, i) => {
					return (
						<View
							key={i}
							style={{
								height: 40,
								minWidth: 300,
								borderColor: "gray",
								borderWidth: 1,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								padding: 1,
								justifyContent: "space-evenly",
							}}
						>
							<Text style={{ textAlign: "center" }}>{ele.description}</Text>
							<Button title='Delete' onPress={() => handleItemDelete(ele)}></Button>
						</View>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	textInput: {
		height: 40,
		width: 200,
		borderColor: "gray",
		borderWidth: 1,
		padding: 10,
		color: "white",
		marginTop: 20,
	},
	toDoItem: {
		height: 40,
		width: 200,
	},
});
