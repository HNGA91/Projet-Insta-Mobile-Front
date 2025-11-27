import { StyleSheet } from "react-native";

export default StyleSheet.create({
	/*****************/
	/** H E A D E R **/
	/*****************/

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		backgroundColor: "#fff",
	},

	cartBadge: {
		backgroundColor: "#e0dbdbff",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
	},

	disconnectBadge: {
		backgroundColor: "#e74c3c",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		marginTop: 10,
	},

	cartText: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},

	disconnectText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
	},

	/*************************/
	/** F O R M U L A I R E **/
	/*************************/

	formContainer: {
		flex: 1,
		marginTop: 20,
		backgroundColor: "#f5f5f5",
	},

	scrollView: {
		flex: 1,
	},

	scrollContent: {
		padding: 20,
	},

	titre: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
		marginLeft: 8,
	},

	sousTitre: {
		fontSize: 16,
		color: "#666",
	},

	champContainer: {
		marginBottom: 20,
	},

	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		marginBottom: 8,
		marginTop: 10,
		marginLeft: 8,
	},

	input: {
		height: 50,
		width: 380,
		marginLeft: 8,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 16,
		color: "#333",
	},

	inputErreur: {
		borderColor: "#e74c3c",
		borderWidth: 2,
	},

	texteErreur: {
		color: "#e74c3c",
		fontSize: 12,
		marginTop: 5,
		marginLeft: 5,
	},

	bouton: {
		backgroundColor: "#1c5be4ff",
		height: 50,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginTop: 30,
		width: 380,
		marginLeft: 20,
	},

	texteBouton: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},

	footer: {
		marginTop: 20,
		marginBottom: 30,
		alignItems: "center",
	},

	texteFooter: {
		fontSize: 14,
		color: "#666",
	},

	lien: {
		color: "#3498db",
		fontWeight: "600",
	},

	/***************************************/
	/** A R T I C L E   &   P R O D U I T **/
	/***************************************/

	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 16,
	},

	list: {
		paddingHorizontal: 16,
	},

	itemContainer: {
		flexDirection: "row",
		backgroundColor: "#e0dbdbff",
		borderRadius: 8,
		padding: 12,
		marginTop: 25,
	},

	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},

	info: {
		marginLeft: 12,
		justifyContent: "center",
	},

	designation: {
		fontSize: 18,
		fontWeight: "500",
	},

	/*****************/
	/** P A N I E R **/
	/*****************/

	cartContainer: {
		marginTop: 20,
		padding: 16,
		backgroundColor: "#f9f9f9",
		borderTopWidth: 1,
		borderColor: "#ccc",
	},

	cartTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},

	cartItem: {
		fontSize: 16,
		marginBottom: 4,
	},
});
