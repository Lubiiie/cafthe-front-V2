import React, { createContext, useState, useEffect, useContext } from 'react';

// --- INITIALISATION ---
const CardContext = createContext();

/**
 * COMPOSANT : CardProvider
 * ROLE : Centralise la logique du panier d'achat et assure sa persistance (survie au rafraîchissement).
 */
export const CardProvider = ({ children }) => {

    // --- ÉTATS (States) ---
    // Initialisation synchrone via une fonction : on récupère le panier stocké en local
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cafethe_cart');
        // JSON.parse transforme la chaîne de caractères du localStorage en objet JS (tableau)
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // --- EFFETS (Side Effects) ---
    // PERSISTANCE : Dès que le tableau 'cart' change, on le synchronise avec le localStorage
    useEffect(() => {
        localStorage.setItem('cafethe_cart', JSON.stringify(cart));
    }, [cart]);

    // --- ACTIONS DU PANIER ---

    /**
     * AJOUTER UN PRODUIT
     * Gère la fusion des doublons (si le produit existe déjà, on augmente la quantité)
     */
    const addToCart = (product, quantity) => {
        const qtyToAdd = parseInt(quantity, 10);

        // NORMALISATION : Sécurité pour gérer les différents noms de clés venant de la BDD
        const productId = product.id_produit || product.numero_produit || product.id;
        const price = product.prix_ttc || product.prix_unitaire || product.prix;

        setCart(prevCart => {
            // On vérifie si l'article est déjà présent dans le panier
            const exists = prevCart.find(item =>
                (item.id_produit || item.numero_produit || item.id) === productId
            );

            if (exists) {
                // S'il existe : on retourne un nouveau tableau avec la quantité mise à jour (Immuabilité)
                return prevCart.map(item =>
                    (item.id_produit || item.numero_produit || item.id) === productId
                        ? { ...item, quantite: item.quantite + qtyToAdd }
                        : item
                );
            }

            // S'il est nouveau : on l'ajoute à la fin du tableau
            return [...prevCart, {
                ...product,
                id_produit: productId,
                prix_ttc: price,
                quantite: qtyToAdd
            }];
        });
    };

    /**
     * MODIFIER QUANTITÉ (+1 ou -1)
     * Utilise Math.max(1, ...) pour empêcher une quantité inférieure à 1
     */
    const updateQuantity = (id, delta) => {
        setCart(prevCart => prevCart.map(item =>
            (item.id_produit || item.numero_produit || item.id) === id
                ? { ...item, quantite: Math.max(1, item.quantite + delta) }
                : item
        ));
    };

    /**
     * SUPPRIMER UN ARTICLE
     * Utilise .filter() pour créer un nouveau tableau excluant l'ID ciblé
     */
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item =>
            (item.id_produit || item.numero_produit || item.id) !== id
        ));
    };

    /**
     * CALCUL DU TOTAL
     * Utilise .reduce() pour accumuler (prix * quantité) de chaque ligne
     */
    const getSubTotal = () => cart.reduce((acc, item) => {
        const price = parseFloat(item.prix_ttc || item.prix_unitaire || 0);
        return acc + (price * item.quantite);
    }, 0);

    /**
     * VIDER LE PANIER
     * Utilisé après la validation du paiement sur la page 'Merci'
     */
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cafethe_cart');
    };

    // --- EXPOSITION DES DONNÉES ET FONCTIONS ---
    return (
        <CardContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getSubTotal,
            clearCart
        }}>
            {children}
        </CardContext.Provider>
    );
};

// --- HOOK PERSONNALISÉ ---
/**
 * Permet d'accéder au panier depuis n'importe quel composant (ex: Header, Catalogue)
 */
export const useCard = () => useContext(CardContext);