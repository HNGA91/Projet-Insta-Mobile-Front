import React, { createContext, useState } from "react";

//Créer un context - une sorte de "zone mémoire partagée"
export const UserContext = createContext();

//Definir le fournisseur du context
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	// Fonction de connexion
	const login = (userData) => {
		setUser(userData);
	};

	// Fonction de déconnexion
	const logout = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
