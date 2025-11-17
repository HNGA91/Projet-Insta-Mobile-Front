import { Button, View, Alert, TouchableOpacity, Pressable, StyleSheet, Text } from "react-native";

const ButtonSimple = () => {
	return (
		<View>

			{/* Bouton simple */}
			<Button title="Cliquez-moi" onPress={() => Alert.alert("Bouton cliqué !")} color="#841584" disabled={false} />

			{/* Bouton touchable opacity */}
			<TouchableOpacity style={{ backgroundColor: "blue", padding: 15, borderRadius: 8 }} onPress={() => console.log("Cliqué")}>
				<Text style={{ color: "white", textAlign: "center" }}>Mon bouton</Text>
			</TouchableOpacity>

			{/* Bouton pressable */}
			<Pressable onPress={() => console.log("Cliqué")} onLongPress={() => console.log("Appui long")}>
				{({ pressed }) => <Text style={[StyleSheet.buttonText, { color: "#fff" }]}>{pressed ? "Appuyé !" : "Appuyez-moi"}</Text>}
			</Pressable>

		</View>
	);
}

export default ButtonSimple;