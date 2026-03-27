import React from 'react';

/**
 * COMPOSANT : NosEngagements
 * ROLE : Présente les valeurs éthiques, écologiques et qualitatives de l'enseigne CafThé.
 * STRUCTURE : Alternance de blocs texte/image pour briser la monotonie visuelle.
 */
const NosEngagements = () => {
    return (
        <div style={styles.pageWrapper}>
            {/* INJECTION CSS : Logique de mise en page responsive (Passage de Flex-row à Flex-column) */}
            <style>
                {`
                @media (max-width: 992px) {
                    /* On empile les blocs texte et image verticalement sur tablettes et mobiles */
                    .content-row-res, .content-row-reverse-res { 
                        flex-direction: column !important; 
                        gap: 40px !important; 
                    }
                    .text-block-res { 
                        width: 100% !important; 
                        text-align: center !important;
                    }
                    .image-res {
                        width: 80% !important; /* On agrandit l'image pour occuper l'espace mobile */
                    }
                }

                @media (max-width: 768px) {
                    .main-title-res { font-size: 2.2rem !important; }
                    .section-dark-res { padding: 60px 0 !important; }
                    .section-title-res { font-size: 1.8rem !important; }
                }
                `}
            </style>

            {/* HEADER / HERO SECTION : Introduction de la page */}
            <header style={styles.heroSection}>
                <h1 style={styles.mainTitle} className="main-title-res">Nos engagements</h1>
                <p style={styles.heroSubtitle} className="hero-subtitle-res">
                    Parce que l'excellence ne s'arrête pas à la qualité du grain ou de la feuille,
                    nous plaçons l'éthique et la transparence au cœur de chaque décision.
                </p>
            </header>

            {/* ENGAGEMENT 1 : QUALITÉ (Structure Image à Droite) */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRow} className="content-row-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">Une sélection sans compromis</h2>
                            <p style={styles.paragraph}>
                                Nous parcourons le monde pour dénicher des terroirs confidentiels. Chaque produit de notre catalogue
                                répond à un cahier des charges strict garantissant une pureté et une fraîcheur absolue.
                            </p>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img2.webp" alt="Sélection artisanale" style={styles.image} className="image-res" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ENGAGEMENT 2 : ÉTHIQUE (Structure Image à Gauche via 'row-reverse') */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRowReverse} className="content-row-reverse-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">Sourcing éthique & durable</h2>
                            <p style={styles.paragraph}>
                                Nous privilégions le commerce direct avec les petits producteurs. En supprimant les intermédiaires inutiles,
                                nous assurons une juste rémunération à ceux qui font la noblesse de nos produits.
                            </p>
                            {/* ÉLÉMENT GRAPHIQUE : Citation pour renforcer le message */}
                            <blockquote style={styles.quote} className="quote-res">
                                "Respecter la terre et ceux qui la travaillent."
                            </blockquote>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img1.webp" alt="Sourcing éthique" style={styles.image} className="image-res" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ENGAGEMENT 3 : ACCOMPAGNEMENT */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRow} className="content-row-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">Un service d'exception</h2>
                            <p style={styles.paragraph}>
                                Votre expérience CafThé ne s'arrête pas à la commande. Notre équipe est là pour vous conseiller
                                sur les méthodes de préparation et l'entretien de vos accessoires.
                            </p>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img2.webp" alt="Service client" style={styles.image} className="image-res" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- CONFIGURATION DES STYLES ---
const styles = {
    pageWrapper: { backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "120px" },
    heroSection: { maxWidth: "900px", margin: "0 auto 80px auto", textAlign: "center", padding: "0 20px" },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#373735", marginBottom: "25px" },
    sectionDark: { backgroundColor: "#373735", padding: "80px 0", marginBottom: "40px" },
    container: { maxWidth: "1200px", margin: "0 auto", padding: "0 40px" },
    contentRow: { display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    contentRowReverse: { display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    textBlock: { flex: "1", minWidth: "300px", color: "#E9E3E3" },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", color: "#C9A24D", marginBottom: "20px" },
    paragraph: { fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "15px", opacity: 0.8 },
    quote: { fontStyle: "italic", fontSize: "1.4rem", borderLeft: "3px solid #C9A24D", paddingLeft: "20px", margin: "30px 0", color: "#C9A24D" },
    imageBlock: { flex: "1", minWidth: "300px", display: "flex", justifyContent: "center" },
    image: { width: "50%", maxWidth: "500px", borderRadius: "10px", boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }
};

export default NosEngagements;