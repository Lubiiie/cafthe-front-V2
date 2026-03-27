import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * COMPOSANT : Hero
 * ROLE : Présentation visuelle principale (Hero Section) avec appel à l'action (CTA).
 */
const Hero = () => {
    // --- NAVIGATION ---
    const navigate = useNavigate();

    // --- ÉTATS (States) ---
    // Gère l'effet visuel du bouton principal au survol
    const [isBtnHovered, setIsBtnHovered] = useState(false);

    return (
        <section
            style={styles.heroContainer}
            className="hero-section"
            role="region"
            aria-label="Introduction" // Sémantique : indique aux lecteurs d'écran le but de la section
        >
            <style>
                {`
                /* RESPONSIVE : Ajustements pour tablettes et mobiles */
                @media (max-width: 768px) {
                    .hero-title { font-size: 2.2rem !important; }
                    .hero-subtitle { font-size: 1rem !important; }
                    .bubble { display: none; } /* Suppression des éléments décoratifs pour éviter les débordements (scroll horizontal) sur mobile */
                    .hero-section { height: 70vh !important; }
                }
                
                /* ANIMATION : Transition fluide pour le bouton */
                .hero-action-btn {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
                `}
            </style>

            {/* OVERLAY : Couche semi-transparente pour garantir la lisibilité du texte sur l'image de fond */}
            <div style={styles.overlay} />

            {/* ELEMENTS DECORATIFS (Bulles) : aria-hidden="true" car purement esthétique (pas d'info utile pour les malvoyants) */}
            <div style={{...styles.bubble, ...styles.bubble1}} className="bubble" aria-hidden="true" />
            <div style={{...styles.bubble, ...styles.bubble2}} className="bubble" aria-hidden="true" />
            <div style={{...styles.bubble, ...styles.bubble3}} className="bubble" aria-hidden="true" />

            {/* CONTENU TEXTUEL */}
            <div style={styles.content}>
                <h1 style={styles.title} className="hero-title">L'Art de la Dégustation</h1>
                <p style={styles.subtitle} className="hero-subtitle">
                    Découvrez notre sélection exclusive de cafés torréfiés et de thés rares.
                </p>

                {/* BOUTON D'APPEL À L'ACTION (CTA) */}
                <button
                    className="hero-action-btn"
                    aria-label="Explorer la collection de produits"
                    style={{
                        ...styles.button,
                        // Style dynamique : permutation de couleurs au survol (Inversion)
                        backgroundColor: isBtnHovered ? '#373735' : '#C9A24D',
                        color: isBtnHovered ? '#C9A24D' : '#373735',
                        // Effet de levée (lift) au survol
                        transform: isBtnHovered ? 'translateY(-5px)' : 'translateY(0)',
                        boxShadow: isBtnHovered ? '0 10px 20px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                    onClick={() => navigate('/catalogue')}
                >
                    Explorer la Collection
                </button>
            </div>
        </section>
    );
};

// --- STYLES (Configuration des objets CSS) ---
const styles = {
    heroContainer: {
        position: 'relative',
        height: '80vh',
        width: '100%',
        backgroundColor: '#373735',
        backgroundImage: 'url("/hero-bg.webp")', // Format WebP privilégié pour la performance (poids réduit)
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#E9E3E3',
        marginTop: '85px', // Compense la hauteur du Header fixe
        overflow: 'hidden', // Sécurité pour contenir les bulles décoratives
        boxSizing: 'border-box'
    },
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(55, 55, 53, 0.5)', // Assombrit l'image pour faire ressortir le texte clair
        zIndex: 1
    },
    bubble: {
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'rgba(201, 162, 77, 0.15)',
        zIndex: 2
    },
    bubble1: { width: '300px', height: '300px', top: '-100px', left: '-50px' },
    bubble2: { width: '200px', height: '200px', bottom: '50px', right: '-30px' },
    bubble3: { width: '100px', height: '100px', top: '20%', right: '10%' },
    content: {
        position: 'relative',
        zIndex: 3,
        padding: '0 20px',
        maxWidth: '800px'
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#C9A24D',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: '1.25rem',
        marginBottom: '40px',
        lineHeight: '1.6',
        fontWeight: '400'
    },
    button: {
        border: 'none',
        padding: '18px 45px',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};

export default Hero;