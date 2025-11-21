import openDB from "./DB";

export const InitDB = async () => {
    let db = null;
	try {
        console.log("🔄 Tentative d'ouverture de la base de données...");
		db = await openDB();

        if (!db) {
			throw new Error("La base de données n'a pas pu être ouverte");
		}

		console.log("🔄 Création de la table Users...");
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Nom TEXT, 
                Prenom TEXT, 
                Email TEXT, 
                Tel TEXT, 
                Password TEXT
            );
        `);

		console.log('✅ Table "Users" créée avec succès');
		return true;
	} catch (error) {
		console.error("❌ Erreur lors de l'initialisation de la base:", error);
        console.error("Détails de l'erreur:", error.message);
		return false;
	}
};
