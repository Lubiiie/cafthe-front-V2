import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FiX } from "react-icons/fi";


const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isForgotHovered, setIsForgotHovered] = useState(false);
    const [isCreateHovered, setIsCreateHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const baseUrl = import.meta.env.VITE_API_URL || "https://cafthe.acourtois.dev-campus.fr";
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        try {
            const response = await fetch(`${cleanBaseUrl}/api/clients/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_client: email,
                    mdp_client: motDePasse,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Identifiants incorrects");
                return;
            }

            const { token, client } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", client.numero_client);
            localStorage.setItem('userPrenom', client.prenom_client);

            login(token, client);
            navigate("/compte");
        } catch (error) {
            console.error("Erreur login:", error);
            setErrorMsg("Le serveur ne répond pas.");
        }
    };

    return (
        <>
            
                <title>Connexion | CafThé</title>
                <meta name="description" content="Connectez-vous à votre compte CafThé pour suivre vos commandes." />
                <meta name="robots" content="noindex, follow" />
            

            <div style={styles.overlay} className="login-overlay-responsive">
                <style>
                    {`
                    /* --- TON CSS RESPONSIVE REGROUPÉ ICI --- */
                    @media (max-width: 920px) {
                        .login-overlay-responsive {
                            padding-top: 100px !important; 
                            align-items: flex-start !important;
                            height: auto !important;
                            min-height: 100vh !important;
                            overflow-y: auto !important;
                        }
                        .login-modal {
                            width: 95% !important;
                            max-width: 500px !important;
                            margin-bottom: 40px !important;
                        }
                    }

                    @media (max-width: 768px) {
                        .login-header { padding: 30px 40px !important; }
                        .login-title { font-size: 2.2rem !important; }
                        .login-dark-section { padding: 40px 30px !important; }
                        .login-input { max-width: 100% !important; }
                        .login-forgot-row {
                            flex-direction: column !important;
                            gap: 20px !important;
                            text-align: center !important;
                        }
                        .login-btn-res { width: 100% !important; }
                    }

                    @media (max-width: 480px) {
                        .login-title { font-size: 1.8rem !important; }
                    }
                    `}
                </style>

                <div style={styles.modal} className="login-modal">
                    <div style={styles.header} className="login-header">
                        <h1 style={styles.mainTitle} className="login-title">Se connecter</h1>
                        <FiX
                            style={styles.closeIcon}
                            onClick={() => navigate("/")}
                            aria-label="Fermer la fenêtre de connexion"
                        />
                    </div>

                    <div style={styles.darkSection} className="login-dark-section">
                        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <input
                                type="email"
                                placeholder="Votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                className="login-input"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                                style={styles.input}
                                className="login-input"
                                required
                            />

                            <div style={styles.forgotRow} className="login-forgot-row">
                                <span
                                    style={{...styles.forgotLink, color: isForgotHovered ? "#C9A24D" : "#E9E3E3"}}
                                    onMouseEnter={() => setIsForgotHovered(true)}
                                    onMouseLeave={() => setIsForgotHovered(false)}
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Mot de passe oublié ?
                                </span>

                                <button
                                    type="submit"
                                    className="login-btn-res"
                                    style={{
                                        ...styles.loginBtn,
                                        backgroundColor: isLoginHovered ? "#C9A24D" : "#E9E3E3",
                                        color: isLoginHovered ? "#FFF" : "#C9A24D"
                                    }}
                                    onMouseEnter={() => setIsLoginHovered(true)}
                                    onMouseLeave={() => setIsLoginHovered(false)}
                                >
                                    Se connecter
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Vous n’avez pas de compte ? <br style={{display: window.innerWidth < 480 ? 'block' : 'none'}} />
                            <span
                                style={{...styles.createAccount, color: isCreateHovered ? "#C9A24D" : "#373735"}}
                                onMouseEnter={() => setIsCreateHovered(true)}
                                onMouseLeave={() => setIsCreateHovered(false)}
                                onClick={() => navigate("/register")}
                            >
                                Créer un compte
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- TES STYLES DE BASE (OBJETS JS) ---
const styles = {
    overlay: { width: "100%", backgroundColor: "#E9E3E3", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
    modal: { width: "900px", backgroundColor: "#E9E3E3", borderRadius: "8px", overflow: "hidden", position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
    header: { padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#373735", margin: 0 },
    closeIcon: { fontSize: "32px", cursor: "pointer", color: "#373735" },
    darkSection: { backgroundColor: "#373735", padding: "60px 100px", display: "flex", flexDirection: "column", gap: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "25px" },
    input: { width: "100%", maxWidth: "400px", padding: "15px 20px", backgroundColor: "#E9E3E3", border: "none", fontSize: "1rem", color: "#373735", borderRadius: "4px", boxSizing: "border-box" },
    forgotRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" },
    forgotLink: { fontSize: "1rem", cursor: "pointer", textDecoration: "underline" },
    loginBtn: { padding: "12px 40px", borderRadius: "25px", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease" },
    footer: { padding: "40px 20px", textAlign: "center" },
    footerText: { color: "#373735", fontSize: "1.1rem", lineHeight: "1.5" },
    createAccount: { fontWeight: "bold", textDecoration: "underline", cursor: "pointer" },
    error: { color: "#ff4d4d", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }
};

export default Login;