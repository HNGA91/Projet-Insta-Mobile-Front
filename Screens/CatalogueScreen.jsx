import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList, View, TextInput, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "../styles/Styles";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/Context";

const CatalogueScreen = ({ navigation, isLogin, favoris, setFavoris }) => {

	const [erreur, setErreur] = useState(null);
	const [recherche, setRecherche] = useState("");

    // Accès au context
    const { articles, setArticles, panier, setPanier } = useContext(UserContext);

	//Fonction qui sert à ajouter des articles au panier
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

	//Fonction qui sert à ajouter des articles à la liste des favoris
	const ajouterAuFavoris = (produit) => {
		setFavoris((prev) => {
			const existe = prev.find((item) => item._id === produit._id);
			if (existe) {
				return prev.map((item) => (item._id === produit._id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
			} else {
				return [...prev, { ...produit, quantite: 1 }];
			}
		});
	};

    useEffect(() => {
            const chargerArticles = async () => {
                try {
					const res = await fetch("http://192.168.1.102:3000/api/articles");

					if (!res.ok) {
						//throw = lancer une erreur (interruption immédiate).
						// new Error() = créer un objet erreur avec message, nom et stack.
						throw new Error("Article introuvable");
					}

					const data = await res.json();
					setArticles(data); // mise à jour de l’état avec les données reçues
				} catch (err) {
                    setErreur(err.message); // capture et affichage de l’erreur
                } finally {
                    // setLoading(false); // fin du chargement dans tous les cas
                }
            };
    
            chargerArticles();
    }, []);
    
    // if (loading) return <ActivityIndicator style={styles.loader} />;
    if (erreur) return <Text style={styles.erreur}>Erreur : {erreur}</Text>;
    
    const articlesFiltres = articles.filter((a) => a.name.toLowerCase().includes(recherche.toLowerCase()));

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

			<TextInput
				placeholder="Rechercher un article..."
				value={recherche}
				onChangeText={setRecherche}
				style={{
					borderWidth: 1,
					borderColor: "#110404ff",
					borderRadius: 5,
					padding: 8,
					marginBottom: 10,
					width: 380,
					marginLeft: 15,
				}}
			/>
			<FlatList
				data={articlesFiltres}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View>
						<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
							<Image source={{ uri: item.image }} style={styles.image} />
							<View style={styles.info}>
								<Text style={styles.nom}>{item.name}</Text>
								<Text style={styles.prix}>{item.prix}€</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
								<View>
									<Pressable onPress={() => ajouterAuPanier(item)}>
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
									{isLogin && (
										<Pressable onPress={ajouterAuFavoris}>
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
									)}
								</View>
							</View>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default CatalogueScreen;