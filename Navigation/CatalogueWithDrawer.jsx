import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CatalogueScreen from "../Screens/CatalogueScreen";

const Drawer = createDrawerNavigator();

const CatalogueWithDrawer = ({ route }) => {
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
				children={(props) => <CatalogueScreen {...props} />}
			/>
		</Drawer.Navigator>
	);
};

export default CatalogueWithDrawer;
