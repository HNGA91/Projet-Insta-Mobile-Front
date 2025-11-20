import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CatalogueScreen from "../Screens/CatalogueScreen";
import FavorisScreen from "../Screens/FavorisScreen";
import PanierScreen from "../Screens/PanierScreen";
import ProfilScreen from "../Screens/ProfilScreen";
import InscriptionFormScreen from "../Screens/InscriptionFormScreen";
import ConnexionFormScreen from "../Screens/ConnexionFormScreen";
import { Ionicons } from "@expo/vector-icons";


//permet de créer une navigation par tiroir (menu latéral)
const Drawer = createDrawerNavigator();

const DrawerNavigator = forwardRef(({ route, initialScreen, favoris, setFavoris, isLogin, setIsLogin }, ref) => {
    const drawerNavigatorRef = useRef();

    // Exposer les méthodes pour le parent
        useImperativeHandle(ref, () => ({
            reset: (state) => {
                if (drawerNavigatorRef.current) {
                    drawerNavigatorRef.current.reset(state);
                }
            },
        }));

	// Détermine l'écran initial basé sur la prop ou les params de navigation
	const getInitialScreen = () => {
		if (initialScreen) return initialScreen;
		if (route?.params?.initialScreen) return route.params.initialScreen;
		return "Catalogue";
	};

	return (
		<Drawer.Navigator
			initialRouteName={getInitialScreen()}
			ref={drawerNavigatorRef}
			screenOptions={{
				drawerActiveTintColor: "white",
				drawerActiveBackgroundColor: "#1c5be4ff",
				swipeEnabled: true,
				headerStyle: { backgroundColor: "#1c5be4ff" },
				headerTintColor: "white",
			}}
		>
			{/* Écrans publics */}
			<Drawer.Screen
				name="Catalogue"
				children={(props) => (
					<CatalogueScreen
						{...props}
						isLogin={isLogin}
						setIsLogin={setIsLogin}
						favoris={favoris}
						setFavoris={setFavoris}
					/>
				)}
				options={{ drawerIcon: ({ color, size }) => <Ionicons name="bag-handle-sharp" size={size} color={color} />, title: "Catalogue" }}
			/>

			{/* Écrans protégés - seulement si connecté */}
			{isLogin && (
				<Drawer.Screen
					name="Favoris"
					children={(props) => (
						<FavorisScreen
							{...props}
							setIsLogin={setIsLogin}
							favoris={favoris}
							setFavoris={setFavoris}
						/>
					)}
					options={{ drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />, title: "Favoris" }}
				/>
			)}

			{/* Écrans publics - Afficher Inscription/Connexion seulement si DÉCONNECTÉ  */}
			{!isLogin && (
				<>
					<Drawer.Screen
						name="Inscription"
						children={(props) => <InscriptionFormScreen {...props} setIsLogin={setIsLogin} isLogin={isLogin} />}
						options={{ drawerIcon: ({ color, size }) => <Ionicons name="pencil" size={size} color={color} />, title: "Inscription" }}
					/>

					<Drawer.Screen
						name="Connexion"
						children={(props) => <ConnexionFormScreen {...props} setIsLogin={setIsLogin} isLogin={isLogin} />}
						options={{
							drawerIcon: ({ color, size }) => <Ionicons name="log-in-outline" size={size} color={color} />,
							title: "Connexion",
						}}
					/>
				</>
			)}

			{/* Écrans publics */}
			<Drawer.Screen
				name="Panier"
				children={(props) => <PanierScreen {...props} isLogin={isLogin} setIsLogin={setIsLogin} />}
				options={{ drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />, title: "Panier" }}
			/>

			{/* Écrans protégés - seulement si connecté */}
			{isLogin && (
				<Drawer.Screen
					name="Profil"
					children={(props) => (
						<ProfilScreen {...props} isLogin={isLogin} setIsLogin={setIsLogin} favoris={favoris} />
					)}
					options={{ drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />, title: "Profil" }}
				/>
			)}
		</Drawer.Navigator>
	);
});

export default DrawerNavigator;