import React, { createContext, useState, useEffect, useContext } from "react";

// --- INITIALISATION DU CONTEXTE ---
// On crée un objet Context qui va contenir les données globales d'authentification
export const AuthContext = createContext(null);

/**
 * COMPOSANT : AuthProvider
 * ROLE : Encapsule l'application pour distribuer l'état de connexion à tous les composants.
 */
export function AuthProvider({ children }) {
    // --- ÉTATS (States) ---

    // 1. Initialisation SYNCHRONE de l'utilisateur
    // On utilise une fonction anonyme pour lire le localStorage dès le premier rendu
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Gère l'état d'attente pendant la vérification du token avec le backend
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_URL;

    // --- EFFETS (Side Effects) ---
    /**
     * Vérifie la validité de la session au chargement de l'application (F5 / Refresh)
     */
    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');

            // Sécurité : Si pas de token, on arrête tout pour éviter des requêtes inutiles
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseUrl}/api/clients/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Transmission du JWT au serveur
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client); // Session valide : on met à jour l'utilisateur
                } else {
                    // Session invalide (token expiré ou modifié) : on nettoie tout
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error("Erreur session:", error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, [baseUrl]);

    // --- ACTIONS D'AUTHENTIFICATION ---

    /**
     * Enregistre les données après une connexion réussie
     * @param {string} token - Le JWT fourni par le backend
     * @param {Object} userData - Les infos du client
     */
    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userPrenom", userData.prenom_client || userData.prenom);
        setUser(userData);
    };

    /**
     * Déconnecte l'utilisateur et vide le stockage local
     */
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    // --- EXPOSITION DES DONNÉES ---
    const value = { user, login, logout, loading, isAuthenticated: !!user };

    return (
        <AuthContext.Provider value={value}>
            {children} {/* Permet d'afficher les composants enfants enveloppés dans App.jsx */}
        </AuthContext.Provider>
    );
}

// --- HOOK PERSONNALISÉ (Custom Hook) ---
/**
 * Permet d'utiliser facilement le contexte dans n'importe quel composant
 * @example const { user, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);