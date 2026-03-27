import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


/**
 * COMPOSANT : Register
 * ROLE : Interface de création de compte. Collecte les infos personnelles,
 * les normalise et les envoie à l'API pour inscription.
 */
const Register = () => {
    const navigate = useNavigate();

    // --- ÉTAT DU FORMULAIRE (State unique pour tout l'objet) ---
    // On regroupe tout dans un seul objet pour simplifier la gestion des entrées
    const [formData, setFormData] = useState({
        nom_client: "",
        prenom_client: "",
        adresse_livraison: "",
        code_postal_livraison: "",
        ville_livraison: "",
        email_client: "",
        telephone: "",
        mdp_client: ""
    });

    const [isHovered, setIsHovered] = useState(false);

    // --- GESTIONNAIRE DE CHANGEMENT DYNAMIQUE ---
    /** * Cette fonction met à jour la bonne clé de l'objet formData
     * en utilisant l'attribut 'name' de l'input HTML.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- SOUMISSION AU BACKEND ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Évite le rafraîchissement de la page

        // NORMALISATION DES DONNÉES :
        // Le backend attend souvent une adresse de facturation.
        // Par défaut, on duplique l'adresse de livraison pour simplifier l'UX.
        const dataToSend = {
            ...formData,
            adresse_facturation: formData.adresse_livraison,
            code_postal_facturation: formData.code_postal_livraison,
            ville_facturation: formData.ville_livraison
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                // Redirection vers la page de connexion après succès
                navigate("/login");
            } else {
                alert("Erreur lors de la création du compte (email déjà utilisé ?)");
            }
        } catch (error) {
            console.error("Erreur serveur:", error);
        }
    };

    return (
        <>
            {/* SEO : Configuration des balises Meta pour l'inscription */}
            
                <title>Créer un compte | CafThé</title>
                <meta name="description" content="Rejoignez la communauté CafThé pour un suivi personnalisé." />
                <meta name="robots" content="noindex, follow" />
            

            <div style={styles.overlay} className="register-overlay-res">
                {/* INJECTION CSS : Gestion du responsive spécifique au formulaire long */}
                <style>
                    {`
                    @media (max-width: 920px) {
                        .register-overlay-res { padding-top: 100px !important; align-items: flex-start !important; }
                        .register-modal { width: 95% !important; margin-bottom: 40px !important; }
                        .register-dark-section { padding: 40px 30px !important; }
                    }
                    `}
                </style>

                <div style={styles.modal} className="register-modal">
                    <div style={styles.header}>
                        <img src="/logo2.webp" alt="CafThé" style={styles.logo} className="register-logo" />
                    </div>

                    <div style={styles.darkSection} className="register-dark-section">
                        <form onSubmit={handleSubmit} style={styles.form}>

                            {/* GROUPE 1 : IDENTIFIANTS */}
                            <div style={styles.inputGroup}>
                                <input name="prenom_client" placeholder="Prénom" style={styles.input} onChange={handleChange} />
                                <input name="nom_client" placeholder="Nom" style={styles.input} onChange={handleChange} required />
                                <input name="email_client" type="email" placeholder="Email" style={styles.input} onChange={handleChange} required />
                                <input name="mdp_client" type="password" placeholder="Mot de passe" style={styles.input} onChange={handleChange} required />
                            </div>

                            <hr style={styles.divider} />

                            {/* GROUPE 2 : LIVRAISON */}
                            <div style={styles.inputGroup}>
                                <input name="adresse_livraison" placeholder="Adresse de livraison" style={styles.input} onChange={handleChange} />
                                <input name="ville_livraison" placeholder="Ville" style={styles.input} onChange={handleChange} />
                                <input name="code_postal_livraison" placeholder="Code postal" style={styles.input} onChange={handleChange} maxLength="5" />
                                <input name="telephone" placeholder="Numéro de téléphone" style={styles.input} onChange={handleChange} maxLength="10" />
                            </div>

                            <div style={styles.footerAction}>
                                <button
                                    type="submit"
                                    style={{
                                        ...styles.submitBtn,
                                        backgroundColor: isHovered ? "#C9A24D" : "#E9E3E3",
                                        color: isHovered ? "#FFF" : "#C9A24D"
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    Continuer
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={styles.footer}>
                        <p style={styles.legalText}>
                            Vos données sont recueillies exclusivement pour assurer la gestion de votre compte et le suivi de vos commandes.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- STYLES ---
const styles = {
    overlay: { width: "100%", minHeight: "100vh", backgroundColor: "#E9E3E3", display: "flex", justifyContent: "center", padding: "40px 0" },
    modal: { width: "750px", backgroundColor: "#E9E3E3", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" },
    header: { height: "120px", display: "flex", justifyContent: "center", alignItems: "center" },
    logo: { width: "250px", height: "auto" },
    darkSection: { backgroundColor: "#373735", padding: "50px 100px" },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "18px" },
    input: { width: "100%", padding: "15px 20px", backgroundColor: "#E9E3E3", border: "none", borderRadius: "4px", fontSize: "1rem" },
    divider: { width: "100%", border: "0.5px solid #E9E3E3", margin: "25px 0", opacity: 0.2 },
    footerAction: { display: "flex", justifyContent: "flex-end" },
    submitBtn: { padding: "14px 60px", borderRadius: "30px", border: "none", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease" },
    footer: { padding: "40px 80px", textAlign: "center" },
    legalText: { fontSize: "0.9rem", color: "#373735", lineHeight: "1.6" }
};

export default Register;