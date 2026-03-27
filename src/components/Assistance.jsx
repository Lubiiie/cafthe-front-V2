import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * COMPOSANT : Assistance
 * ROLE : Affiche deux accès rapides (FAQ et Contact) sous forme de cercles interactifs.
 */
const Assistance = () => {
    // --- ÉTATS (States) ---
    // Gère l'ID de l'élément survolé pour appliquer les effets de style (scale, couleur, ombre)
    const [hovered, setHovered] = useState(null);

    // --- NAVIGATION ---
    const navigate = useNavigate();

    // --- DONNÉES (Data) ---
    // Centralisation des liens pour faciliter la maintenance et éviter la répétition de code (DRY)
    const liens = [
        {
            id: "aide",
            titre: "Besoin d’aide",
            image: "/besoin.webp",
            path: "/contact?section=message"
        },
        {
            id: "faq",
            titre: "FAQ",
            image: "/faq.webp",
            path: "/contact?section=faq"
        }
    ];

    // --- FONCTIONS (Handlers) ---
    /**
     * Gère la navigation programmée vers une section spécifique
     * @param {string} path - Le chemin de destination
     */
    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // Force le retour en haut de page après changement de route
    };

    return (
        <section style={styles.section}>
            {/* INJECTION CSS : Gère l'adaptabilité (Responsive) du composant */}
            <style>
                {`
                @media (max-width: 768px) {
                    .assistance-container {
                        gap: 40px !important;
                        flex-direction: row !important;
                    }
                    .assistance-circle {
                        width: 130px !important;
                        height: 130px !important;
                    }
                    .assistance-text {
                        font-size: 1.4rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .assistance-container {
                        flex-direction: column !important;
                        gap: 50px !important;
                    }
                }
                `}
            </style>

            {/* STRUCTURE PRINCIPALE */}
            <div style={styles.container} className="assistance-container">
                {/* RENDU DYNAMIQUE : On boucle sur le tableau 'liens' */}
                {liens.map((item) => {
                    const isHovered = hovered === item.id;
                    return (
                        <div
                            key={item.id} // Clé unique obligatoire pour React lors d'un .map()
                            style={styles.itemWrapper}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleNavigation(item.path)}
                        >
                            {/* CERCLE GRAPHIQUE */}
                            <div
                                className="assistance-circle"
                                style={{
                                    ...styles.circle,
                                    // Style dynamique basé sur l'état 'hovered'
                                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                                    boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.2)" : "0 4px 10px rgba(0,0,0,0.1)"
                                }}
                            >
                                <img src={item.image} alt={item.titre} style={styles.icon} />
                            </div>

                            {/* TEXTE ASSOCIÉ */}
                            <span
                                className="assistance-text"
                                style={{
                                    ...styles.text,
                                    textDecoration: isHovered ? "underline" : "none",
                                    color: isHovered ? "#C9A24D" : "#373735"
                                }}
                            >
                                {item.titre}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// --- STYLES  ---
const styles = {
    section: {
        width: "100%",
        backgroundColor: "#E9E3E3",
        padding: "60px 0",
        boxSizing: "border-box",
        overflow: "hidden"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        gap: "100px",
        boxSizing: "border-box",
        padding: "0 20px"
    },
    itemWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    circle: {
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        backgroundColor: "#F9F7F2",
        border: "1.5px solid #373735",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        marginBottom: "15px",
        overflow: "visible",
        boxSizing: "border-box"
    },
    icon: {
        width: "80%",
        height: "80%",
        objectFit: "contain",
        transition: "transform 0.3s ease"
    },
    text: {
        fontSize: "1.75rem",
        lineHeight: "1.2",
        fontFamily: "'Playfair Display', serif",
        transition: "all 0.3s ease",
        textAlign: "center"
    }
};

export default Assistance;