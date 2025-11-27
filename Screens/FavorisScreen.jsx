import React, { useContext, memo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../Styles/Styles";
import { PanierContext } from "../Context/PanierContext";
import { useCalculsPanier } from "../Hooks/useCalculsPanier";
import { FavorisContext } from "../Context/FavorisContext";
import { UserContext } from "../Context/UserContext";
import FavorisItem from "../Components/FlatList/FavorisItem.jsx";

const FavorisScreen = memo(({ navigation }) => {
	// Accès au context
	const { favoris, supprimerDesFavoris } = useContext(FavorisContext);
	const { ajouterAuPanier } = useContext(PanierContext);
	const { user } = useContext(UserContext);

	// Accès au hook personnalisé
	const { totalPanier, nombreArticlesPanier } = useCalculsPanier();

	// Affiche un message si il n'y a pas de favoris
	if (favoris.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18 }}>Aucun favoris pour le moment</Text>
			</View>
		);
	}

	// OPTIMISATION : Fonction renderItem de la flatlist mémorisée
	const renderFavorisItem = useCallback(
		({ item }) => <FavorisItem item={item} onSupprimer={supprimerDesFavoris} onAjouterPanier={ajouterAuPanier} />,
		[supprimerDesFavoris, ajouterAuPanier]
	);

	if (!user) {
        return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18 }}>⛔ Veuillez vous connecter pour accéder à vos favoris.</Text>
			</View>
		); 
    }

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>⭐ Mes favoris ({favoris.length})</Text>
				<View>
					<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
						<Text style={styles.cartText}>
							🛒 {nombreArticlesPanier} | {totalPanier.toFixed(2)} €
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FlatList
				data={favoris}
				keyExtractor={(item, index) => (item._id ? item._id : `favoris-${index}`)}
				renderItem={renderFavorisItem}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
});

export default FavorisScreen;
