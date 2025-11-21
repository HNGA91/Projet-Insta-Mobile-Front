import { createContext, useState } from "react";

//Créer un context - une sorte de "zone mémoire partagée"
export const UserContext = createContext();

//Definir le fournisseur du context
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [articles, setArticles] = useState([]);
	const [panier, setPanier] = useState([]);

	// Fonction de connexion
	const login = (userData) => {
		setUser(userData);
	};

	// Fonction de déconnexion
	const logout = () => {
		setUser(null);
		setPanier([]);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				articles,
				setArticles,
				panier,
				setPanier,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
