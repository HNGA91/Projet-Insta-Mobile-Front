import openDB from "./DB";

export const InsertUser = async (Nom, Prenom, Email, Tel, Password) => {
	try {
		// Ouvre la base de donnée
		const db = await openDB();

		// Insertion d'un nouveau user
		await db.runAsync("INSERT INTO Users (Nom, Prenom, Email, Tel, Password) VALUES (?, ?, ?, ?, ?);", [Nom, Prenom, Email, Tel, Password]);

		console.log(`✅ Utilisateur "${Nom} ${Prenom}" ajouté`);
		return true;
	} catch (error) {
		console.error("❌ Erreur lors de l'insertion:", error);

		// Gestion spécifique des contraintes UNIQUE (email déjà existant)
		if (error.message?.includes("UNIQUE constraint failed") || error.message?.includes("Email")) {
			throw new Error("❌ Cet email est déjà utilisé");
		}

		throw error;
	}
};

// verifier si l'utilisateur existe dans la BD
export const VerifUser = async (email, password) => {
	try {
		// Ouvre la base de donnée
		const db = await openDB();

		// Vérifie parmis les users si l'email existe déjà en base de donnée
		const result = await db.getAllAsync("SELECT * FROM Users WHERE Email = ? AND Password = ?;", [email, password]);

		if (result.length > 0) {
			console.log(`✅ Utilisateur "${email}" connecté`);
			return result[0];
		} else {
			console.log(`❌ Échec de connexion pour "${email}"`);
			return null;
		}
	} catch (error) {
		console.error("❌ Erreur lors de la vérification:", error);
		throw error;
	}
};

