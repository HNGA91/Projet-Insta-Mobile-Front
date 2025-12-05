import React from "react";
import { StatusBar, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigation/TabNavigator";
import { UserProvider } from "./Context/UserContext";
import { ArticleProvider } from "./Context/ArticleContext";

const App = () => {
	return (
		<UserProvider>
			<ArticleProvider>
				<NavigationContainer>
					<View style={{ flex: 1 }}>
						<StatusBar barStyle="light-content" backgroundColor="#1c5be4ff" translucent={false} />
						<SafeAreaView style={{ flex: 0, backgroundColor: "#1c5be4ff" }} />
						<SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
							<TabNavigator />
						</SafeAreaView>
					</View>
				</NavigationContainer>
			</ArticleProvider>
		</UserProvider>
	);
};

export default App;
