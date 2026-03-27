import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * COMPOSANT : Footer
 * ROLE : Fournit la navigation secondaire, les informations légales et le retour en haut de page.
 */
const Footer = () => {
    // --- NAVIGATION ---
    const navigate = useNavigate();

    // --- LOGIQUE DE SCROLL ---
    /** Remonte l'utilisateur en haut de la fenêtre avec un effet fluide */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // --- GESTION DES LIENS DE NAVIGATION ---

    /** Navigue vers le catalogue en appliquant un filtre d'URL */
    const filterTo = (cat) => {
        navigate(`/catalogue?filter=${cat}`);
        // Timeout nécessaire pour laisser le temps au DOM de se mettre à jour avant le scroll
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    /** Navigue vers une section spécifique de la page contact (via Query Params) */
    const goToContact = (section) => {
        navigate(`/contact?section=${section}`);
    };

    /** Navigation standard vers une page avec reset instantané de la position du scroll */
    const goToPage = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
    };

    // --- ACCESSIBILITÉ (A11y) ---
    /** * Permet d'exécuter l'action au clavier (touche Entrée)
     * Indispensable car les liens sont des balises <span> et non <a>
     */
    const handleKeyDown = (e, callback) => {
        if (e.key === 'Enter') {
            callback();
        }
    };

    return (
        <footer style={styles.footer}>
            {/* INJECTION CSS : Gère les animations de hover et les Media Queries complexes */}
            <style>
                {`
                .footer-link { transition: all 0.3s ease; outline: none; }
                .footer-link:hover, .footer-link:focus { color: #C9A24D !important; transform: translateX(5px); }
                
                .legal-link { transition: opacity 0.3s ease; outline: none; }
                .legal-link:hover, .legal-link:focus { opacity: 0.7; color: #E9E3E3 !important; }

                .scroll-btn { transition: transform 0.3s ease; outline: none; }
                .scroll-btn:hover, .scroll-btn:focus { transform: translateY(-3px); color: #E9E3E3 !important; }

                @media (max-width: 992px) {
                    .footer-content { flex-wrap: wrap !important; gap: 40px !important; }
                    .footer-column { flex: 1 1 40% !important; }
                }

                @media (max-width: 600px) {
                    .footer-content { flex-direction: column !important; align-items: center !important; text-align: center !important; }
                    .footer-column { width: 100% !important; }
                    .footer-link:hover { transform: translateY(-2px) !important; }
                    .legal-wrapper { grid-template-columns: 1fr !important; gap: 20px !important; text-align: center !important; }
                    .legal-left, .legal-right { justify-content: center !important; }
                    .legal-right { flex-direction: column !important; gap: 15px !important; }
                    .logo-big { width: 180px !important; margin-top: 20px; }
                }
                `}
            </style>

            {/* SECTION 1 : NAVIGATION PRINCIPALE DU FOOTER */}
            <div style={styles.navSection}>
                <div style={styles.contentWrapper} className="footer-content">
                    {/* COLONNE PRODUITS */}
                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>Nos produits</h4>
                        <span role="button" tabIndex="0" onClick={() => filterTo("Café")} onKeyDown={(e) => handleKeyDown(e, () => filterTo("Café"))} style={styles.link} className="footer-link" aria-label="Voir nos cafés">Cafés</span>
                        <span role="button" tabIndex="0" onClick={() => filterTo("Thé")} onKeyDown={(e) => handleKeyDown(e, () => filterTo("Thé"))} style={styles.link} className="footer-link" aria-label="Voir nos thés">Thé</span>
                        <span role="button" tabIndex="0" onClick={() => filterTo("Accessoire")} onKeyDown={(e) => handleKeyDown(e, () => filterTo("Accessoire"))} style={styles.link} className="footer-link" aria-label="Voir nos accessoires">Accessoires</span>
                        <span role="button" tabIndex="0" onClick={() => filterTo("Tous")} onKeyDown={(e) => handleKeyDown(e, () => filterTo("Tous"))} style={styles.link} className="footer-link" aria-label="Voir toutes nos offres">Nos offres</span>
                    </div>

                    {/* COLONNE À PROPOS */}
                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>À propos</h4>
                        <span role="button" tabIndex="0" onClick={() => goToPage("/nos-engagements")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/nos-engagements"))} style={styles.link} className="footer-link" aria-label="Découvrir nos engagements">Nos engagements</span>
                        <span role="button" tabIndex="0" onClick={() => goToPage("/notre-histoire")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/notre-histoire"))} style={styles.link} className="footer-link" aria-label="Lire notre histoire">Notre histoire</span>
                    </div>

                    {/* COLONNE CONTACT */}
                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>Contact</h4>
                        <span role="button" tabIndex="0" onClick={() => goToContact("faq")} onKeyDown={(e) => handleKeyDown(e, () => goToContact("faq"))} style={styles.link} className="footer-link" aria-label="Consulter la foire aux questions">FAQ</span>
                        <span role="button" tabIndex="0" onClick={() => goToContact("message")} onKeyDown={(e) => handleKeyDown(e, () => goToContact("message"))} style={styles.link} className="footer-link" aria-label="Nous envoyer un message">Besoin d’aide</span>
                    </div>

                    {/* LOGO SECONDAIRE */}
                    <div style={styles.logoContainer} className="footer-column">
                        <img src="/logo2.webp" alt="CafThé Logo" style={styles.logoBig} className="logo-big" />
                    </div>
                </div>
            </div>

            {/* SECTION 2 : BARRE LÉGALE & RETOUR HAUT */}
            <div style={styles.legalBar}>
                <div style={styles.legalWrapper} className="legal-wrapper">
                    <div style={styles.legalLeft} className="legal-left">
                        <img src="/logo1.webp" alt="Icone CafThé" style={styles.logoSmall} />
                    </div>

                    {/* BOUTON RETOUR EN HAUT */}
                    <div style={styles.legalCenter}>
                        <span role="button" tabIndex="0" onClick={scrollToTop} onKeyDown={(e) => handleKeyDown(e, scrollToTop)} style={styles.scrollTop} className="scroll-btn" aria-label="Retourner en haut de la page">Haut de page ↑</span>
                    </div>

                    {/* LIENS JURIDIQUES */}
                    <div style={styles.legalRight} className="legal-right">
                        <span role="button" tabIndex="0" onClick={() => goToPage("/mentions-legales")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/mentions-legales"))} style={styles.legalLink} className="legal-link" aria-label="Consulter les mentions légales">Mentions légales</span>
                        <span role="button" tabIndex="0" onClick={() => goToPage("/cgv")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/cgv"))} style={styles.legalLink} className="legal-link" aria-label="Voir les conditions générales de vente">CGV</span>
                        <span role="button" tabIndex="0" onClick={() => goToPage("/politique-confidentialite")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/politique-confidentialite"))} style={styles.legalLink} className="legal-link" aria-label="Lire la politique de confidentialité">Politique de confidentialité</span>
                        <span role="button" tabIndex="0" onClick={() => goToPage("/plan-site")} onKeyDown={(e) => handleKeyDown(e, () => goToPage("/plan-site"))} style={styles.legalLink} className="legal-link" aria-label="Voir le plan du site">Plan du site</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- STYLES ---
const styles = {
    footer: { width: "100%", display: "flex", flexDirection: "column", margin: 0, padding: 0, boxSizing: "border-box" },
    navSection: { backgroundColor: "#E9E3E3", width: "100%", padding: "60px 0" },
    contentWrapper: { maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", padding: "0 5%", boxSizing: "border-box" },
    column: { display: "flex", flexDirection: "column", gap: "12px", boxSizing: "border-box" },
    title: { fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#373735", marginBottom: "20px", fontWeight: "bold" },
    link: { fontSize: "1.1rem", color: "#373735", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px", display: "inline-block" },
    logoContainer: { display: "flex", alignItems: "center", justifyContent: "center" },
    logoBig: { width: "220px", height: "auto", transition: "width 0.3s ease" },
    legalBar: { backgroundColor: "#373735", width: "100%", padding: "20px 0" },
    legalWrapper: { maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0 5%", color: "#C9A24D", boxSizing: "border-box" },
    legalLeft: { display: "flex", justifyContent: "flex-start" },
    legalCenter: { textAlign: "center" },
    legalRight: { display: "flex", justifyContent: "flex-end", gap: "30px" },
    logoSmall: { width: "45px", height: "auto" },
    scrollTop: { cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", display: "inline-block" },
    legalLink: { fontSize: "1rem", cursor: "pointer" }
};

export default Footer;