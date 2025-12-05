import React, { useContext, memo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../Styles/Styles";
import { UserContext } from "../Context/UserContext";
import FavorisItem from "../Components/FlatList/FavorisItem.jsx";

const FavorisScreen = memo(({ navigation }) => {
	// Accès au context
	const { user, favoris, supprimerDesFavoris, ajouterAuPanier, totalPanier, nombreArticlesPanier, loading } = useContext(UserContext);

	if (!user) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18 }}>⛔ Veuillez vous connecter pour accéder à vos favoris.</Text>
			</View>
		);
	}

	// Affiche un écran de chargement en cas de chargements
	if (loading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color="#1c5be4ff" />
				<Text style={{ marginTop: 10 }}>Chargement des favoris...</Text>
			</View>
		);
	}

	// OPTIMISATION : Fonction renderItem de la flatlist mémorisée
	const renderFavorisItem = useCallback(
		({ item }) => <FavorisItem item={item} onSupprimer={supprimerDesFavoris} onAjouterPanier={ajouterAuPanier} />,
		[supprimerDesFavoris, ajouterAuPanier]
	);

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
