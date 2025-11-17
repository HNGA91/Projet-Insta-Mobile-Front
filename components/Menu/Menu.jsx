import React from "react";
import { View, Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/Styles";

const Menu = ({ navigation, panier, isLogin }) => {
	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.title}>Accueil</Text>
				<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
					<Text style={styles.cartText}>
						🛒 {panier.reduce((s, i) => s + (i.quantite || 1), 0)} |{" "}
						{panier.length > 0 ? panier.reduce((acc, i) => acc + i.prix * (i.quantite || 1), 0).toFixed(2) : 0} €
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView horizontal={true} contentContainerStyle={{ height: 50 }} showsHorizontalScrollIndicator={false}>
				<View style={{ backgroundColor: "#1c5be4ff", justifyContent: "center", flexDirection: "row", width: 435 }}>
					<Pressable onPress={() => navigation.navigate("Catalogue")}>
						<Text style={{ padding: 10, color: "white" }}>Catalogue</Text>
					</Pressable>

					{/* Afficher Inscription/Connexion seulement si DÉCONNECTÉ */}
					{!isLogin && (
						<>
							<Pressable onPress={() => navigation.navigate("Inscription")}>
								<Text style={{ padding: 10, color: "white" }}>Inscription</Text>
							</Pressable>
							<Pressable onPress={() => navigation.navigate("Connexion")}>
								<Text style={{ padding: 10, color: "white" }}>Connexion</Text>
							</Pressable>
						</>
					)}

					{/* Afficher Profil seulement si CONNECTÉ */}
					{isLogin && (
						<Pressable onPress={() => navigation.navigate("Profil")}>
							<Text style={{ padding: 10, color: "white" }}>Profil</Text>
						</Pressable>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default Menu;