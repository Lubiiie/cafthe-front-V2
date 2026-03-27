import React from 'react';
import Header from '../components/Header.jsx';

/**
 * COMPOSANT : PolitiqueConfidentialite
 * ROLE : Explique de manière transparente comment les données sont traitées (RGPD).
 * INDISPENSABLE : Pour valider la conformité du traitement des formulaires (Contact, Login, Commande).
 */
const PolitiqueConfidentialite = () => {
    return (
        <div style={styles.mainWrapper}>
            {/* INJECTION CSS : Optimisation du confort de lecture sur mobile */}
            <style>
                {`
                @media (max-width: 920px) {
                    .politique-main { padding-top: 140px !important; }
                    .politique-container { width: 95% !important; padding: 40px 25px !important; }
                    .politique-title { font-size: 2.2rem !important; }
                }
                `}
            </style>

            <Header />

            <main style={styles.contentArea} className="politique-main" role="main">
                <div style={styles.pageContainer} className="politique-container">
                    <h1 style={styles.mainTitle} className="politique-title">Politique de confidentialité</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro} className="politique-intro">
                            La présente Politique de confidentialité a pour but d'informer les utilisateurs du site Cafthé sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.
                        </p>

                        {/* SECTION 1 : NATURE DES DONNÉES (Lien avec ta BDD) */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">1. Collecte des données personnelles</h2>
                            <p style={styles.text}>Dans le cadre de l'exploitation du site, nous collectons les données suivantes :</p>
                            <ul style={styles.list}>
                                <li><strong>Données d'identification :</strong> Nom, prénom, e-mail (Table 'Clients').</li>
                                <li><strong>Données logistiques :</strong> Adresse de livraison, téléphone (Table 'Commandes').</li>
                                <li><strong>Paiement :</strong> Traité par PayPal ; aucune donnée bancaire n'est stockée sur nos serveurs.</li>
                            </ul>
                        </section>

                        {/* SECTION 2 : FINALITÉ DU TRAITEMENT */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">2. Utilisation des données</h2>
                            <p style={styles.text}>Vos données sont traitées pour :</p>
                            <ul style={styles.list}>
                                <li>Expédition des cafés, thés et accessoires.</li>
                                <li>Gestion de l'historique dans votre espace client.</li>
                                <li>Support client via le formulaire de contact.</li>
                            </ul>
                        </section>

                        {/* SECTION 5 : DROITS DES UTILISATEURS (RGPD) */}
                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">5. Vos droits (RGPD)</h2>
                            <p style={styles.text}>Vous disposez des droits suivants :</p>
                            <ul style={styles.list}>
                                <li><strong>Droit d'accès :</strong> Consultation de vos données sur la page "Compte".</li>
                                <li><strong>Droit à l'effacement :</strong> Possibilité de supprimer votre compte via l'interface dédiée.</li>
                                <li><strong>Droit d'opposition :</strong> Désinscription des communications marketing.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">6. Sécurité</h2>
                            <p style={styles.text}>
                                Nous utilisons le protocole **HTTPS** et le hachage des mots de passe pour garantir l'intégrité de vos informations.
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
    mainWrapper: { backgroundColor: '#373735', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    contentArea: { flex: 1, paddingTop: '120px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' },
    pageContainer: { width: '90%', maxWidth: '1000px', backgroundColor: '#E9E3E3', borderRadius: '15px', padding: '60px 80px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#373735', textAlign: 'center', marginBottom: '50px' },
    intro: { fontSize: '1.15rem', marginBottom: '40px', fontStyle: 'italic', borderLeft: '4px solid #C9A24D', paddingLeft: '20px' },
    section: { marginBottom: '35px' },
    subTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#373735', borderBottom: '1px solid rgba(55, 55, 53, 0.1)', paddingBottom: '10px', display: 'inline-block' },
    text: { fontSize: '1.1rem', marginBottom: '10px' },
    list: { fontSize: '1.1rem', paddingLeft: '20px' },
};

export default PolitiqueConfidentialite;