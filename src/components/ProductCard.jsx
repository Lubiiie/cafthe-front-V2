import React from "react";
import { Link } from "react-router-dom";

/**
 * COMPOSANT : ProductCard
 * ROLE : Affiche un aperçu individuel d'un produit (Image, Nom, Prix) sous forme de carte.
 * @param {Object} produit - Objet contenant les données du produit passées par le parent.
 */
const ProductCard = ({ produit }) => {
    // --- VARIABLES DE CONFIGURATION ---
    // Récupération de l'URL de l'API depuis les variables d'environnement (Vite)
    const apiUrl = import.meta.env.VITE_API_URL;

    // --- LOGIQUE D'AFFICHAGE DE L'IMAGE ---
    // Gestion de la flexibilité des noms de colonnes SQL (images, image ou image_url)
    const imageFileName = produit.images || produit.image || produit.image_url;

    // Construction de l'URL complète ou utilisation d'un "placeholder" (image de secours) si manquante
    const imageUrl = imageFileName
        ? `${apiUrl}/images/${imageFileName}`
        : "https://placehold.co/300x200?text=Image+Indisponible";

    return (
        <div className="product-card" style={styles.card}>
            {/* IMAGE DU PRODUIT */}
            <img
                src={imageUrl}
                alt={produit.nom_produit}
                className="product-card-image"
                style={styles.image}
                // GESTION D'ERREUR : Si l'image ne charge pas (ex: 404), on remplace par une image par défaut
                onError={(e) => {
                    e.target.onerror = null; // Évite une boucle infinie si le placeholder échoue aussi
                    e.target.src = "https://placehold.co/300x200?text=Erreur+Image";
                }}
            />

            {/* INFORMATIONS TEXTUELLES */}
            <h3 style={styles.title}>{produit.nom_produit}</h3>
            <p style={styles.price}>{produit.prix_ttc} €</p>

            {/* LIEN DE NAVIGATION VERS LE DÉTAIL */}
            {/* Utilisation de Link pour une navigation SPA (sans rechargement de page) */}
            <Link
                to={`/produit/${produit.numero_produit || produit.id}`}
                className="details-btn"
                style={styles.link}
            >
                Voir les détails
            </Link>
        </div>
    );
};

// --- STYLES INTERNES ---
const styles = {
    card: {
        border: '1px solid #eee',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    title: {
        margin: '15px 0 5px 0',
        fontSize: '1.2rem'
    },
    price: {
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '15px'
    },
    link: {
        color: '#8e44ad',
        fontWeight: '500',
        textDecoration: 'none'
    }
};

export default ProductCard;