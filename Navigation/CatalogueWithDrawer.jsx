import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CatalogueScreen from "../Screens/CatalogueScreen";
import { useContext } from "react";
import { UserContext } from "../Context/Context";

const Drawer = createDrawerNavigator();

const CatalogueWithDrawer = ({ route, favoris, setFavoris }) => {
	const { user } = useContext(UserContext);
	const isLogin = !!user;

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerActiveTintColor: "white",
				drawerActiveBackgroundColor: "#1c5be4ff",
				swipeEnabled: true,
				headerStyle: { backgroundColor: "#1c5be4ff" },
				headerTintColor: "white",
			}}
		>
			<Drawer.Screen
				name="CataloguePrincipal"
				options={{ title: "Accueil", drawerIcon: ({ color, size }) => <Ionicons name="bag-handle-sharp" size={size} color={color} /> }}
				children={(props) => <CatalogueScreen {...props} favoris={favoris} setFavoris={setFavoris} />}
			/>
		</Drawer.Navigator>
	);
};

export default CatalogueWithDrawer;