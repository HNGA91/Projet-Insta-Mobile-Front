import React, { useContext } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from "react-native";
import styles from "../Styles/Styles";
import { PanierContext } from "../Context/PanierContext";
import { UserContext } from "../Context/UserContext";
import { useCalculsPanier } from "../Hooks/useCalculsPanier";

const ProfilScreen = ({ navigation }) => {
	const { panier, setPanier } = useContext(PanierContext);
	const { user, setUser, logout } = useContext(UserContext);

	// Accès au hook personnalisé
	const { totalPanier, nombreArticlesPanier } = useCalculsPanier();

	const handleDeconnexion = () => {
		logout(); // Appel de la fonction du contexte UserContext
		setPanier([]); // Appel de la fonction du contexte PanierContext et vide le panier
		navigation.navigate("Catalogue"); // Retour automatique à l'accueil
	};

	if (!user) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18 }}>⛔ Veuillez vous connecter pour accéder à votre profil.</Text>
                </View>
            ); 
        }

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text style={styles.title}>Bienvenue {user?.prenom ?? ""}</Text>
				<View>
					<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
						<Text style={styles.cartText}>
							🛒 {nombreArticlesPanier} | {totalPanier.toFixed(2)} €
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.disconnectBadge} onPress={handleDeconnexion}>
						<Text style={styles.disconnectText}>Se déconnecter</Text>
					</TouchableOpacity>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
				style={styles.formContainer}
			>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{ minHeight: "100%", justifyContent: "center" }}
					showsHorizontalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				></ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ProfilScreen;
