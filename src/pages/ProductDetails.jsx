import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiMinus, FiShoppingBag, FiTruck, FiShield, FiRotateCcw } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";


/**
 * COMPOSANT : ProductDetails
 * ROLE : Affiche la fiche détaillée d'un produit spécifique et gère l'ajout au panier.
 */
const ProductDetails = () => {
    // --- RÉCUPÉRATION DES PARAMÈTRES ET DU CONTEXTE ---
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
    const { addToCart } = useCard();

    // --- ÉTATS LOCAUX ---
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // Quantité sélectionnée par l'utilisateur
    const apiUrl = "http://localhost:3000";

    // --- CHARGEMENT DES DONNÉES DU PRODUIT ---
    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits/${id}`);
                const data = await response.json();
                // Gestion de la réponse API (produit direct ou imbriqué)
                setProduit(data.produit ? data.produit : data);
            } catch (err) {
                console.error("Erreur Fetch BDD:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduit();
    }, [id]);

    // --- GESTION DES QUANTITÉS ---
    /**
     * Valide la saisie manuelle pour ne pas dépasser le stock disponible
     */
    const handleInputChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) {
            setQuantity(1);
        } else if (val > produit.stock) {
            setQuantity(produit.stock);
        } else {
            setQuantity(val);
        }
    };

    if (loading) return <div style={styles.loading}>Chargement...</div>;
    if (!produit) return <div style={styles.error}>Produit introuvable.</div>;

    const isOutOfStock = produit.stock <= 0;

    return (
        <>
            
                <title>{produit?.nom_produit || "Produit"} | CafThé</title>
                <meta name="description" content={produit?.description ? produit.description.substring(0, 120) : ""} />
            

            <div style={styles.pageContainer} className="product-details-res">
                <style>
                    {`
                    .add-btn:hover { background-color: #E9E3E3 !important; color: #373735 !important; transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                    .qty-btn:hover { color: #C9A24D !important; transform: scale(1.2); }
                    .product-image-card:hover img { transform: scale(1.05); }
                    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                    
                    /* --- CORRECTIF RESPONSIVE --- */
                    @media (max-width: 920px) {
                        .product-flex { 
                            flex-direction: column !important; 
                            align-items: center !important; 
                            gap: 40px !important; 
                            padding-top: 20px !important;
                        }
                        .product-image-section { 
                            width: 100% !important; 
                            max-width: 600px !important; 
                        }
                        .product-info-section { 
                            width: 100% !important; 
                            padding: 0 20px !important; 
                        }
                    }
                    @media (max-width: 480px) {
                        .product-details-res { padding-top: 100px !important; }
                        .product-name { font-size: 2.2rem !important; }
                        .action-buttons { flex-direction: column !important; gap: 15px !important; }
                        .qty-selector { 
                            width: 100% !important; 
                            justify-content: space-between !important; 
                            box-sizing: border-box !important;
                        }
                        .add-btn { width: 100% !important; }
                        .price { font-size: 2.2rem !important; }
                    }
                    `}
                </style>

                <div style={styles.productFlex} className="product-flex">
                    <div style={styles.imageSection} className="product-image-section">
                        <div style={styles.imageCard} className="product-image-card">
                            <img src={`${apiUrl}/images/${produit.image}`} alt={produit.nom_produit} style={styles.mainImg} />
                            {isOutOfStock && <div style={styles.outOfStockBadge}>RUPTURE</div>}

                            {!isOutOfStock && (
                                <div style={{...styles.stockBadge, backgroundColor: produit.stock < 5 ? "#E63946" : "#2A9D8F"}}>
                                    Stock : {produit.stock} unités
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.infoSection} className="product-info-section">
                        <div style={styles.headerMeta}>
                            <span style={styles.categoryBadge}>{produit.categorie}</span>
                            {produit.origine && <span style={styles.originTag}>— Origine : {produit.origine}</span>}
                        </div>

                        <h1 style={styles.title} className="product-name">{produit.nom_produit}</h1>
                        <p style={styles.description}>{produit.description}</p>

                        <div style={styles.priceContainer}>
                            <span style={styles.price} className="price">{Number(produit.prix_ttc).toFixed(2)} €</span>
                            <span style={styles.taxLabel}>TVA incluse</span>
                        </div>

                        {!isOutOfStock ? (
                            <div style={styles.actionArea} className="action-buttons">
                                <div style={styles.qtySelector} className="qty-selector">
                                    <button
                                        style={styles.qtyBtn}
                                        className="qty-btn"
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        aria-label="Diminuer la quantité"
                                    >
                                        <FiMinus />
                                    </button>

                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleInputChange}
                                        style={styles.qtyInput}
                                        aria-label="Quantité sélectionnée"
                                    />

                                    <button
                                        style={styles.qtyBtn}
                                        className="qty-btn"
                                        onClick={() => quantity < produit.stock && setQuantity(quantity + 1)}
                                        aria-label="Augmenter la quantité"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                                {/* Appel de la fonction globale pour l'ajout au panier */}
                                <button
                                    style={styles.addBtn}
                                    className="add-btn"
                                    onClick={() => addToCart({ ...produit, id_produit: produit.numero_produit }, quantity)}
                                    aria-label={`Ajouter ${produit.nom_produit} au panier`}
                                >
                                    <FiShoppingBag /> Ajouter au panier
                                </button>
                            </div>
                        ) : (
                            <div style={styles.outOfStockMsg}>Actuellement indisponible</div>
                        )}

                        <div style={styles.benefits}>
                            <div style={styles.benefitItem}><FiTruck style={styles.icon} /> Livraison offerte dès 45€</div>
                            <div style={styles.benefitItem}><FiShield style={styles.icon} /> Paiement 100% sécurisé</div>
                            <div style={styles.benefitItem}><FiRotateCcw style={styles.icon} /> Retours sous 14 jours</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    pageContainer: { backgroundColor: "#E9E3E3", minHeight: "100vh", padding: "140px 5% 80px 5%", boxSizing: "border-box" },
    productFlex: { maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "flex-start" },
    imageSection: { width: "50%" },
    imageCard: { backgroundColor: "#FFF", borderRadius: "25px", padding: 0, boxShadow: "0 15px 40px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1' },
    mainImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
    stockBadge: { position: "absolute", bottom: "20px", right: "20px", padding: "6px 15px", borderRadius: "20px", color: "#FFF", fontSize: "0.85rem", fontWeight: "bold", zIndex: 10 },
    outOfStockBadge: { position: "absolute", top: "20px", left: "20px", backgroundColor: "#E63946", color: "#FFF", padding: "8px 15px", borderRadius: "8px", fontWeight: "bold", zIndex: 10 },
    infoSection: { width: "50%", display: "flex", flexDirection: "column", gap: "20px" },
    headerMeta: { display: "flex", alignItems: "center", gap: "10px" },
    categoryBadge: { color: "#C9A24D", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.9rem" },
    originTag: { color: "#373735", opacity: 0.6, fontSize: "0.9rem", fontWeight: "600" },
    title: { fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#373735", margin: 0, fontWeight: "800", lineHeight: "1.1" },
    description: { fontSize: "1.1rem", color: "#373735", lineHeight: "1.7", opacity: 0.9, margin: 0 },
    priceContainer: { display: "flex", alignItems: "baseline", gap: "12px", marginTop: "10px" },
    price: { fontSize: "2.8rem", fontWeight: "900", color: "#373735" },
    taxLabel: { color: "#888", fontSize: "0.9rem" },
    actionArea: { display: "flex", gap: "20px", marginTop: "15px" },
    qtySelector: { display: "flex", alignItems: "center", backgroundColor: "#FFF", borderRadius: "30px", padding: "8px 15px", border: "1.5px solid #373735" },
    qtyBtn: { background: "none", border: "none", cursor: "pointer", padding: "5px", color: "#373735", display: "flex", alignItems: "center", transition: "0.3s" },
    qtyInput: { border: "none", background: "none", width: "50px", textAlign: "center", fontSize: "1.2rem", fontWeight: "900", color: "#373735", outline: "none" },
    addBtn: { flexGrow: 1, backgroundColor: "#373735", color: "#C9A24D", border: "none", borderRadius: "30px", padding: "18px 30px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", transition: "all 0.3s ease" },
    outOfStockMsg: { color: "#E63946", fontWeight: "bold", fontSize: "1.2rem", padding: "20px", border: "2px solid #E63946", borderRadius: "15px", textAlign: "center", backgroundColor: "rgba(230, 57, 70, 0.05)" },
    benefits: { marginTop: "15px", display: "flex", flexDirection: "column", gap: "15px", borderTop: "1px solid rgba(55,55,53,0.1)", paddingTop: "25px" },
    benefitItem: { display: "flex", alignItems: "center", gap: "12px", color: "#373735", fontWeight: "600", fontSize: "1rem" },
    icon: { color: "#C9A24D", fontSize: "1.2rem" },
    loading: { textAlign: 'center', padding: '100px', fontSize: '1.8rem', fontFamily: 'Playfair Display', color: '#373735' },
    error: { textAlign: 'center', padding: '100px', color: '#E63946', fontSize: '1.2rem', fontWeight: 'bold' }
};

export default ProductDetails;