import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiShoppingBag, FiUser, FiSearch, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";

/**
 * COMPOSANT : Header
 * ROLE : Barre de navigation principale gérant la recherche, le panier, l'authentification et le responsive.
 */
const Header = () => {
    // --- NAVIGATION & ROUTAGE ---
    const navigate = useNavigate();
    const location = useLocation();

    // --- CONSOMMATION DES CONTEXTES ---
    // Récupération des données utilisateur et de la fonction de déconnexion via le Context d'authentification
    const { user, logout } = useAuth();
    // Récupération du panier pour afficher le badge du nombre d'articles
    const { cart } = useCard();

    // --- ÉTATS LOCAUX (States) ---
    const [searchQuery, setSearchQuery] = useState(""); // Gère la saisie de la barre de recherche
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Gère l'ouverture/fermeture du menu burger

    // --- EFFETS (Side Effects) ---
    /** * Synchronise le champ de recherche avec l'URL.
     * Si l'utilisateur change de page ou rafraîchit, le texte saisi reste cohérent avec les résultats affichés.
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('search');
        if (q) setSearchQuery(q);
    }, [location.search]);

    // --- LOGIQUE DE RECHERCHE ---
    /** * Redirige vers le catalogue avec le terme de recherche encodé dans l'URL.
     */
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== "") {
            navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false); // Ferme le menu mobile après validation
        }
    };

    // --- CALCULS DERIVÉS ---
    // Vérification de la présence d'un token ou d'un utilisateur dans le state global
    const isConnected = !!user || !!localStorage.getItem('token');
    // Calcul dynamique du nombre total d'articles dans le panier pour le badge
    const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);

    return (
        <header style={styles.header} role="banner">
            <style>
                {`
                .header-main-container, .nav-container { box-sizing: border-box !important; }
                .icon-hover:hover { color: #C9A24D !important; transform: scale(1.1); transition: all 0.2s ease; }
                
                /* DESKTOP : Affichage en ligne et annulation des styles mobiles */
                @media (min-width: 993px) {
                    .nav-container {
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: space-between !important;
                        width: 100% !important;
                        position: static !important;
                        height: auto !important;
                        background: transparent !important;
                        transform: none !important;
                        visibility: visible !important;
                    }
                }

                /* MOBILE : Menu plein écran coulissant */
                @media (max-width: 992px) {
                    .nav-container {
                        position: fixed;
                        top: 85px;
                        left: 0;
                        width: 100%;
                        height: calc(100vh - 85px);
                        background-color: #373735;
                        flex-direction: column !important;
                        justify-content: center !important; 
                        padding: 20px !important;
                        transition: 0.4s cubic-bezier(0.77,0.2,0.05,1.0);
                        gap: 25px !important; 
                        transform: ${isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
                        visibility: ${isMenuOpen ? "visible" : "hidden"};
                    }
                    .mobile-toggle { display: flex !important; }
                }
                `}
            </style>

            <div style={styles.container} className="header-main-container">
                {/* LOGO */}
                <div style={styles.sectionSide}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)} aria-label="Retour à l'accueil CafThé">
                        <img src="/logo1.webp" alt="CafThé" style={styles.logo} className="logo-img" />
                    </Link>
                </div>

                {/* BOUTON MENU MOBILE (Burger) */}
                <button
                    style={styles.mobileToggle}
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <FiX size={32} color="#E9E3E3" /> : <FiMenu size={32} color="#E9E3E3" />}
                </button>

                {/* NAVIGATION ET ACTIONS */}
                <nav style={styles.navWrapper} className="nav-container" aria-label="Navigation principale">
                    {/* BARRE DE RECHERCHE */}
                    <div style={styles.sectionCenter} className="search-box">
                        <div style={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Rechercher un café, un thé..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                aria-label="Rechercher un produit"
                            />
                            <FiSearch style={styles.searchIcon} aria-hidden="true" />
                        </div>
                    </div>

                    {/* ACTIONS (PANIER & COMPTE) */}
                    <div style={styles.sectionSideRight} className="actions-box">
                        {/* PANIER AVEC BADGE */}
                        <button
                            style={styles.iconButton}
                            className="icon-hover"
                            onClick={() => { navigate("/panier"); setIsMenuOpen(false); }}
                            aria-label={`Voir le panier, ${totalArticles} articles`}
                        >
                            <FiShoppingBag size={28} />
                            {totalArticles > 0 && <span style={styles.badge}>{totalArticles}</span>}
                        </button>

                        {/* PROFIL UTILISATEUR */}
                        <button
                            style={styles.iconButton}
                            className="icon-hover"
                            onClick={() => { navigate(isConnected ? "/compte" : "/login"); setIsMenuOpen(false); }}
                            aria-label={isConnected ? "Accéder à mon compte" : "Se connecter"}
                        >
                            <FiUser size={28} />
                        </button>

                        {/* DÉCONNEXION (Conditionnelle) */}
                        {isConnected && (
                            <div style={styles.userControls}>
                                <button
                                    style={styles.iconButton}
                                    className="icon-hover"
                                    onClick={() => { logout(); navigate("/login"); setIsMenuOpen(false); }}
                                    aria-label="Se déconnecter"
                                >
                                    <FiLogOut size={22} style={styles.logoutIcon} />
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

// --- STYLES ---
const styles = {
    header: { width: "100%", height: "85px", backgroundColor: "#373735", position: "fixed", top: 0, left: 0, zIndex: 1000, display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" },
    container: { width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" },
    sectionSide: { flex: "1" },
    navWrapper: { display: "flex", flex: "3", alignItems: "center", justifyContent: "space-between" },
    sectionCenter: { flex: "2", display: "flex", justifyContent: "center" },
    sectionSideRight: { flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "25px" },
    logo: { height: "80px", cursor: "pointer" },
    mobileToggle: { display: "none", cursor: "pointer", background: "none", border: "none", padding: 0 },
    searchWrapper: { position: "relative", width: "100%", maxWidth: "400px", display: "flex", alignItems: "center" },
    searchInput: { width: "100%", padding: "10px 45px 10px 20px", borderRadius: "30px", border: "none", backgroundColor: "#E9E3E3", fontSize: "1rem", outline: "none", color: "#373735" },
    searchIcon: { position: "absolute", right: "15px", color: "#373735" },
    iconButton: { position: "relative", cursor: "pointer", color: "#E9E3E3", background: "none", border: "none", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" },
    badge: { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#C9A24D", color: "#373735", fontSize: "11px", borderRadius: "50%", width: "18px", height: "18px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" },
    userControls: { display: "flex", alignItems: "center", gap: "15px", borderLeft: "1px solid rgba(233, 227, 227, 0.2)", paddingLeft: "15px" },
    logoutIcon: { color: "#E9E3E3" }
};

export default Header;