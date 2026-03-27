import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";


/**
 * COMPOSANT : Catalogue
 * ROLE : Affiche l'ensemble des produits de la boutique CafThé.
 * LOGIQUE : Gère le fetch API, le filtrage dynamique, la recherche et l'ajout direct au panier.
 */
const Catalogue = () => {
    // --- ÉTATS (States) ---
    const [produits, setProduits] = useState([]); // Données brutes de l'API
    const [loading, setLoading] = useState(true); // État de chargement
    const [expandedSections, setExpandedSections] = useState({}); // Gère le bouton "Voir plus" par section
    const [filter, setFilter] = useState("Tous"); // Catégorie active
    const [quantities, setQuantities] = useState({}); // Quantités sélectionnées par produit (local au catalogue)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détection responsive pour le seuil d'affichage

    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCard(); // Consommation du contexte Panier
    const apiUrl = "http://localhost:3000";

    // --- LOGIQUE D'URL (Query Params) ---
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    const filterParam = queryParams.get("filter");

    /** Synchronise le filtre interne avec les paramètres de l'URL */
    useEffect(() => {
        if (filterParam) {
            setFilter(filterParam);
        } else if (!searchTerm) {
            setFilter("Tous");
        }
    }, [filterParam, searchTerm]);

    /** Écouteur de redimensionnement pour adapter le seuil "Voir plus" en temps réel */
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /** CHARGEMENT INITIAL : Récupère tous les produits via l'API */
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits`);
                const data = await response.json();
                setProduits(Array.isArray(data) ? data : (data.produits || []));
            } catch (err) {
                console.error("Erreur Fetch:", err.message);
                setProduits([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProduits();
    }, []);

    /** Gère la modification de quantité locale avant l'ajout au panier */
    const handleQtyChange = (id, delta, stockDisponible) => {
        setQuantities(prev => {
            const current = parseInt(prev[id], 10) || 1;
            const next = current + delta;
            if (next >= 1 && next <= stockDisponible) return { ...prev, [id]: next };
            return prev;
        });
    };

    /** * FONCTION DE RENDU DE SECTION
     * Orchestre le filtrage, la recherche et la pagination (Voir plus)
     */
    const renderSection = (title, filterFn, sectionKey) => {
        // Filtrage croisé : Catégorie + Recherche textuelle
        const list = produits.filter(item => {
            const matchesCategory = filterFn(item);
            const matchesSearch = item.nom_produit.toLowerCase().includes(searchTerm.toLowerCase());
            if (filter !== "Tous") {
                return matchesCategory && matchesSearch && (item.categorie === filter || (filter === "Accessoire" && item.categorie === "Accessoire"));
            }
            return matchesCategory && matchesSearch;
        });

        if (list.length === 0) return null;

        // Logique d'affichage partiel (pagination simplifiée)
        const threshold = isMobile ? 2 : 8;
        const isExpanded = expandedSections[sectionKey];
        const displayedList = (isExpanded || filter !== "Tous" || searchTerm !== "") ? list : list.slice(0, threshold);

        return (
            <section style={styles.section}>
                <h2 style={styles.titleSection} className="section-title-mobile">{title}</h2>
                <div style={styles.gridContainer} className="responsive-grid">
                    {displayedList.map((item) => {
                        const itemId = item.numero_produit;
                        const currentQty = quantities[itemId] || 1;
                        const isOutOfStock = item.stock <= 0;

                        return (
                            <div key={itemId} style={styles.card} className={`catalogue-card ${isOutOfStock ? "card-out-of-stock" : ""}`}>
                                <div onClick={() => !isOutOfStock && navigate(`/produit/${itemId}`)} style={{cursor: isOutOfStock ? 'default' : 'pointer', flex: 1, position: 'relative', display: 'flex', flexDirection: 'column'}}>

                                    {/* INDICATEUR VISUEL : RUPTURE DE STOCK */}
                                    {isOutOfStock && (
                                        <div className="promo-overlay">
                                            <span className="promo-overlay-text">RUPTURE</span>
                                        </div>
                                    )}

                                    {/* BADGE ÉTAT DU STOCK */}
                                    <div style={{...styles.stockBadge, backgroundColor: isOutOfStock ? "#666" : "#2A9D8F"}}>
                                        {isOutOfStock ? "Indisponible" : `Stock : ${item.stock}`}
                                    </div>

                                    <div style={styles.imageContainer} className="img-wrapper">
                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.img} className="main-img" />
                                    </div>

                                    <div style={styles.infoContainer} className="info-container-mobile">
                                        <h4 style={styles.productName} className="product-name-mobile">{item.nom_produit}</h4>
                                        <p style={styles.productDesc} className="product-desc-mobile">{item.description}</p>
                                        <span style={styles.price} className="price-mobile">{Number(item.prix_ttc).toFixed(2)} €</span>
                                    </div>
                                </div>

                                {/* ACTIONS RAPIDES : Choix quantité et ajout panier sans quitter la liste */}
                                <div style={styles.quickAction} className="quick-action-mobile">
                                    {!isOutOfStock ? (
                                        <>
                                            <div style={styles.miniQtySelector}>
                                                <button
                                                    style={styles.miniQtyBtn}
                                                    className="qty-hover"
                                                    aria-label="Diminuer la quantité"
                                                    onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, -1, item.stock); }}
                                                >
                                                    <FiMinus/>
                                                </button>
                                                <span style={styles.miniQtyVal}>{currentQty}</span>
                                                <button
                                                    style={styles.miniQtyBtn}
                                                    className="qty-hover"
                                                    aria-label="Augmenter la quantité"
                                                    onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, 1, item.stock); }}
                                                >
                                                    <FiPlus/>
                                                </button>
                                            </div>
                                            <button
                                                className="add-btn-cat"
                                                style={styles.addToCartBtn}
                                                aria-label={`Ajouter ${item.nom_produit} au panier`}
                                                onClick={(e) => { e.stopPropagation(); addToCart({ ...item, id_produit: itemId }, currentQty); }}
                                            >
                                                <FiShoppingBag size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <div style={{ color: "#E63946", fontWeight: "900", fontSize: "13px", width: "100%", textAlign: "center" }}>
                                            VICTIME DE SON SUCCÈS
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* BOUTON D'EXPANSION DE SECTION */}
                {list.length > threshold && searchTerm === "" && filter === "Tous" && (
                    <div style={styles.viewMoreContainer}>
                        <button className="view-more-btn" style={styles.viewMoreBtn} onClick={() => setExpandedSections(prev => ({...prev, [sectionKey]: !isExpanded}))}>
                            {isExpanded ? <>Réduire <FiChevronUp /></> : <>Voir les {list.length - threshold} autres produits <FiChevronDown /></>}
                        </button>
                    </div>
                )}
            </section>
        );
    };

    if (loading) return <div style={styles.loading}>Chargement...</div>;

    return (
        <>
            
                <title>Boutique en Ligne | Nos Cafés, Thés et Accessoires - CafThé</title>
                <meta name="description" content="Explorez notre sélection de cafés d'origine, thés verts, noirs et infusions bio. Trouvez l'accessoire parfait pour votre rituel café." />
            

            <div style={{ backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "80px", paddingBottom: "100px" }}>
                <style>
                    {`
                    .catalogue-card { border: 2px solid #373735; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; }
                    .catalogue-card:hover { transform: translateY(-12px); border-color: #C9A24D; box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
                    .catalogue-card:hover .main-img { transform: scale(1.1); transition: 0.6s ease; }
                    
                    .card-out-of-stock { opacity: 0.6; filter: grayscale(0.9); pointer-events: none; }
                    .promo-overlay {
                        position: absolute; top: 0; left: 0; width: 100%; height: 240px; 
                        background: rgba(0,0,0,0.4); display: flex; align-items: center; 
                        justify-content: center; z-index: 10;
                    }
                    .promo-overlay-text {
                        background-color: #E63946; color: white; padding: 6px 15px;
                        font-family: 'Playfair Display', serif; font-weight: 900;
                        font-size: 16px; transform: rotate(-12deg); border: 2px solid white;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.4);
                    }
                    
                    .filter-bubble { transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                    .filter-bubble .img-container { transition: all 0.4s ease; border: 3px solid #C9A24D; }
                    .filter-bubble:hover .img-container { transform: scale(1.1); box-shadow: 0 8px 25px rgba(201, 162, 77, 0.3); border-color: #373735 !important; }
                    
                    .bubble-active .img-container { background-color: #C9A24D !important; border-color: #373735 !important; }
                    .bubble-active span { color: #C9A24D; font-weight: 800; }

                    .add-btn-cat { transition: all 0.3s ease; }
                    .add-btn-cat:hover { background-color: #FFF !important; transform: scale(1.15) rotate(-5deg); color: #373735 !important; }
                    .view-more-btn:hover { background-color: #373735 !important; color: #C9A24D !important; transform: translateY(-3px); }
                    .qty-hover:hover { color: #C9A24D !important; transform: scale(1.2); }

                    @media (max-width: 768px) {
                        .bubble-group-mobile { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; width: 95% !important; margin: 0 auto !important; gap: 10px !important; justify-items: center !important; }
                        .img-container { width: 80px !important; height: 80px !important; }
                        .bubble-label-mobile { font-size: 0.85rem !important; margin-top: 5px !important; text-align: center !important; }
                        .responsive-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; padding: 0 10px !important; }
                        .catalogue-card { height: 480px !important; border-radius: 15px !important; }
                        .section-title-mobile { font-size: 1.4rem !important; text-align: center; margin-left: 0 !important; margin-bottom: 25px !important; }
                        .promo-overlay { height: 180px !important; }
                    }

                    @media (max-width: 480px) {
                        .img-container { width: 70px !important; height: 70px !important; }
                        .responsive-grid { grid-template-columns: 1fr !important; padding: 0 20px !important; }
                        .catalogue-card { height: 520px !important; }
                        .promo-overlay { height: 220px !important; }
                    }
                    `}
                </style>

                {/* FILTRES PAR BULLES (Navigation par univers) */}
                <div style={styles.filterArea}>
                    <h3 style={styles.filterTitle}>Notre Univers</h3>
                    <div style={styles.bubbleGroup} className="bubble-group-mobile">
                        {[
                            { label: "Café", img: "/cafe_icon.webp" },
                            { label: "Thé", img: "/the_icon.webp" },
                            { label: "Accessoire", img: "/accessoires_icon.webp" }
                        ].map(cat => (
                            <div key={cat.label} className={`filter-bubble ${filter === cat.label ? "bubble-active" : ""}`} onClick={() => {
                                setFilter(filter === cat.label ? "Tous" : cat.label);
                                navigate('/catalogue', { replace: true });
                            }}>
                                <div className="img-container" style={styles.bubbleImgContainer}>
                                    <img src={cat.img} style={styles.bubbleImg} alt={cat.label} />
                                </div>
                                <span style={{...styles.bubbleLabel, marginTop: '15px'}} className="bubble-label-mobile">{cat.label}s</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* APPELS AUX SECTIONS DYNAMIQUES */}
                {renderSection("Nos offres et promotions", p => p.numero_promotion && p.numero_promotion !== "NO_PROMO", "promo")}
                {renderSection("Nos cafés", p => p.categorie === "Café", "cafe")}
                {renderSection("Nos thés", p => p.categorie === "Thé", "the")}
                {renderSection("Nos accessoires", p => p.categorie === "Accessoire", "accessoire")}
            </div>
        </>
    );
};

// --- STYLES OBJETS (Style Inline) ---
const styles = {
    section: { width: "100%", padding: "20px 0" },
    titleSection: { marginLeft: "5%", fontFamily: "'Playfair Display', serif", color: "#373735", fontSize: "2.5rem", marginBottom: "40px", fontWeight: '900' },
    gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px", padding: "0 5%" },
    card: { height: "560px", backgroundColor: "#373735", borderRadius: "25px", display: "flex", flexDirection: "column", overflow: "hidden" },
    stockBadge: { position: "absolute", top: "15px", left: "12px", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "800", zIndex: 11, color: "#FFF", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" },
    imageContainer: { height: "240px", width: "100%", overflow: "hidden", backgroundColor: "white", position: 'relative' },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    infoContainer: { padding: "20px", color: "#E9E3E3", flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
    productName: { color: "#C9A24D", fontSize: "1.4rem", margin: "0", fontFamily: "'Playfair Display', serif", fontWeight: 'bold', height: '55px', overflow: 'hidden' },
    productDesc: { fontSize: "1rem", opacity: 0.8, height: "45px", overflow: "hidden", lineHeight: '1.4' },
    price: { fontSize: "1.7rem", fontWeight: "900", color: "#FFF", marginTop: 'auto' },
    quickAction: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "rgba(0,0,0,0.3)", marginTop: 'auto' },
    miniQtySelector: { display: "flex", alignItems: "center", backgroundColor: "#E9E3E3", borderRadius: "20px", padding: "6px 12px", gap: "10px" },
    miniQtyBtn: { border: "none", background: "none", cursor: "pointer", color: "#373735", fontSize: '1.1rem', fontWeight: 'bold' },
    miniQtyVal: { color: "#373735", fontWeight: "900", minWidth: "20px", textAlign: "center" },
    addToCartBtn: { backgroundColor: "#C9A24D", border: "none", borderRadius: "50%", width: "45px", height: "45px", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: "pointer", color: "#373735" },
    viewMoreContainer: { width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" },
    viewMoreBtn: { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "transparent", border: "2px solid #373735", borderRadius: "30px", padding: "12px 30px", fontWeight: "bold", cursor: "pointer", fontFamily: 'Playfair Display', color: '#373735' },
    filterArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginBottom: "50px" },
    filterTitle: { fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#373735", fontWeight: '900' },
    bubbleGroup: { display: "flex", gap: "45px", justifyContent: "center" },
    bubbleImgContainer: { width: "125px", height: "125px", borderRadius: "50%", backgroundColor: "#FFF", border: "3px solid #C9A24D", overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    bubbleImg: { width: "100%", height: "100%", objectFit: "cover" },
    bubbleLabel: { fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: "bold", color: "#373735" },
    loading: { textAlign: 'center', padding: '100px', fontSize: '1.8rem', fontFamily: 'Playfair Display' }
};

export default Catalogue;