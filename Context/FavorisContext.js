import React, { createContext, useState, useCallback } from "react";
import { Alert } from "react-native";

//Créer un context - une sorte de "zone mémoire partagée"
export const FavorisContext = createContext();

//Definir le fournisseur du context
export const FavorisProvider = ({ children }) => {
	const [favoris, setFavoris] = useState([]);

	// Fonction toggle favoris (Ajouter / Retirer)
	const toggleFavoris = useCallback(
		(article, user) => {
            if (!user) {
				Alert.alert("⛔ Connexion requise", "Veuillez vous connecter pour ajouter aux favoris");
				return;
			}

			setFavoris((prev) => {
				const existe = prev.some((item) => item._id === article._id);
				if (existe) {
					return prev.filter((item) => item._id !== article._id);
				} else {
					return [...prev, { ...article, quantite: 1 }];
				}
			});
		},
		[]
	);

    // Supprimer un article de la liste des favoris
        const supprimerDesFavoris = useCallback(
            (id) => {
                setFavoris((prev) => prev.filter((item) => item._id !== id));
            },
            []
        );

	return (
		<FavorisContext.Provider
			value={{
				favoris,
				setFavoris,
				toggleFavoris,
				supprimerDesFavoris,
			}}
		>
			{children}
		</FavorisContext.Provider>
	);
};
