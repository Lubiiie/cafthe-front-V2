import React from 'react';
import Hero from '../components/hero';
import Promotions from "../components/Promotions";
import AvisClients from "../components/AvisClients";
import HistoireEngagements from "../components/HistoireEngagements";
import Assistance from "../components/Assistance";


/**
 * COMPOSANT : Home
 * ROLE : Page d'accueil (Landing Page). Elle sert de chef d'orchestre en assemblant
 * les différentes sections de présentation et de marketing.
 */
const Home = () => {
    return (
        <>
            {/* SEO : Optimisation du référencement pour la page la plus importante du site */}
            
                <title>CafThé | Cafés d'Exception & Thés Bio en Ligne</title>
                <meta name="description" content="Découvrez CafThé, votre boutique spécialisée en cafés de spécialité et thés bio. Livraison offerte dès 45€ d'achats. Torréfaction artisanale." />
            

            <div style={styles.pageContainer} className="home-responsive-wrapper">
                {/* STYLE INJECTÉ : Garantit que la page ne "déborde" jamais sur les petits écrans */}
                <style>
                    {`
                    .home-responsive-wrapper {
                        overflow-x: hidden; 
                        width: 100%;
                    }

                    @media (max-width: 768px) {
                        .home-responsive-wrapper > div {
                            width: 100% !important;
                        }
                    }
                    `}
                </style>

                {/* --- ASSEMBLAGE DES COMPOSANTS (Composition) --- */}

                {/* 1. Accroche visuelle et CTA principal */}
                <Hero />

                {/* 2. Section dynamique récupérant les promos via l'API */}
                <Promotions />

                {/* 3. Preuve sociale pour rassurer le futur client */}
                <AvisClients />

                {/* 4. Storytelling et valeurs de la marque */}
                <HistoireEngagements />

                {/* 5. Liens d'aide et support client */}
                <Assistance />
            </div>
        </>
    );
};

// --- STYLES DE STRUCTURE ---
const styles = {
    pageContainer: {
        backgroundColor: '#E9E3E3', // Couleur de fond neutre pour l'unité visuelle
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
};

export default Home;