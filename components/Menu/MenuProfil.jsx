import React from "react";
import { View, TouchableOpacity, Pressable, StyleSheet, Text, ScrollView } from "react-native";
import styles from "../../styles/Styles";

const MenuProfil = ({ navigation, panier, setIsLogin }) => {
	const handleDeconnexion = () => {
		setIsLogin(false); // Remet l'état global à "déconnecté"
		navigation.replace("Plateforme E-Commerce"); // Retour automatique à l'accueil
	};

	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.title}>Mon compte</Text>
				<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
					<Text style={styles.cartText}>
						🛒 {panier.reduce((s, i) => s + (i.quantite || 1), 0)} |{" "}
						{panier.length > 0 ? panier.reduce((acc, i) => acc + i.prix * (i.quantite || 1), 0).toFixed(2) : 0} €
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView horizontal={true} contentContainerStyle={{ height: 50 }} showsHorizontalScrollIndicator={false}>
				<View style={{ backgroundColor: "#1c5be4ff", justifyContent: "center", flexDirection: "row", width: 435 }}>
					<Pressable onPress={() => navigation.navigate("Plateforme E-Commerce")}>
						{({ pressed }) => <Text style={{ padding: 10, borderRadius: 8, color: "white" }}>Accueil</Text>}
					</Pressable>
					<Pressable onPress={() => navigation.navigate("Catalogue")}>
						{({ pressed }) => <Text style={{ padding: 10, borderRadius: 8, color: "white" }}>Catalogue</Text>}
					</Pressable>
					<Pressable onPress={handleDeconnexion}>
						<Text style={{ padding: 10, borderRadius: 8, color: "white" }}>Se déconnecter</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
};

export default MenuProfil;