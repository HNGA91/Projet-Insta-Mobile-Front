import React, { memo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../Styles/Styles";

const FavorisItem = memo(({ item, onSupprimer, onAjouterPanier }) => {
	return (
		<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
			<Image
				source={{ uri: item.image }}
				style={styles.image}
				resizeMode="cover" // Évite les déformations
				fadeDuration={300} // Transition plus fluide
			/>
			<View style={styles.info}>
				<Text>{item.name}</Text>
				<Text>{item.prix}€</Text>
			</View>

			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
				<Pressable
					onPress={() => onSupprimer(item._id)}
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
				</Pressable>

				<Pressable
					onPress={() => onAjouterPanier(item)}
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
				</Pressable>
			</View>
		</View>
	);
});

export default FavorisItem;
