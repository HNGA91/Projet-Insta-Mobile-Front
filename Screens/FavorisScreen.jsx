import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../Context/Context";

const FavorisScreen = ({ navigation, favoris, setFavoris }) => {

    // Accès au context
    const { panier, setPanier } = useContext(UserContext);

	// Ajouter un article au panier (ou augmenter sa quantité)
	const ajouterAuPanier = (article) => {
		setPanier((prev) => {
			const existe = prev.find((item) => item._id === article._id);
			if (existe) {
				return prev.map((item) => (item._id === article._id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
			} else {
				return [...prev, { ...article, quantite: 1 }];
			}
		});
	};

	// Supprimer un article de la liste des favoris
	const supprimerDesFavoris = (id) => {
		setFavoris((prev) => {
			return prev
				.map((item) => (item._id === id ? { ...item, quantite: (item.quantite || 1) - 1 } : item))
				.filter((item) => (item.quantite || 0) > 0);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>⭐ Mes favoris ({favoris.length})</Text>
				<View>
					<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
						<Text style={styles.cartText}>
							🛒 {panier.reduce((s, i) => s + (i.quantite || 1), 0)} |{" "}
							{panier.length > 0 ? panier.reduce((acc, i) => acc + i.prix * (i.quantite || 1), 0).toFixed(2) : 0} €
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FlatList
				data={favoris}
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
								onPress={() => supprimerDesFavoris(item._id)}
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
								<Text>
									<Ionicons name="cart" size={23} color="white" />
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
};

export default FavorisScreen;
