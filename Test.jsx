import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const [panier, setPanier] = useState([]);
	const [favoris, setFavoris] = useState([]);
	const [isLogin, setIsLogin] = useState(false);

	// Références pour chaque navigator drawer
	const drawerNavigatorRefs = useRef({
		catalogue: null,
		favoris: null,
		panier: null,
		profil: null,
	});

	// Fonction pour réinitialiser le drawer quand on change de tab
	const resetDrawerNavigation = useCallback((drawerKey) => {
		const drawerRef = drawerNavigatorRefs.current[drawerKey];
		if (drawerRef) {
			// Réinitialiser à l'écran initial
			drawerRef.reset({
				index: 0,
				routes: [{ name: initialScreens[drawerKey] }],
			});
		}
	}, []);

	const initialScreens = {
		catalogue: "Catalogue",
		favoris: "Favoris",
		panier: "Panier",
		profil: "Profil",
	};

	// Composants séparés pour chaque tab
	const CatalogueTab = (props) => (
		<DrawerNavigator
			{...props}
			ref={(ref) => (drawerNavigatorRefs.current.catalogue = ref)}
			initialScreen="Catalogue"
			panier={panier}
			setPanier={setPanier}
			isLogin={isLogin}
			setIsLogin={setIsLogin}
			favoris={favoris}
			setFavoris={setFavoris}
		/>
	);

	const FavorisTab = (props) => (
		<DrawerNavigator
			{...props}
			ref={(ref) => (drawerNavigatorRefs.current.favoris = ref)}
			initialScreen="Favoris"
			panier={panier}
			setPanier={setPanier}
			isLogin={isLogin}
			setIsLogin={setIsLogin}
			favoris={favoris}
			setFavoris={setFavoris}
		/>
	);

	const PanierTab = (props) => (
		<DrawerNavigator
			{...props}
			ref={(ref) => (drawerNavigatorRefs.current.panier = ref)}
			initialScreen="Panier"
			panier={panier}
			setPanier={setPanier}
			isLogin={isLogin}
			setIsLogin={setIsLogin}
		/>
	);

	const ProfilTab = (props) => (
		<DrawerNavigator
			{...props}
			ref={(ref) => (drawerNavigatorRefs.current.profil = ref)}
			initialScreen="Profil"
			panier={panier}
			setPanier={setPanier}
			isLogin={isLogin}
			setIsLogin={setIsLogin}
			favoris={favoris}
		/>
	);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;
					if (route.name === "TabCatalogue") {
						iconName = "bag-handle-sharp";
					} else if (route.name === "TabFavoris") {
						iconName = "star";
					} else if (route.name === "TabPanier") {
						iconName = "cart";
					} else if (route.name === "TabProfil") {
						iconName = "person";
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="TabCatalogue"
				component={CatalogueTab}
				options={{ headerShown: false, title: "Catalogue" }}
				listeners={{
					tabPress: () => resetDrawerNavigation("catalogue"),
				}}
			/>

			{isLogin && (
				<Tab.Screen
					name="TabFavoris"
					component={FavorisTab}
					options={{ headerShown: false, title: "Favoris" }}
					listeners={{
						tabPress: () => resetDrawerNavigation("favoris"),
					}}
				/>
			)}

			<Tab.Screen
				name="TabPanier"
				component={PanierTab}
				options={{ headerShown: false, title: "Panier" }}
				listeners={{
					tabPress: () => resetDrawerNavigation("panier"),
				}}
			/>

			{isLogin && (
				<Tab.Screen
					name="TabProfil"
					component={ProfilTab}
					options={{ headerShown: false, title: "Profil" }}
					listeners={{
						tabPress: () => resetDrawerNavigation("profil"),
					}}
				/>
			)}
		</Tab.Navigator>
	);
};

export default TabNavigator;
