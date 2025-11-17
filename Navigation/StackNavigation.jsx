import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../components/Menu/Menu";
import MenuProfil from "../components/Menu/MenuProfil";
import CatalogueScreen from "../Screens/CatalogueScreen";
import PanierScreen from "../Screens/PanierScreen";
import InscriptionFormScreen from "../Screens/InscriptionFormScreen";
import ConnexionFormScreen from "../Screens/ConnexionFormScreen";
import FavorisScreen from "../Screens/FavorisScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

	const [panier, setPanier] = useState([]);
	const [favoris, setFavoris] = useState([]);
	const [isLogin, setIsLogin] = useState(false);

	return (
		<Stack.Navigator
			initialRouteName="Plateforme E-Commerce"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#1c5be4ff",
				},
				headerTintColor: "#fff",
			}}
		>
			{/* Écrans publics */}
			<Stack.Screen
				name="Plateforme E-Commerce"
				children={(props) => (
					<Menu {...props} panier={panier} setPanier={setPanier} isLogin={isLogin} favoris={favoris} setFavoris={setFavoris} />
				)}
			/>
			<Stack.Screen
				name="Catalogue"
				children={(props) => (
					<CatalogueScreen {...props} panier={panier} setPanier={setPanier} isLogin={isLogin} favoris={favoris} setFavoris={setFavoris} />
				)}
			/>
			<Stack.Screen name="Panier" children={(props) => <PanierScreen {...props} panier={panier} setPanier={setPanier} isLogin={isLogin} />} />
			<Stack.Screen name="Inscription" children={(props) => <InscriptionFormScreen {...props} setIsLogin={setIsLogin} isLogin={isLogin} />} />
			<Stack.Screen name="Connexion" children={(props) => <ConnexionFormScreen {...props} setIsLogin={setIsLogin} isLogin={isLogin} />} />

			{/* Écrans protégés - seulement si connecté */}
			{isLogin && (
				<>
					<Stack.Screen
						name="Profil"
						children={(props) => <MenuProfil {...props} panier={panier} setIsLogin={setIsLogin} favoris={favoris} />}
					/>
					<Stack.Screen
						name="Favoris"
						children={(props) => (
							<FavorisScreen {...props} panier={panier} setIsLogin={setIsLogin} favoris={favoris} setFavoris={setFavoris} />
						)}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
