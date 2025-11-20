import { createContext, useState } from "react";

//Créer un context - une sorte de "zone mémoire partagée"
export const UserContext = createContext();

//Definir le fournisseur du context
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [panier, setPanier] = useState([]);

	return <UserContext.Provider value={{ user, setUser, articles, setArticles, panier, setPanier }}>{children}</UserContext.Provider>;
};
