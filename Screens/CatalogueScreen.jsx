import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import styles from "../styles/Styles";
import { produits } from "../FlatList/Data";
import Articles from "../FlatList/Article";

const CatalogueScreen = ({ navigation, panier, setPanier, isLogin, favoris, setFavoris }) => {
	//Fonction qui sert à ajouter des articles au panier
	const ajouterAuPanier = (produit) => {
		setPanier((prev) => {
			const existe = prev.find((item) => item.id === produit.id);
			if (existe) {
				return prev.map((item) => (item.id === produit.id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
			} else {
				return [...prev, { ...produit, quantite: 1 }];
			}
		});
	};

	//Fonction qui sert à ajouter des articles à la liste des favoris
	const ajouterAuFavoris = (produit) => {
		setFavoris((prev) => {
			const existe = prev.find((item) => item.id === produit.id);
			if (existe) {
				return prev.map((item) => (item.id === produit.id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
			} else {
				return [...prev, { ...produit, quantite: 1 }];
			}
		});
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text style={styles.title}>Liste des produits</Text>
				<TouchableOpacity style={styles.cartBadge} onPress={() => navigation.navigate("Panier")}>
					<Text style={styles.cartText}>
						🛒 {panier.reduce((s, i) => s + (i.quantite || 1), 0)} |{" "}
						{panier.length > 0 ? panier.reduce((acc, i) => acc + i.prix * (i.quantite || 1), 0).toFixed(2) : 0} €
					</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={produits}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Articles
						item={item}
						onAddToCart={() => ajouterAuPanier(item)}
						onAddToFavorite={() => ajouterAuFavoris(item)}
						isLogin={isLogin}
					/>
				)}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
};

export default CatalogueScreen;