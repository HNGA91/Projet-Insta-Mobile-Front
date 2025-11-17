import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/Styles";

const PanierScreen = ({ panier, setPanier }) => {
	// Ajouter un article (ou augmenter sa quantité)
	const ajouterAuPanier = (produit) => {
		setPanier((prev) => {
			const existe = prev.find((item) => item.id === produit.id);
			if (existe) {
				// Incrémente la quantité si déjà présent
				return prev.map((item) => item.id === produit.id ? { ...item, quantite: (item.quantite || 1) + 1 } : item);
			} else {
				// Sinon ajoute un nouvel article avec quantite = 1
				return [...prev, { ...produit, quantite: 1 }];
			}
		});
	};

	// Supprimer un article (ou diminuer sa quantité)
	const supprimerDuPanier = (id) => {
		setPanier((prev) => {
			return prev
				.map((item) => item.id === id ? { ...item, quantite: (item.quantite || 1) - 1 } : item)
				.filter((item) => (item.quantite || 0) > 0);
		});
	};

	// Vider entièrement le panier avec confirmation avant
	const viderLePanier = () => {
		Alert.alert("Confirmation", "Voulez-vous vraiment vider le panier ?", [
			{ text: "Annuler", style: "cancel" },
			{
				text: "Oui, je confirme",
				style: "destructive",
				onPress: () => setPanier([]),
			},
		]);
	};

	// Calculer le total du panier
	const totalPanier = panier.reduce((acc, item) => acc + item.prix * (item.quantite || 1), 0);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🛒 Mon Panier</Text>

			<FlatList
				data={panier}
				keyExtractor={(item, index) => item.id + "-" + index}
				renderItem={({ item }) => (
					<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
						<Image source={{ uri: item.image }} style={styles.image} />
						<View style={styles.info}>
							<Text style={styles.nom}>{item.name}</Text>
							<Text>{item.prix}€</Text>
						</View>

						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
							<TouchableOpacity
								onPress={() => supprimerDuPanier(item.id)}
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
};

export default PanierScreen;