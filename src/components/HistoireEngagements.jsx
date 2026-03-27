import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * COMPOSANT : HistoireEngagements
 * ROLE : Présente deux blocs narratifs (Histoire et Engagements) avec des effets de survol avancés.
 */
const HistoireEngagements = () => {
    // --- ÉTATS (States) ---
    // Gère l'ID de la section survolée pour activer les animations (Zoom, Overlay, Changement de couleur)
    const [hoveredSection, setHoveredSection] = useState(null);

    // --- NAVIGATION ---
    const navigate = useNavigate();

    // --- DONNÉES (Data) ---
    // Centralisation du contenu pour permettre une maintenance facile
    const sections = [
        {
            id: "histoire",
            titre: "Notre histoire",
            image: "/histoire.webp",
            lien: "/notre-histoire",
            texte: "Depuis nos débuts, nous parcourons le monde pour dénicher les grains les plus rares."
        },
        {
            id: "engagements",
            titre: "Nos engagements",
            image: "/engagements.webp",
            lien: "/nos-engagements",
            texte: "Nous nous engageons pour une culture durable, éthique et respectueuse de la terre."
        }
    ];

    return (
        <section style={styles.section}>
            {/* INJECTION CSS : Gère le responsive design et les transitions fluides */}
            <style>
                {`
                @media (max-width: 992px) {
                    .engagement-container { gap: 40px !important; }
                    .engagement-img-wrapper { height: 350px !important; }
                }
                @media (max-width: 768px) {
                    .engagement-container {
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 50px !important;
                    }
                    .engagement-block {
                        width: 100% !important;
                        max-width: 500px !important;
                    }
                    .engagement-img-wrapper { height: 300px !important; }
                    .engagement-title {
                        font-size: 1.75rem !important;
                        margin-bottom: 20px !important;
                    }
                }
                `}
            </style>

            <div style={styles.container} className="engagement-container">
                {/* RENDU DYNAMIQUE : On génère les deux blocs à partir du tableau 'sections' */}
                {sections.map((sec) => {
                    // Calcul de l'état de survol pour ce bloc spécifique
                    const isHovered = hoveredSection === sec.id;

                    return (
                        <div
                            key={sec.id}
                            className="engagement-block"
                            style={{
                                ...styles.block,
                                // Translation verticale au survol (effet de levée)
                                transform: isHovered ? "translateY(-10px)" : "translateY(0)"
                            }}
                            onMouseEnter={() => setHoveredSection(sec.id)}
                            onMouseLeave={() => setHoveredSection(null)}
                            onClick={() => navigate(sec.lien)}
                        >
                            <h2 style={styles.title} className="engagement-title">{sec.titre}</h2>

                            {/* CONTENEUR IMAGE AVEC EFFETS VISUELS */}
                            <div
                                className="engagement-img-wrapper"
                                style={{
                                    ...styles.imageWrapper,
                                    // Apparition d'une bordure dorée au survol
                                    border: isHovered ? "2px solid #C9A24D" : "2px solid transparent"
                                }}
                            >
                                <img
                                    src={sec.image}
                                    alt={sec.titre}
                                    style={{
                                        ...styles.img,
                                        // Zoom et éclaircissement de l'image
                                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                                        filter: isHovered ? "brightness(1.1)" : "brightness(0.9)"
                                    }}
                                />

                                {/* OVERLAY : Apparaît uniquement lors du survol (Rendu Conditionnel) */}
                                {isHovered && (
                                    <div style={styles.overlay}>
                                        <span style={styles.overlayText}>DÉCOUVRIR</span>
                                    </div>
                                )}
                            </div>

                            {/* TEXTE DE DESCRIPTION */}
                            <p style={{
                                ...styles.description,
                                // Le texte passe au doré pour attirer l'oeil au survol
                                color: isHovered ? "#C9A24D" : "#E9E3E3"
                            }}>
                                {sec.texte}
                            </p>
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
        backgroundColor: "#373735",
        padding: "100px 0",
        color: "#E9E3E3",
        boxSizing: "border-box"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "60px",
        padding: "0 20px",
        boxSizing: "border-box"
    },
    block: {
        flex: 1,
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        boxSizing: "border-box"
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        color: "#C9A24D",
        fontSize: "2rem",
        marginBottom: "30px",
        letterSpacing: "2px"
    },
    imageWrapper: {
        width: "100%",
        height: "400px",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
        transition: "all 0.3s ease"
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "all 0.6s ease"
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease"
    },
    overlayText: {
        border: "1px solid #C9A24D",
        padding: "10px 20px",
        color: "#C9A24D",
        fontWeight: "bold",
        backgroundColor: "rgba(55, 55, 53, 0.8)",
        fontSize: "1.1rem"
    },
    description: {
        marginTop: "25px",
        fontSize: "1.15rem",
        lineHeight: "1.6",
        fontStyle: "italic",
        transition: "color 0.3s ease"
    }
};

export default HistoireEngagements;