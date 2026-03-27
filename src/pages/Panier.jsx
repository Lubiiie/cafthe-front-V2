import React from 'react';
import { useCard } from '../context/CardContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


/**
 * COMPOSANT : Panier
 * ROLE : Affiche le récapitulatif des produits sélectionnés avant le passage en commande.
 */
const Panier = () => {
    // --- CONTEXTES ---
    // Récupération de la logique globale du panier (fonctions CRUD)
    const { cart, updateQuantity, removeFromCart, getSubTotal } = useCard();
    // Récupération de l'utilisateur pour conditionner l'accès au tunnel d'achat
    const { user } = useAuth();

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    /**
     * Gère la redirection : vers la commande si connecté, vers le login sinon.
     */
    const handleCheckout = () => {
        if (user) {
            navigate('/commande');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            
                <title>Mon Panier | CafThé</title>
                <meta name="description" content="Finalisez votre commande de cafés et thés d'exception sur CafThé. Profitez de la livraison offerte dès 45€ d'achat." />
                <meta name="robots" content="noindex, follow" />
            

            <div style={styles.overlay} className="panier-overlay-responsive">
                <style>
                    {`
                    .item-row:hover { background-color: #454542 !important; }
                    .validate-btn:hover { background-color: #C9A24D !important; color: #373735 !important; transform: scale(1.02); }
                    .remove-btn:hover { color: #FFF !important; }
                    .qty-op:hover { opacity: 0.7; }
                    .continue-btn:hover { color: #C9A24D !important; transform: translateX(5px); }
                    .custom-scroll::-webkit-scrollbar { width: 6px; }
                    .custom-scroll::-webkit-scrollbar-thumb { background: #C9A24D; border-radius: 10px; }

                    @media (max-width: 860px) {
                        .panier-overlay-responsive {
                            padding-top: 100px !important; 
                            align-items: flex-start !important;
                            height: auto !important;
                            min-height: 100vh !important;
                            overflow-y: auto !important;
                        }
                        .panier-modal {
                            width: 95% !important;
                            max-height: none !important;
                            margin-bottom: 40px !important;
                        }
                    }

                    @media (max-width: 768px) {
                        .panier-title { font-size: 2rem !important; }
                        .item-row-res {
                            padding: 20px !important;
                            flex-wrap: wrap !important;
                            justify-content: center !important;
                            text-align: center !important;
                            gap: 15px !important;
                        }
                        .item-img-res { width: 80px !important; height: 80px !important; }
                        .item-info-res { min-width: 100% !important; }
                        .panier-footer {
                            flex-direction: column !important;
                            gap: 20px !important;
                            padding: 20px !important;
                            text-align: center !important;
                        }
                        .validate-btn-res { width: 100% !important; justify-content: center !important; }
                    }

                    @media (max-width: 480px) {
                        .panier-title { font-size: 1.75rem !important; }
                        .total-price-res { font-size: 1.8rem !important; }
                    }
                    `}
                </style>

                <div style={styles.modal} className="panier-modal">
                    <div style={styles.header}>
                        <h1 style={styles.title} className="panier-title">Votre panier</h1>
                        <FiX
                            style={styles.closeIcon}
                            onClick={() => navigate("/")}
                            aria-label="Fermer le panier"
                        />
                    </div>

                    <div style={styles.itemsContainer} className="custom-scroll">
                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px', color: '#373735' }}>
                                <p style={{fontSize: '1.1rem'}}>Votre panier est vide.</p>
                            </div>
                        ) : (
                            cart.map((item) => {
                                const itemId = item.id_produit || item.numero_produit;
                                return (
                                    <div key={itemId} style={styles.itemRow} className="item-row item-row-res">
                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.itemImg} className="item-img-res" />
                                        <div style={styles.itemInfo} className="item-info-res">
                                            <h3 style={styles.itemName}>{item.nom_produit}</h3>
                                            <p style={styles.itemPrice}>{Number(item.prix_ttc).toFixed(2)} €</p>
                                            <button
                                                onClick={() => removeFromCart(itemId)}
                                                style={styles.removeBtn}
                                                className="remove-btn"
                                                aria-label={`Supprimer ${item.nom_produit} du panier`}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                        {/* Sélecteur de quantité relié au contexte global */}
                                        <div style={styles.qtySelector}>
                                            <button
                                                onClick={() => updateQuantity(itemId, -1)}
                                                style={styles.qtyOp}
                                                className="qty-op"
                                                aria-label="Diminuer la quantité"
                                            >
                                                -
                                            </button>
                                            <span style={styles.qtyVal}>{item.quantite}</span>
                                            <button
                                                onClick={() => updateQuantity(itemId, 1)}
                                                style={styles.qtyOp}
                                                className="qty-op"
                                                aria-label="Augmenter la quantité"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div style={styles.emptyPrompt}>
                            <img src="/logo1.webp" alt="logo" style={styles.miniLogo} />
                            <button style={styles.continueBtn} className="continue-btn" onClick={() => navigate('/catalogue')}>Continuer mes achats <FiArrowRight /></button>
                        </div>
                    </div>

                    <div style={styles.footer} className="panier-footer">
                        <div style={styles.totalBlock}>
                            <span style={styles.totalPrice} className="total-price-res">{getSubTotal().toFixed(2)} €</span>
                            <span style={{color: '#FFF', display: 'block', fontSize: '12px'}}>Livraison offerte dès 45€</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            style={styles.validateBtn}
                            className="validate-btn validate-btn-res"
                            disabled={cart.length === 0} // Empêche de valider un panier vide
                            aria-label="Procéder au paiement"
                        >
                            <FiShoppingBag size={24} /> Valider
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    overlay: { backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' },
    modal: { width: '850px', backgroundColor: '#E9E3E3', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' },
    header: { padding: '40px', textAlign: 'center', position: 'relative' },
    title: { fontFamily: "'Playfair Display', serif", fontSize: '2.75rem', color: '#373735' },
    closeIcon: { position: 'absolute', right: '30px', top: '30px', fontSize: '30px', cursor: 'pointer' },
    itemsContainer: { flex: '1', overflowY: 'auto' },
    itemRow: { backgroundColor: '#373735', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '30px', color: '#FFF', transition: '0.3s' },
    itemImg: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' },
    itemInfo: { flex: 1 },
    itemName: { color: '#C9A24D', fontSize: '1.5rem', fontFamily: "'Playfair Display', serif" },
    itemPrice: { fontSize: '1.2rem' },
    removeBtn: { background: 'none', border: 'none', color: '#C9A24D', textDecoration: 'underline', cursor: 'pointer', marginTop: '10px', transition: '0.3s', fontSize: '1rem' },
    qtySelector: {
        backgroundColor: '#FFF',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        padding: '5px 15px',
        gap: '15px',
        color: '#373735'
    },
    qtyOp: { border: 'none', background: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#C9A24D', transition: '0.2s', padding: '0 5px' },
    qtyVal: { fontWeight: 'bold', minWidth: '25px', textAlign: 'center', fontSize: '1.1rem' },
    emptyPrompt: { padding: '30px', textAlign: 'center' },
    miniLogo: { width: '40px', marginBottom: '10px' },
    continueBtn: { background: 'none', border: 'none', color: '#373735', textDecoration: 'underline', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', transition: '0.3s', fontSize: '1.1rem' },
    footer: { backgroundColor: '#373735', padding: '25px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    totalPrice: { color: '#C9A24D', fontSize: '2.25rem', fontWeight: 'bold' },
    validateBtn: { backgroundColor: '#E9E3E3', color: '#C9A24D', border: 'none', borderRadius: '30px', height: '55px', padding: '0 35px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s', fontSize: '1.2rem' }
};

export default Panier;