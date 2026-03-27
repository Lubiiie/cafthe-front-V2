import React, { useState } from "react";
import { FiStar, FiHeart } from "react-icons/fi";

/**
 * COMPOSANT : AvisClients
 * ROLE : Affiche une section de témoignages clients sous forme de cartes interactives.
 */
const AvisClients = () => {
    // --- ÉTATS (States) ---
    // Stocke l'ID de la carte survolée pour appliquer l'effet de zoom et d'ombre portée
    const [hoveredId, setHoveredId] = useState(null);

    // --- DONNÉES (Data) ---
    // Simulation de données provenant d'une base de données ou d'une API
    const avis = [
        {
            id: 1,
            nom: "Jean-Baptiste Morel",
            commentaire: "Un voyage sensoriel exceptionnel. La livraison est aussi soignée que l'écrin du produit.",
            rating: 5
        },
        {
            id: 2,
            nom: "Clémence d'Aboville",
            commentaire: "Le site est d'une élégance rare et la gestion de mon espace personnel est un vrai modèle de fluidité.",
            rating: 5
        },
        {
            id: 3,
            nom: "Marc-Antoine Vallet",
            commentaire: "Plus qu'une simple boutique, c'est un véritable accompagnement pour les passionnés.",
            rating: 5
        }
    ];

    return (
        <section style={styles.section}>
            {/* INJECTION CSS : Gère le responsive design (passage de 3 à 2 puis 1 colonne) */}
            <style>
                {`
                @media (max-width: 992px) {
                    .avis-container { gap: 20px !important; }
                    .avis-card {
                        width: calc(50% - 20px) !important;
                        min-width: 300px !important;
                    }
                }
                @media (max-width: 768px) {
                    .avis-title {
                        text-align: center !important;
                        margin-left: 0 !important;
                        font-size: 1.8rem !important;
                    }
                    .avis-container {
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .avis-card {
                        width: 100% !important;
                        max-width: 400px !important;
                    }
                }
                `}
            </style>

            <h2 style={styles.titleSection} className="avis-title">Avis récents</h2>

            {/* GRILLE D'AFFICHAGE */}
            <div style={styles.container} className="avis-container">
                {/* RENDU DYNAMIQUE DES CARTES D'AVIS */}
                {avis.map((item) => {
                    // Calcul booléen pour savoir si cette carte précise est survolée
                    const isHovered = hoveredId === item.id;

                    return (
                        <div
                            key={item.id} // Identifiant unique pour le rééquilibrage du Virtual DOM
                            className="avis-card"
                            style={{
                                ...styles.card,
                                // Styles conditionnels (Ternaires) basés sur l'état 'isHovered'
                                transform: isHovered ? "translateY(-12px)" : "translateY(0)",
                                boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 20px rgba(0,0,0,0.3)",
                                border: isHovered ? "1px solid #C9A24D" : "1px solid transparent"
                            }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* DÉCORATION : Icônes de notation */}
                            <div style={styles.starsContainer}>
                                {[...Array(3)].map((_, i) => (
                                    <FiHeart key={i} style={styles.icon} />
                                ))}
                            </div>

                            {/* CONTENU DE L'AVIS */}
                            <h3 style={styles.userName}>{item.nom}</h3>
                            <p style={styles.comment}>"{item.commentaire}"</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// --- STYLES (Objets de configuration CSS-in-JS) ---
const styles = {
    section: {
        width: "100%",
        backgroundColor: "#E9E3E3",
        padding: "60px 0",
        overflow: "hidden"
    },
    titleSection: {
        marginLeft: "5%",
        fontFamily: "'Playfair Display', serif",
        color: "#373735",
        fontSize: "2.25rem",
        marginBottom: "30px"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        padding: "0 5%",
        flexWrap: "wrap",
        boxSizing: "border-box"
    },
    card: {
        width: "350px",
        backgroundColor: "#373735",
        borderRadius: "25px",
        padding: "30px",
        color: "#E9E3E3",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "default",
        boxSizing: "border-box"
    },
    starsContainer: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px"
    },
    icon: {
        color: "#C9A24D",
        fontSize: "1.2rem"
    },
    userName: {
        color: "#C9A24D",
        fontSize: "1.4rem",
        margin: "0 0 15px 0",
        fontFamily: "'Playfair Display', serif"
    },
    comment: {
        fontSize: "1.1rem",
        fontStyle: "italic",
        lineHeight: "1.6",
        opacity: 0.9
    }
};

export default AvisClients;