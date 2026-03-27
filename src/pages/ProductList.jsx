import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"; // Librairie pour l'effet de chargement "squelette"
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../components/ProductCard";

/**
 * COMPOSANT : ProductList
 * ROLE : Gère l'appel API pour récupérer la liste des produits et orchestre l'affichage
 * selon l'état (Chargement, Erreur, ou Liste de produits).
 */
const ProductList = () => {
    // --- ÉTATS (States) ---
    const [produits, setProduits] = useState([]); // Stockage de la liste finale
    const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState(null); // Stockage du message d'erreur éventuel

    // --- EFFETS (Side Effects) ---
    /**
     * useEffect s'exécute au montage du composant.
     * C'est ici que l'on effectue la requête HTTP vers le Backend.
     */
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Appel à l'API via la variable d'environnement définie dans Vite
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/produits`);

                // Vérification du statut HTTP (200 OK ?)
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();

                // FLEXIBILITÉ : On gère différents formats de réponse possibles du serveur
                const liste = data.produits || data.produit || data.articles || data;

                // Sécurité : on s'assure que 'liste' est bien un tableau avant de le stocker
                setProduits(Array.isArray(liste) ? liste : []);

            } catch (err) {
                // Capturer l'erreur pour informer l'utilisateur sans faire planter l'app
                setError("Oups ! Impossible de charger les produits pour le moment.");
            } finally {
                // Dans tous les cas (succès ou échec), on arrête l'état de chargement
                setIsLoading(false);
            }
        };

        fetchProduits();
    }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois

    // --- RENDU 1 : ÉTAT DE CHARGEMENT (Skeleton) ---
    if (isLoading) {
        return (
            <div style={styles.grid}>
                {/* On génère 4 squelettes pour simuler l'emplacement des futures cartes */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}><Skeleton height={250} borderRadius={12} /></div>
                ))}
            </div>
        );
    }

    // --- RENDU 2 : ÉTAT D'ERREUR ---
    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} style={styles.retryBtn}>
                    Réessayer
                </button>
            </div>
        );
    }

    // --- RENDU 3 : ÉTAT DE SUCCÈS (Affichage de la liste) ---
    return (
        <div className="product-list-container" style={{ padding: '20px' }}>
            <div className="product-list" style={styles.grid}>
                {produits.map((item, index) => (
                    <ProductCard
                        // Utilisation d'une clé unique pour le Virtual DOM de React
                        key={item.numero_produit || item.id || index}
                        produit={item}
                    />
                ))}
            </div>
        </div>
    );
};

// --- STYLES INTERNES ---
const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
    },
    errorContainer: {
        textAlign: 'center',
        padding: '50px',
        color: '#e74c3c'
    },
    retryBtn: {
        marginTop: '10px',
        cursor: 'pointer',
        padding: '8px 16px'
    }
};

export default ProductList;