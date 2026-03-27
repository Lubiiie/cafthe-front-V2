import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


/**
 * COMPOSANT : Contact
 * ROLE : Regroupe la FAQ interactive et le formulaire de contact avec gestion RGPD.
 * LOGIQUE : Utilise l'ancrage dynamique pour scroller vers des sections spécifiques via l'URL.
 */
const Contact = () => {
    // --- ÉTATS LOCAUX ---
    const [openIndex, setOpenIndex] = useState(null); // Gère l'affichage des réponses FAQ (accordéon)
    const [rgpdAccepted, setRgpdAccepted] = useState(false); // État de la checkbox obligatoire pour le formulaire
    const location = useLocation();

    // --- DONNÉES STATIQUES ---
    const faqData = [
        { q: "Quels sont les délais de livraison ?", a: "Vos commandes sont préparées sous 24h. Comptez 2 à 4 jours ouvrés." },
        { q: "Comment suivre ma commande ?", a: "Un numéro de suivi vous est envoyé par mail dès l'expédition." },
        { q: "Puis-je modifier ma commande ?", a: "Tant qu'elle n'est pas expédiée, contactez-nous au plus vite." }
    ];

    // --- EFFET D'ANCRAGE (Smooth Scroll) ---
    /**
     * Surveille l'URL pour détecter un paramètre "section" (ex: ?section=faq).
     * Si trouvé, scroll automatiquement vers l'élément correspondant avec un effet fluide.
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get("section");

        if (section) {
            const element = document.getElementById(section);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        }
    }, [location]);

    return (
        <>
            {/* SEO : Optimisation des métadonnées pour la page d'assistance */}
            
                <title>Contact & FAQ | CafThé - Nous sommes à votre écoute</title>
                <meta name="description" content="Une question sur nos cafés, nos thés ou votre commande ? Consultez notre FAQ ou contactez l'équipe CafThé directement via notre formulaire." />
            

            <div style={styles.pageWrapper}>
                <style>
                    {`
                    .submit-btn:hover:not(:disabled) { background-color: #E9E3E3 !important; color: #373735 !important; transform: translateY(-3px); }
                    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }
                    .faq-header:hover .question-text { color: #C9A24D; }
                    .checkbox-container:hover { opacity: 1 !important; }
                    
                    /* --- RESPONSIVE LOGIC --- */
                    @media (max-width: 992px) {
                        .content-row-res { 
                            flex-direction: column !important; 
                            gap: 40px !important; 
                        }
                        .content-row-reverse-res { 
                            flex-direction: column !important; 
                            gap: 40px !important; 
                        }
                        .text-block-res, .image-block-res { 
                            width: 100% !important; 
                            min-width: unset !important; 
                        }
                    }

                    @media (max-width: 768px) {
                        .container-res {
                            padding: 0 20px !important;
                        }
                        .main-title-res {
                            font-size: 2.2rem !important;
                        }
                        .section-dark-res {
                            padding: 60px 0 !important;
                        }
                        .image-res {
                            width: 60% !important;
                        }
                        .section-title-res {
                            font-size: 1.8rem !important;
                            text-align: center;
                        }
                        .contact-info-res {
                            text-align: center !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .main-title-res {
                            font-size: 1.8rem !important;
                        }
                        .submit-btn {
                            width: 100% !important;
                        }
                    }
                    `}
                </style>

                <header style={styles.heroSection}>
                    <h1 style={styles.mainTitle} className="main-title-res">Besoin d'aide ?</h1>
                    <p style={styles.heroSubtitle}>Consultez notre FAQ ou contactez-nous directement.</p>
                </header>

                {/* SECTION : FAQ (Accordéon interactif) */}
                <section id="faq" style={styles.sectionDark} className="section-dark-res">
                    <div style={styles.container} className="container-res">
                        <div style={styles.contentRow} className="content-row-res">
                            <div style={styles.textBlock} className="text-block-res">
                                <h2 style={styles.sectionTitle} className="section-title-res">Foire aux questions</h2>
                                <div style={{ marginTop: "30px" }}>
                                    {faqData.map((item, index) => (
                                        <div key={index} style={styles.faqItem}>
                                            <div
                                                className="faq-header"
                                                style={styles.faqHeader}
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                role="button"
                                                aria-expanded={openIndex === index}
                                                aria-label={`Voir la réponse pour : ${item.q}`}
                                            >
                                                <span className="question-text" style={styles.questionText}>{item.q}</span>
                                                {openIndex === index ? <FiChevronUp color="#C9A24D" /> : <FiChevronDown color="#C9A24D" />}
                                            </div>
                                            {/* Rendu conditionnel de la réponse selon l'index actif */}
                                            {openIndex === index && <div style={styles.faqAnswer}>{item.a}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.imageBlock} className="image-block-res">
                                <img src="/logo2.webp" alt="" style={styles.image} className="image-res" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION : FORMULAIRE DE CONTACT */}
                <section id="message" style={styles.sectionDark} className="section-dark-res">
                    <div style={styles.container} className="container-res">
                        <div style={styles.contentRowReverse} className="content-row-reverse-res">
                            <div style={styles.textBlock} className="text-block-res">
                                <h2 style={styles.sectionTitle} className="section-title-res">Nous écrire</h2>
                                <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        style={styles.input}
                                        required
                                        aria-label="Nom complet"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        style={styles.input}
                                        required
                                        aria-label="Adresse email"
                                    />
                                    <textarea
                                        placeholder="Votre message"
                                        style={styles.textarea}
                                        required
                                        aria-label="Votre message"
                                    ></textarea>

                                    {/* CONFORMITÉ RGPD : Consentement obligatoire pour soumettre */}
                                    <div className="checkbox-container" style={styles.rgpdContainer}>
                                        <label style={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={rgpdAccepted}
                                                onChange={() => setRgpdAccepted(!rgpdAccepted)}
                                                style={styles.checkbox}
                                                aria-label="Accepter l'utilisation des données personnelles"
                                            />
                                            <span>
                                                J'accepte que mes données soient utilisées pour traiter ma demande conformément à la <Link to="/politique-confidentialite" style={styles.rgpdLink}>politique de confidentialité</Link>.
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={!rgpdAccepted}
                                        style={styles.submitButton}
                                        aria-label="Envoyer le formulaire de contact"
                                    >
                                        Envoyer le message
                                    </button>
                                </form>
                            </div>
                            <div style={styles.imageBlock} className="image-block-res">
                                <div style={styles.contactInfo} className="contact-info-res">
                                    <h3 style={{ color: "#C9A24D", fontFamily: "Playfair Display", marginBottom: "15px" }}>CafThé Boutique</h3>
                                    <p style={styles.paragraph}>15 Rue de l'Excellence, 75001 Paris</p>
                                    <p style={styles.paragraph}>contact@cafthe.fr</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

// --- CONFIGURATION DES STYLES ---
const styles = {
    pageWrapper: { backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "120px" },
    heroSection: { maxWidth: "900px", margin: "0 auto 80px auto", textAlign: "center", padding: "0 20px" },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#373735", marginBottom: "25px" },
    heroSubtitle: { fontSize: "1.15rem", lineHeight: "1.6", color: "#373735", opacity: 0.9 },
    sectionDark: { backgroundColor: "#373735", padding: "80px 0", marginBottom: "40px" },
    container: { maxWidth: "1200px", margin: "0 auto", padding: "0 40px" },
    contentRow: { display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    contentRowReverse: { display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    textBlock: { flex: "1", minWidth: "300px", color: "#E9E3E3" },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", color: "#C9A24D", marginBottom: "20px" },
    paragraph: { fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "15px", opacity: 0.8 },
    imageBlock: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center" },
    image: { width: "80%", maxWidth: "500px", borderRadius: "10px", transition: "all 0.4s ease", cursor: "pointer" },
    faqItem: { borderBottom: "1px solid rgba(201, 162, 77, 0.3)", padding: "15px 0" },
    faqHeader: { display: "flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center", transition: "0.3s" },
    questionText: { fontSize: "1.15rem", fontWeight: "500", transition: "0.3s" },
    faqAnswer: { marginTop: "15px", opacity: 0.7, lineHeight: "1.6", fontSize: "1.05rem", paddingBottom: "10px" },
    form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
    input: { backgroundColor: "#E9E3E3", border: "none", padding: "14px", borderRadius: "8px", outline: "none", fontSize: "1rem" },
    textarea: { backgroundColor: "#E9E3E3", border: "none", padding: "14px", borderRadius: "8px", minHeight: "120px", outline: "none", fontFamily: "inherit", fontSize: "1rem" },
    rgpdContainer: { marginTop: "10px", padding: "5px", opacity: 0.8, transition: "0.3s" },
    checkboxLabel: { display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.95rem", cursor: "pointer", lineHeight: "1.4" },
    checkbox: { marginTop: "3px", accentColor: "#C9A24D", width: "18px", height: "18px" },
    rgpdLink: { color: "#C9A24D", textDecoration: "underline" },
    submitButton: {
        backgroundColor: "#C9A24D", color: "#373735", border: "none", padding: "15px",
        borderRadius: "30px", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease",
        fontFamily: "Playfair Display", fontSize: "1.1rem"
    },
    contactInfo: { textAlign: "left", width: "100%", color: "#E9E3E3" }
};

export default Contact;