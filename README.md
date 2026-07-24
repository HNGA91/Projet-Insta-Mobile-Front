# 📱 Tech City — Application Mobile

Application mobile officielle de **Tech City**, plateforme e-commerce spécialisée dans la vente de composants et périphériques PC. Ce projet constitue le pendant mobile (React Native / Expo) de la plateforme web Tech City.

Elle permet aux utilisateurs de parcourir le catalogue, consulter les fiches produits, gérer leurs favoris et leur panier, et administrer leur compte, directement depuis leur smartphone.

---

## 🚀 Fonctionnalités

- **Catalogue produits** : navigation par catégories via listes défilantes (FlatList)
- **Authentification** : inscription et connexion utilisateur
- **Favoris** : ajout/retrait d'articles en favoris
- **Panier** : gestion des articles avant commande
- **Profil utilisateur** : consultation et gestion des informations du compte
- **Navigation fluide** : drawer navigation + bottom tabs + stack navigation
- **Stockage local** : persistance des données via AsyncStorage et SQLite

---

## 🛠️ Stack technique

| Domaine | Technologies |
|---|---|
| Framework | React Native 0.81, Expo SDK 54 |
| Langage UI | React 19 (JSX) |
| Navigation | React Navigation (bottom-tabs, drawer, native-stack) |
| Gestion d'état | Context API (`UserContext`, `ArticleContext`) |
| Stockage local | `expo-sqlite`, `@react-native-async-storage/async-storage` |
| Variables d'environnement | `react-native-dotenv` |
| Animations / Gestes | `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets` |

---

## 📁 Structure du projet

```
TECH-CITY-MOBILE-FRONTEND/
├── assets/                    # Icônes, splash screen, favicon
├── Components/
│   ├── FlatList/               # Composants de listes (ArticlesItem, FavorisItem)
│   └── Menu/                   # Menu, MenuProfil
├── Context/
│   ├── ArticleContext.js       # Contexte global des articles
│   └── UserContext.js          # Contexte global de l'utilisateur
├── Database/                   # Configuration base de données locale (SQLite)
├── Navigation/
│   ├── CatalogueWithDrawer.jsx
│   ├── ProfilWithDrawer.jsx
│   ├── StackNavigation.jsx
│   └── TabNavigator.jsx
├── Screens/
│   ├── CatalogueScreen.jsx
│   ├── ConnexionFormScreen.jsx
│   ├── FavorisScreen.jsx
│   ├── InscriptionFormScreen.jsx
│   ├── PanierScreen.jsx
│   └── ProfilScreen.jsx
├── Styles/
│   └── Styles.js               # Styles centralisés de l'application
├── App.jsx                     # Composant racine de l'application
├── index.js                    # Point d'entrée Expo
├── app.json                    # Configuration Expo
├── babel.config.js             # Configuration Babel (dont react-native-dotenv)
└── package.json
```

---

## ⚙️ Installation

### Prérequis

- [Node.js](https://nodejs.org/) (LTS recommandé)
- [Expo CLI](https://docs.expo.dev/) (`npm install -g expo-cli` ou usage via `npx`)
- Application **Expo Go** sur smartphone (Android/iOS) ou émulateur configuré

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/<votre-utilisateur>/TECH-CITY-MOBILE-FRONTEND.git
cd TECH-CITY-MOBILE-FRONTEND

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# puis renseigner les valeurs nécessaires

# Lancer le projet
npm start
```

### Scripts disponibles

| Commande | Description |
|---|---|
| `npm start` | Lance le serveur de développement Expo |
| `npm run android` | Lance l'application sur émulateur/appareil Android |
| `npm run ios` | Lance l'application sur simulateur/appareil iOS |
| `npm run web` | Lance l'application dans un navigateur web |

---

## 🔐 Variables d'environnement

Le projet utilise `react-native-dotenv` pour la gestion des variables sensibles (ex : URL de l'API backend). Un fichier `.env` est requis à la racine du projet et n'est pas versionné (voir `.gitignore`).

---

## 🔗 Projet lié

Ce dépôt fait partie de l'écosystème **Tech City**, qui comprend également :

- **Backend** : API REST Node.js/Express (MySQL/Sequelize, MongoDB/Mongoose, Stripe)
- **Frontend web** : Application React 19/Vite

---

## 📄 Licence

Ce projet est distribué sous licence présente dans le fichier [LICENSE](./LICENSE).

---

## 👤 Auteur

Projet réalisé par Hervé N'Goma.