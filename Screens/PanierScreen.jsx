import React, { useContext, memo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "../Styles/Styles";
import { UserContext } from "../Context/UserContext";

const PanierScreen = memo(() => {
	// Accès au context
	const { user, panier, ajouterAuPanier, supprimerDuPanier, viderLePanier, totalPanier, loading } = useContext(UserContext);

	if (!user) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18 }}>⛔ Veuillez vous connecter pour accéder à votre panier.</Text>
			</View>
		);
	}

	// Affiche un écran de chargement en cas de chargements
	if (loading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color="#1c5be4ff" />
				<Text style={{ marginTop: 10 }}>Chargement du panier...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🛒 Mon Panier</Text>

			<FlatList
				data={panier}
				keyExtractor={(item, index) => item._id + "-" + index}
				renderItem={({ item }) => (
					<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
						<Image source={{ uri: item.image }} style={styles.image} />
						<View style={styles.info}>
							<Text style={styles.nom}>{item.name}</Text>
							<Text>{item.prix}€</Text>
						</View>

						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
							<TouchableOpacity
								onPress={() => supprimerDuPanier(item._id)}
								style={{
									backgroundColor: "#e74c3c",
									width: 33,
									height: 33,
									borderRadius: 18,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 5,
								}}
							>
								<Text style={{ color: "white", fontSize: 25 }}>−</Text>
							</TouchableOpacity>

							<Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.quantite || 1}</Text>

							<TouchableOpacity
								onPress={() => ajouterAuPanier(item)}
								style={{
									backgroundColor: "#1ed354ff",
									width: 33,
									height: 33,
									borderRadius: 18,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 5,
								}}
							>
								<Text style={{ color: "white", fontSize: 25 }}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				contentContainerStyle={styles.list}
			/>

			{/* Total */}
			{panier.length > 0 && (
				<View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 20 }}>
					<TouchableOpacity onPress={viderLePanier}>
						<Text style={{ color: "red", fontWeight: "bold", fontSize: 18, marginTop: 10 }}>Vider le panier</Text>
					</TouchableOpacity>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>Total : {totalPanier.toFixed(2)} €</Text>
				</View>
			)}
		</View>
	);
});

export default PanierScreen;
