import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ProfilScreen from "../Screens/ProfilScreen";
import FavorisScreen from "../Screens/FavorisScreen";

const Drawer = createDrawerNavigator();

const ProfilWithDrawer = ({ route, favoris, setFavoris }) => {
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
				name="ProfilPrincipal"
				options={{
					title: "Mon compte",
					drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
				}}
				children={(props) => <ProfilScreen {...props} favoris={favoris} />}
			/>

			{/* Options supplémentaires dans le Drawer du Profil */}
			<Drawer.Screen
				name="FavorisFromProfil"
				options={{
					title: "Mes favoris",
					drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
				}}
				children={(props) => <FavorisScreen {...props} favoris={favoris} setFavoris={setFavoris} />}
			/>
		</Drawer.Navigator>
	);
};

export default ProfilWithDrawer;