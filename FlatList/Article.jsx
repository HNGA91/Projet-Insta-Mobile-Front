import { Image, Pressable, Text, View } from "react-native";
import styles from "../styles/Styles";

// Composant pour afficher un produit
const Articles = ({ item, onAddToCart, onAddToFavorite, isLogin }) => (
	<View>
		<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
			<Image source={{ uri: item.image }} style={styles.image} />
			<View style={styles.info}>
				<Text style={styles.nom}>{item.name}</Text>
				<Text style={styles.prix}>{item.prix}€</Text>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
				<View>
					<Pressable onPress={onAddToCart}>
						{({ pressed }) => (
							<Text
								style={{
									backgroundColor: "#1c5be4ff",
									padding: 10,
									borderRadius: 8,
									color: "white",
									width: 130,
									textAlign: "center",
								}}
							>
								Ajouter au panier
							</Text>
						)}
					</Pressable>
                    {isLogin &&
						<Pressable onPress={onAddToFavorite}>
							{({ pressed }) => (
								<Text
									style={{
										backgroundColor: "#f3c808ff",
										padding: 10,
										borderRadius: 8,
										color: "black",
										width: 130,
										marginTop: 10,
										textAlign: "center",
									}}
								>
									Favoris
								</Text>
							)}
						</Pressable>
                    }
				</View>
			</View>
		</View>
	</View>
);

export default Articles;