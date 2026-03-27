import React from 'react';
import Header from '../components/Header.jsx';


/**
 * COMPOSANT : MentionsLegales
 * ROLE : Affiche les informations obligatoires permettant d'identifier l'éditeur
 * et l'hébergeur du site (Loi LCEN).
 */
const MentionsLegales = () => {
    return (
        <>
            {/* SEO : Empêche l'indexation pour ne pas polluer les résultats de recherche Google */}
            
                <title>Mentions Légales | CafThé</title>
                <meta name="description" content="Consultez les mentions légales du site Cafthé. Informations sur l'éditeur, l'hébergeur et la protection des données personnelles." />
                <meta name="robots" content="noindex, follow" />
            

            <div style={styles.mainWrapper}>
                {/* INJECTION CSS : Adaptabilité pour tablettes et smartphones */}
                <style>
                    {`
                    @media (max-width: 920px) {
                        .mentions-main { padding-top: 140px !important; }
                        .mentions-container { width: 95% !important; padding: 40px 25px !important; }
                        .mentions-title { font-size: 2.2rem !important; }
                    }
                    @media (max-width: 480px) {
                        .mentions-title { font-size: 1.8rem !important; }
                    }
                    `}
                </style>

                <Header />

                <main style={styles.contentArea} className="mentions-main" role="main">
                    <div style={styles.pageContainer} className="mentions-container">
                        <h1 style={styles.mainTitle} className="mentions-title">Mentions légales</h1>

                        <div style={styles.legalNotice}>
                            {/* INTRODUCTION : Rappel de la loi LCEN (Loi pour la Confiance dans l'Économie Numérique) */}
                            <p style={styles.intro} className="mentions-intro">
                                Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs du site Cafthé les présentes mentions légales.
                            </p>

                            {/* SECTION 1 : L'ÉDITEUR (Qui a créé le site ?) */}
                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">1. Éditeur du site</h2>
                                <p style={styles.text} className="mentions-text">Le site Cafthé est édité par :</p>
                                <ul style={styles.list} className="mentions-list">
                                    <li><strong>Nom/Raison sociale :</strong> CafThé</li>
                                    <li><strong>Forme juridique :</strong> SAS</li>
                                    <li><strong>Responsable de la publication :</strong> Agathe Courtois</li>
                                    <li><strong>Contact :</strong> contact@cafthe.fr</li>
                                </ul>
                            </section>

                            {/* SECTION 2 : L'HÉBERGEUR (Où est stocké le site ?) */}
                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">2. Hébergeur du site</h2>
                                <p style={styles.text} className="mentions-text">Le site est hébergé par :</p>
                                <ul style={styles.list} className="mentions-list">
                                    <li><strong>Nom de l'hébergeur :</strong> [À remplir lors du déploiement, ex: Vercel ou Render]</li>
                                    <li><strong>Adresse :</strong> [Adresse de l'hébergeur]</li>
                                </ul>
                            </section>

                            {/* SECTION 3 : PROPRIÉTÉ INTELLECTUELLE */}
                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">3. Propriété intellectuelle</h2>
                                <p style={styles.text} className="mentions-text">
                                    L'ensemble des éléments constituant le site Cafthé (logo, charte graphique, photographies de produits) sont la propriété exclusive de l'éditeur.
                                </p>
                            </section>

                            {/* SECTION 4 : RGPD / DONNÉES PERSONNELLES */}
                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">4. Données personnelles</h2>
                                <p style={styles.text} className="mentions-text">
                                    Le site assure à l'utilisateur une collecte d'informations personnelles dans le respect de la vie privée, conformément à la loi Informatique et Libertés.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

// --- STYLES ---
const styles = {
    mainWrapper: {
        backgroundColor: '#373735', // Fond sombre cohérent avec l'identité CafThé
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    contentArea: {
        flex: 1,
        paddingTop: '120px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center'
    },
    pageContainer: {
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#E9E3E3',
        borderRadius: '15px',
        padding: '60px 80px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        color: '#373735',
        textAlign: 'center',
        marginBottom: '50px',
        fontWeight: 'bold'
    },
    legalNotice: {
        color: '#373735',
        fontFamily: "'Lato', sans-serif",
        lineHeight: '1.8'
    },
    intro: {
        fontSize: '1.15rem',
        marginBottom: '40px',
        fontStyle: 'italic',
        borderLeft: '4px solid #C9A24D',
        paddingLeft: '20px'
    },
    section: { marginBottom: '35px' },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block'
    },
    text: { fontSize: '1.1rem', marginBottom: '10px' },
    list: { fontSize: '1.1rem', listStyleType: 'none', paddingLeft: '0' }
};

export default MentionsLegales;