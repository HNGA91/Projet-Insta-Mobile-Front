import React, { useEffect, useState } from "react";
import { StatusBar, View, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigation/TabNavigator";
import { UserProvider } from "./Context/Context";
import { InitDB } from "./Database/InitDB";

const App = () => {
	const [dbInitialized, setDbInitialized] = useState(false);
	const [dbError, setDbError] = useState(null);

	useEffect(() => {
		const initializeDatabase = async () => {
			try {
				console.log("🔄 Initialisation de la base de données...");
				const success = await InitDB();
				console.log("📊 Résultat de l'initialisation:", success);

				if (success) {
					console.log("✅ Base de données initialisée avec succès");
					setDbInitialized(true);
				} else {
					console.error("❌ Échec de l'initialisation de la base de données");
					setDbError("Échec de l'initialisation de la base de données");
				}
			} catch (error) {
				console.error("❌ Erreur critique lors de l'initialisation:", error);
				console.error("Stack trace:", error.stack);
				setDbError(error.message);
			}
		};

		initializeDatabase();
	}, []);

	// Afficher un écran de chargement ou d'erreur
	if (!dbInitialized) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<StatusBar barStyle="light-content" backgroundColor="#1c5be4ff" translucent={false} />
				<SafeAreaView style={{ flex: 0, backgroundColor: "#1c5be4ff" }} />
				<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					{dbError ? (
						<>
							<Text style={{ color: "red", fontSize: 16, marginBottom: 10 }}>Erreur de base de données</Text>
							<Text style={{ color: "red", fontSize: 12, textAlign: "center" }}>{dbError}</Text>
						</>
					) : (
						<Text>Initialisation de la base de données...</Text>
					)}
				</SafeAreaView>
			</View>
		);
	}

	return (
		<UserProvider>
			<NavigationContainer>
				<View style={{ flex: 1 }}>
					<StatusBar barStyle="light-content" backgroundColor="#1c5be4ff" translucent={false} />
					<SafeAreaView style={{ flex: 0, backgroundColor: "#1c5be4ff" }} />
					<SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
						<TabNavigator />
					</SafeAreaView>
				</View>
			</NavigationContainer>
		</UserProvider>
	);
};

export default App;
