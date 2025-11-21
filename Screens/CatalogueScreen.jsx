import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList, View, TextInput, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "../styles/Styles";
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { UserContext } from "../Context/Context";

const CatalogueScreen = ({ navigation, favoris, setFavoris }) => {
	const [erreur, setErreur] = useState(null);
	const [recherche, setRecherche] = useState("");

	// Etat pour les descriptions individuelles : { idArticle: boolean }
	const [descriptionVisible, setDescriptionVisible] = useState({});

	// Accès au context
	const { user, articles, setArticles, panier, setPanier } = useContext(UserContext);
	const isLogin = !!user; // ← Récupéré du contexte

	//Fonction qui sert à ajouter des articles au panier
	const ajouterAuPanier = useCallback(
		(article) => {
			setPanier((prev) => {
				// 1. Vérifier si l'article existe déjà
				const existe = prev.find((item) => item._id === article._id);
				if (existe) {
					// 2. Si OUI : augmenter la quantité de 1
					return prev.map((item) => (item._id === article._id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
				} else {
					// 3. Si NON : ajouter nouvel article avec quantité 1
					return [...prev, { ...article, quantite: 1 }];
				}
			});
		},
		[setPanier]
	);

	//Fonction qui sert à ajouter des articles à la liste des favoris
	const ajouterAuFavoris = useCallback(
		(produit) => {
			setFavoris((prev) => {
				// 1. Vérifier si l'article existe déjà
				const existe = prev.find((item) => item._id === produit._id);
				if (existe) {
					// 2. Si OUI : augmenter la quantité de 1
					return prev.map((item) => (item._id === produit._id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
				} else {
					// 3. Si NON : ajouter nouvel article avec quantité 1
					return [...prev, { ...produit, quantite: 1 }];
				}
			});
		},
		[setPanier]
	);

	useEffect(() => {
		const chargerArticles = async () => {
			try {
				const res = await fetch("http://*******:3000/api/articles");

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
	}, [setArticles]);

	// Fonction pour la barre de recherche
	const articlesFiltres = useMemo(() => {
		return articles.filter((a) => a.name.toLowerCase().includes(recherche.toLowerCase()));
	}, [articles, recherche]);

	// Fonction Toggle pour le ToggleButton (afficher/masquer la description de chaque article)
	const toggleDescription = useCallback((id) => {
		setDescriptionVisible((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	}, []);

	// if (loading) return <ActivityIndicator style={styles.loader} />;
	if (erreur) return <Text style={styles.erreur}>Erreur : {erreur}</Text>;

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

			<View style={{ backgroundColor: "#fff" }}>
				<TextInput
					placeholder="Rechercher un article..."
					value={recherche}
					onChangeText={setRecherche}
					style={{
						borderWidth: 1,
						borderColor: "#110404ff",
						borderRadius: 8,
						padding: 10,
						marginBottom: 20,
						width: 380,
						marginLeft: 15,
					}}
				/>
			</View>
			<FlatList
				data={articlesFiltres}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					const isVisible = descriptionVisible[item._id] || false;
					return (
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
											<Pressable onPress={() => ajouterAuFavoris(item)}>
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
							<Pressable onPress={() => toggleDescription(item._id)}>
								{({ pressed }) => (
									<Text
										style={{
											backgroundColor: "#1c5be4ff",
											padding: 10,
											color: "white",
											flex: 1,
											textAlign: "center",
										}}
									>
										{isVisible ? "Masquer les détails" : "Afficher les détails"}
									</Text>
								)}
							</Pressable>
							{isVisible && (
								<View>
									<Text>Description technique :</Text>
									<Text>
										- Matériau: Coton 100%{"\n"}- Dimensions: 30x40 cm{"\n"}- Poids: 250g{"\n"}- Couleur: Bleu marine{"\n"}-
										Entretien: Lavable en machine
									</Text>
								</View>
							)}
						</View>
					);
				}}
				ListEmptyComponent={
					recherche.length > 0 ? <Text>Aucun produit ne correspond à "{recherche}".</Text> : <Text>Aucun produit disponible.</Text>
				}
			/>
		</View>
	);
};

export default CatalogueScreen;