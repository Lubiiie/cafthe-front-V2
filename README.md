# CafThé : Plateforme E-Commerce Full-Stack

CafThé est une solution e-commerce complète dédiée à la distribution de cafés, thés et accessoires d'exception. Ce projet de certification met en œuvre une architecture moderne découplée, alliant une interface utilisateur haut de gamme à une gestion robuste des données.

---

## Stack Technique

### Frontend
* **Core :** React 18 (Vite)
* **Routing :** React Router DOM v6
* **State Management :** Context API
* **Cookies :** React Cookie Consent (Gestion de la conformité utilisateur)
* **Interface :** CSS3 (Responsive Mobile-First), React Icons

### Backend & Sécurité
* **Runtime :** Node.js
* **Framework :** Express.js (API RESTful)
* **Authentification :** JSON Web Token (JWT) avec gestion de session
* **Sécurité :** Bcrypt (Hachage des mots de passe)
* **Formulaires :** Intégration Formspree pour la gestion du service client

### Base de Données & Infrastructure
* **Système :** MySQL (Architecture relationnelle normalisée)
* **Hébergement Frontend :** Vercel
* **Hébergement Backend & BDD :** Plesk

---

## Fonctionnalités Principales

### Expérience Utilisateur
* **Catalogue Dynamique :** Affichage asynchrone des produits avec système de filtrage par catégorie.
* **Tunnel d'Achat :** Gestion du panier en temps réel (ajout, modification, suppression) avec persistance.
* **Espace Client :** Inscription, connexion sécurisée et gestion du profil personnel.
* **Support :** Formulaire de contact fonctionnel et Foire Aux Questions (FAQ) dynamique.

### Optimisation Technique
* **SEO Technique :** Optimisation du référencement naturel page par page (Meta-titles, descriptions, indexation).
* **Responsive Design :** Interface entièrement adaptée aux supports mobiles, tablettes et desktop.
* **Sécurité :** Protection des routes privées et sécurisation des échanges client-serveur.

---

## Installation et Démarrage

### Prérequis
* Node.js >= 18
* Une instance MySQL fonctionnelle
* Un environnement de variables configuré

### Quickstart
```bash
# 1. Cloner le dépôt
git clone [https://github.com/eloro41/cafthe-front.git](https://github.com/eloro41/cafthe-front.git)
cd cafthe-front

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env et renseigner VITE_API_URL

# 4. Lancer le serveur de développement
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable       | Description | Exemple |
| -------------- | ----------- | ------- |
| `VITE_API_URL` | URL de      | http:// |
|                | l'API back- | localho |
|                | end         | st:3000 |
| `VITE_...`     |             |         |

## Structure du Projet

src/
* assets/             - Ressources statiques (Images, Logos)
* components/         - Composants réutilisables (Navbar, Footer, ProductCard)
* context/            - Logique métier (AuthContext, CardContext)
* pages/              - Vues principales de l'application
* styles/             - Feuilles de styles modulaires par page
* App.jsx             - Configuration du routage et des providers
* main.jsx            - Point d'entrée de l'application

## Documentation de l'Application
### Navigation (routes)

* /Accueil avec mise en avant des produits phares
* /produits - Catalogue complet avec système de filtres
* /login - Page d'authentification client
* /register - Formulaire de création de compte utilisateur
* /panier  - Gestion du panier et récapitulatif avant commande
* /aide-contact - Support client, formulaire et FAQ

## Scripts Disponibles


| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Stack technique

- React 18 (Vite)
- Node.js (Express) pour l'API
- MySQL pour la gestion des données
- JSON Web Token (JWT) pour la sécurité
- Bcrypt pour le hachage des mots de passe

## Auteurs

- **Agathe Courtois** — Créatrice

## Licence

Ce projet est sous licence MIT

## Liens et Documentation

* [Documentation React](https://react.dev/)
* [Documentation Vite](https://vite.dev/)
* [Arborescence Figma](https://www.figma.com/board/eZq4bPy1Sly7VPgZg8dfHD/Arborescence---Cafth%C3%A9?node-id=0-1&t=IA4nr3pF6JueSL4Z-1)
* [Maquette Figma](https://www.figma.com/design/ws01Mb7mf69hcdagMqUftx/CAFTH%C3%89?node-id=53-1582&t=tbbaUSZqHFezi7ln-1)