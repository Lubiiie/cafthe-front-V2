import React from 'react';

/**
 * COMPOSANT : CGV
 * ROLE : Affiche les Conditions Générales de Vente.
 * Assure la conformité légale de la plateforme e-commerce CafThé.
 */
const CGV = () => {
    return (
        <div style={styles.mainWrapper}>
            {/* INJECTION CSS : Gère la lisibilité du texte sur tous les formats d'écran */}
            <style>
                {`
                @media (max-width: 768px) {
                    .cgv-container {
                        padding: 40px 30px !important;
                        width: 95% !important;
                    }
                    .cgv-title {
                        font-size: 2rem !important;
                        margin-bottom: 30px !important;
                    }
                    .cgv-subtitle {
                        font-size: 1.3rem !important;
                    }
                    .cgv-intro {
                        font-size: 1rem !important;
                        padding-left: 15px !important;
                    }
                    .cgv-text, .cgv-list {
                        font-size: 1rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .cgv-container {
                        padding: 30px 20px !important;
                    }
                    .cgv-title {
                        font-size: 1.75rem !important;
                    }
                }
                `}
            </style>

            <main style={styles.contentArea} role="main">
                <div style={styles.pageContainer} className="cgv-container">
                    {/* TITRE PRINCIPAL : Utilise H1 pour le SEO et la hiérarchie sémantique */}
                    <h1 style={styles.mainTitle} className="cgv-title">Conditions Générales de Vente</h1>

                    <div style={styles.legalNotice}>
                        {/* INTRODUCTION : Mise en avant via une bordure gauche (Style Citation) */}
                        <p style={styles.intro} className="cgv-intro">
                            Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur le site e-commerce <strong>CafThé</strong>. Toute commande passée sur le site implique l'adhésion entière et sans réserve du client aux présentes CGV.
                        </p>

                        {/* SECTION 1 : OBJET */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="cgv-subtitle">1. Objet</h2>
                            <p style={styles.text} className="cgv-text">
                                Les présentes CGV visent à définir les obligations réciproques entre Cafthé et l'utilisateur dans le cadre de la vente de thés, cafés de spécialité et accessoires de dégustation.
                            </p>
                        </section>

                        {/* SECTION 2 : CATALOGUE */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="cgv-subtitle">2. Produits et Catalogue</h2>
                            <ul style={styles.list} className="cgv-list">
                                <li>Les produits proposés sont ceux figurant dans le Catalogue du site au moment de la consultation par l'utilisateur.</li>
                                <li>Chaque article fait l'objet d'une Fiche produit détaillée présentant ses caractéristiques essentielles et son origine.</li>
                                <li>Les visuels sont fournis à titre illustratif et restent la propriété exclusive de CafThé.</li>
                            </ul>
                        </section>

                        {/* SECTION 3 : LOGIQUE MÉTIER DE COMMANDE */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="cgv-subtitle">3. Processus de Commande</h2>
                            <p style={styles.text} className="cgv-text">Pour valider une commande, l'utilisateur doit suivre le parcours suivant :</p>
                            <ul style={styles.list} className="cgv-list">
                                <li>Sélection des produits et ajout au Panier.</li>
                                <li>Connexion au compte client ou création de compte.</li>
                                <li>Validation du mode de livraison.</li>
                                <li>Paiement sécurisé de la commande.</li>
                                <li>Réception d'un mail récapitulatif de commande.</li>
                            </ul>
                        </section>

                        {/* SECTION 4 : PAIEMENT */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="cgv-subtitle">4. Prix et Paiement</h2>
                            <p style={styles.text} className="cgv-text">
                                Les prix sont indiqués en Euros TTC. Le règlement s'effectue lors de l'étape Paiement via les moyens sécurisés mis à disposition. Cafthé se réserve le droit de modifier ses prix à tout moment.
                            </p>
                        </section>

                        {/* SECTION 5 : DROIT DE RÉTRACTATION (Point légal critique) */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="cgv-subtitle">5. Droit de Rétractation</h2>
                            <p style={styles.text} className="cgv-text">
                                Conformément à la loi, le client dispose d'un délai de 14 jours pour exercer son droit de rétractation. <strong>Note :</strong> les produits alimentaires (café/thé) ouverts ne peuvent être retournés pour des raisons d'hygiène.
                            </p>
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
        backgroundColor: '#373735', // Couleur sombre identique au Header/Footer pour la cohérence
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    contentArea: {
        flex: 1,
        paddingTop: '120px', // Espace suffisant pour ne pas être caché par le Header fixe
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
    legalNotice: {
        color: '#373735',
        fontFamily: "'Lato', sans-serif",
        lineHeight: '1.8', // Améliore le confort de lecture pour les longs textes
    },
    intro: {
        fontSize: '1.15rem',
        marginBottom: '40px',
        fontStyle: 'italic',
        borderLeft: '4px solid #C9A24D', // Rappel de la charte graphique (Doré)
        paddingLeft: '20px',
    },
    section: {
        marginBottom: '35px',
    },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    text: {
        fontSize: '1.1rem',
        marginBottom: '10px',
    },
    list: {
        fontSize: '1.1rem',
        paddingLeft: '20px',
        listStyleType: 'disc',
    },
};

export default CGV;