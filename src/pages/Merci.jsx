import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiMail, FiArrowRight } from 'react-icons/fi';
import { useCard } from "../context/CardContext";


/**
 * COMPOSANT : Merci
 * ROLE : Page de confirmation de commande après un paiement réussi.
 * FONCTION : Remise à zéro du panier et affichage des messages de rassurance.
 */
const Merci = () => {
    // --- CONSOMMATION DU CONTEXTE ---
    const { clearCart } = useCard(); // Récupère la fonction pour vider le panier
    const [isHovered, setIsHovered] = useState(null); // État local pour gérer les effets de survol JS

    /**
     * Hook d'effet qui se déclenche une seule fois au montage de la page.
     * C'est ici que l'on vide définitivement le panier car la transaction est validée.
     */
    useEffect(() => {
        clearCart();
    }, []); // Le tableau vide [] assure que l'action ne se répète pas si l'utilisateur rafraîchit la page

    return (
        <>
            {/* SEO : Configuration des balises de tête pour la page de succès */}
            
                <title>Merci pour votre commande | CafThé</title>
                <meta name="description" content="Votre commande a été validée avec succès. Merci de votre confiance." />
                <meta name="robots" content="noindex, nofollow" />
            

            <div style={styles.page}>
                {/* STYLES RESPONSIVE : Injectés via une balise style pour supporter les Media Queries */}
                <style>
                    {`
                    @media (max-width: 768px) {
                        .merci-card {
                            width: 90% !important;
                            padding: 40px 20px !important;
                            margin: 0 auto !important;
                        }
                        .merci-title {
                            font-size: 1.8rem !important;
                        }
                        .info-item-mobile {
                            padding: 15px !important;
                            gap: 12px !important;
                        }
                        .action-box-mobile {
                            width: 100% !important;
                            display: flex !important;
                            justify-content: center !important;
                        }
                        .primary-btn-mobile {
                            width: 100% !important;
                            max-width: 280px !important;
                            padding: 15px !important;
                            font-size: 1rem !important;
                            justify-content: center !important;
                        }
                    }
                    `}
                </style>

                <div style={styles.container}>
                    <div style={styles.card} className="merci-card">
                        {/* VISUEL : Icône de confirmation */}
                        <div style={styles.iconWrapper}>
                            <FiCheckCircle style={styles.successIcon} />
                        </div>

                        <h1 style={styles.title} className="merci-title">Commande confirmée !</h1>
                        <p style={styles.subtitle}>
                            Merci pour votre confiance. Votre commande a été enregistrée avec succès.
                        </p>

                        <div style={styles.divider} />

                        {/* GRILLE D'INFORMATION : Rassurance client sur la suite du processus */}
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem} className="info-item-mobile">
                                <FiMail style={styles.infoIcon} />
                                <p style={styles.infoText}>Un mail de confirmation vient de vous être envoyé.</p>
                            </div>

                            <div style={styles.infoItem} className="info-item-mobile">
                                <FiPackage style={styles.infoIcon} />
                                <p style={styles.infoText}>Nous préparons votre colis avec le plus grand soin.</p>
                            </div>
                        </div>

                        {/* NAVIGATION : Lien vers le catalogue pour relancer l'expérience utilisateur */}
                        <div style={styles.actionBox} className="action-box-mobile">
                            <Link
                                to="/catalogue"
                                className="primary-btn-mobile"
                                aria-label="Retourner au catalogue de la boutique"
                                style={{
                                    ...styles.primaryBtn,
                                    backgroundColor: isHovered === 'btn' ? '#d9b35a' : '#C9A24D'
                                }}
                                onMouseEnter={() => setIsHovered('btn')}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                Retour à la boutique <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- CONFIGURATION DES STYLES (Style Object) ---
const styles = {
    page: {
        backgroundColor: '#373735',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
    },
    container: { width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' },
    card: {
        backgroundColor: '#E9E3E3',
        borderRadius: '20px',
        padding: '60px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
    },
    iconWrapper: {
        width: '80px', height: '80px', backgroundColor: 'rgba(201, 162, 77, 0.1)',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px'
    },
    successIcon: { fontSize: '45px', color: '#C9A24D' },
    title: { fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#373735', marginBottom: '15px' },
    subtitle: { fontSize: '1.1rem', color: '#373735', opacity: 0.8, lineHeight: '1.5' },
    divider: { height: '1px', backgroundColor: 'rgba(55,55,53,0.1)', margin: '30px 0' },
    infoGrid: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
    infoItem: { display: 'flex', alignItems: 'center', gap: '20px', padding: '18px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.4)' },
    infoIcon: { fontSize: '22px', color: '#C9A24D', flexShrink: 0 },
    infoText: { fontSize: '0.95rem', color: '#373735', margin: 0 },
    actionBox: { marginTop: '40px', width: '100%' },
    primaryBtn: {
        display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 30px',
        borderRadius: '50px', color: '#373735', fontWeight: 'bold', textDecoration: 'none', transition: '0.3s'
    }
};

export default Merci;