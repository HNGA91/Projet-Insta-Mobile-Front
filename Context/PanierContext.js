import React, { createContext, useState, useCallback } from "react";
import { Alert } from "react-native";

//Créer un context - une sorte de "zone mémoire partagée"
export const PanierContext = createContext();

//Definir le fournisseur du context
export const PanierProvider = ({ children }) => {
	const [panier, setPanier] = useState([]);

	// Ajouter un article (ou augmenter sa quantité)
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
		[]
	);

	// Supprimer un article (ou diminuer sa quantité)
	const supprimerDuPanier = useCallback(
		(id) => {
			setPanier((prev) => {
				// 1. Diminuer la quantité de 1 pour l'article ciblé
				return (
					prev
						.map((item) => (item._id === id ? { ...item, quantite: (item.quantite || 1) - 1 } : item))
						// 2. Filtrer pour garder seulement les articles avec quantite > 0
						.filter((item) => (item.quantite || 0) > 0)
				);
			});
		},
		[]
	);

    // Vider entièrement le panier avec confirmation avant
        const viderLePanier = useCallback(() => {
            Alert.alert("Confirmation", "Voulez-vous vraiment vider le panier ?", [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Oui, je confirme",
                    style: "destructive",
                    onPress: () => setPanier([]),
                },
            ]);
        }, [setPanier]
    );

	return (
		<PanierContext.Provider
			value={{
				panier,
				setPanier,
				ajouterAuPanier,
				supprimerDuPanier,
				viderLePanier,
			}}
		>
			{children}
		</PanierContext.Provider>
	);
};
