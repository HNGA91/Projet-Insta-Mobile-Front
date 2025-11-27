import React, { useEffect, useState } from "react";
import { StatusBar, View, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigation/TabNavigator";
import { UserProvider } from "./Context/UserContext";
import { InitDB } from "./Database/InitDB";
import { FavorisProvider } from "./Context/FavorisContext";
import { PanierProvider } from "./Context/PanierContext";
import { ArticleProvider } from "./Context/ArticleContext";

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
					setDbInitialized(true);
				} else {
					setDbError("❌ Échec de l'initialisation de la base de données");
				}
			} catch (error) {
				setDbError(error.message);
			}
		};

		initializeDatabase();
	}, []);

	return (
		<UserProvider>
			<ArticleProvider>
				<FavorisProvider>
					<PanierProvider>
						<NavigationContainer>
							{/* AFFICHE SOIT L'ERREUR, SOIT LE CHARGEMENT OU SOIT L’APP */}
							{!dbInitialized ? (
								<>
									<StatusBar barStyle="light-content" backgroundColor="#1c5be4ff" />
									<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
										{dbError ? (
											<>
												<Text style={{ color: "red", fontSize: 16 }}>❌ Erreur base de données</Text>
												<Text style={{ color: "red" }}>{dbError}</Text>
											</>
										) : (
											<Text>🔄 Initialisation de la base...</Text>
										)}
									</View>
								</>
							) : (
								<View style={{ flex: 1 }}>
									<StatusBar barStyle="light-content" backgroundColor="#1c5be4ff" translucent={false} />
									<SafeAreaView style={{ flex: 0, backgroundColor: "#1c5be4ff" }} />
									<SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
										<TabNavigator />
									</SafeAreaView>
								</View>
							)}
						</NavigationContainer>
					</PanierProvider>
				</FavorisProvider>
			</ArticleProvider>
		</UserProvider>
	);
};

export default App;
