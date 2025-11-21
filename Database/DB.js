import * as SQLite from "expo-sqlite";

// Fonction servant à ouvrir une base de donnée
const openDB = async () => {
	try {
		const db = await SQLite.openDatabaseAsync("MyProjectDB");
		console.log("✅ Base de données ouverte avec succès");
		return db;
	} catch (error) {
		console.error("❌ Erreur lors de l'ouverture de la base de données:", error);
		throw error;
	}
};

export default openDB;
