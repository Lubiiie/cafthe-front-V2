import React from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPOSANT : PlanSite
 * ROLE : Fournit une vue d'ensemble de l'architecture du site (Sitemap).
 * UTILITÉ : Améliore le SEO et permet aux utilisateurs de trouver une page rapidement.
 */
const PlanSite = () => {
    return (
        <div style={styles.mainWrapper}>
            {/* INJECTION CSS : Gère les effets de survol et le responsive design */}
            <style>
                {`
                .plansite-link:hover { color: #C9A24D !important; border-bottom: 1px solid #C9A24D !important; }

                /* RESPONSIVE : Tablettes et écrans intermédiaires */
                @media (max-width: 920px) {
                    .plansite-main { padding-top: 140px !important; }
                    .plansite-container { width: 95% !important; padding: 40px 25px !important; }
                    .plansite-title { font-size: 2.2rem !important; }
                }

                /* RESPONSIVE : Mobiles */
                @media (max-width: 480px) {
                    .plansite-title { font-size: 1.8rem !important; }
                }
                `}
            </style>

            <main style={styles.contentArea} className="plansite-main" role="main">
                <div style={styles.pageContainer} className="plansite-container">
                    <h1 style={styles.mainTitle} className="plansite-title">Plan du site</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro} className="plansite-intro">
                            Retrouvez ici l'ensemble des pages de <strong>CafThé</strong>. Naviguez facilement à travers notre catalogue, votre espace client et nos informations légales.
                        </p>

                        {/* SECTION 1 : NAVIGATION GÉNÉRALE */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Navigation Principale</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}>
                                    <Link to="/" style={styles.link} className="plansite-link" aria-label="Accueil">Accueil</Link>
                                </li>
                                <li style={styles.listItem}>
                                    <Link to="/panier" style={styles.link} className="plansite-link" aria-label="Panier">Votre Panier</Link>
                                </li>
                                <li style={styles.listItem}>
                                    <Link to="/login" style={styles.link} className="plansite-link" aria-label="Connexion">Connexion / Inscription</Link>
                                </li>
                            </ul>
                        </section>

                        {/* SECTION 2 : LIENS UTILISATEURS (COMPTE) */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Espace Client</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}>
                                    <Link to="/compte" style={styles.link} className="plansite-link">Mon Compte</Link>
                                </li>
                                {/* Note : Ces liens pointent vers la même page mais illustrent les services disponibles */}
                                <li style={styles.listItem}>
                                    <Link to="/compte" style={styles.link} className="plansite-link">Historique des commandes</Link>
                                </li>
                            </ul>
                        </section>

                        {/* SECTION 3 : BAS DE PAGE ET JURIDIQUE */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Informations Légales</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}>
                                    <Link to="/mentions-legales" style={styles.link} className="plansite-link">Mentions Légales</Link>
                                </li>
                                <li style={styles.listItem}>
                                    <Link to="/cgv" style={styles.link} className="plansite-link">Conditions Générales de Vente (CGV)</Link>
                                </li>
                                <li style={styles.listItem}>
                                    <Link to="/plan-site" style={styles.link} className="plansite-link">Plan du site</Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- STYLES ---
const styles = {
    mainWrapper: {
        backgroundColor: '#373735',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    contentArea: {
        flex: 1,
        paddingTop: '120px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
    },
    pageContainer: {
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#E9E3E3',
        borderRadius: '15px',
        padding: '60px 80px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        color: '#373735',
        textAlign: 'center',
        marginBottom: '50px',
        fontWeight: 'bold',
    },
    intro: {
        fontSize: '1.15rem',
        marginBottom: '40px',
        fontStyle: 'italic',
        borderLeft: '4px solid #C9A24D',
        paddingLeft: '20px',
    },
    section: { marginBottom: '35px' },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    list: { paddingLeft: '20px', listStyleType: 'none' },
    listItem: { marginBottom: '12px', display: 'flex', alignItems: 'center' },
    link: {
        color: '#373735',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1.1rem',
        fontWeight: '500',
        borderBottom: '1px solid transparent'
    }
};

export default PlanSite;