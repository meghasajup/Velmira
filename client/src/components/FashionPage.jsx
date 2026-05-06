import React, { useEffect, useState } from 'react'
import { Truck, Shield, Heart } from "lucide-react";
import { watchOfferBannerStyles } from '../assets/dummyStyles'
import F1 from "../assets/F1.png"
import { motion } from "framer-motion";

const FashionPage = () => {

    const [timeLeft, setTimeLeft] = useState({
        Days: 2,
        Hours: 12,
        Minutes: 45,
        Seconds: 18,
    });

    useEffect(() => {
        const toTotalSeconds = (t) =>
            t.Days * 86400 + t.Hours * 3600 + t.Minutes * 60 + t.Seconds;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const total = toTotalSeconds(prev);

                if (total <= 0) {
                    clearInterval(timer);
                    return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
                }

                const nextTotal = total - 1;

                return {
                    Days: Math.floor(nextTotal / 86400),
                    Hours: Math.floor((nextTotal % 86400) / 3600),
                    Minutes: Math.floor((nextTotal % 3600) / 60),
                    Seconds: Math.floor(nextTotal % 60),
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={watchOfferBannerStyles.container}>
            <div className={watchOfferBannerStyles.maxWidthContainer}>
                <div className={watchOfferBannerStyles.banner}>

                    {/* LEFT SECTION */}
                    <motion.div 
                        className={watchOfferBannerStyles.contentSection}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <div className={watchOfferBannerStyles.offerTag}>
                            Limited Time Offer
                        </div>

                        <h1 className={watchOfferBannerStyles.heading}>
                            Premium{" "}
                            <span className={watchOfferBannerStyles.headingAccent}>
                                Luxury Watches
                            </span>{" "}
                            Collection
                        </h1>

                        <p className={watchOfferBannerStyles.description}>
                            Discover premium timepieces with up to 30% off.
                        </p>

                        {/* COUNTDOWN */}
                        <div className={watchOfferBannerStyles.countdownGrid}>
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <motion.div
                                    key={unit}
                                    className={watchOfferBannerStyles.countdownItem}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className={watchOfferBannerStyles.countdownValue}>
                                        {String(value).padStart(2, "0")}
                                    </div>
                                    <div className={watchOfferBannerStyles.countdownLabel}>
                                        {unit}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* FEATURES */}
                        <div className={watchOfferBannerStyles.featuresContainer}>
                            {[ 
                                { icon: Truck, text: "Free Shipping" },
                                { icon: Shield, text: "2-Year Warranty" },
                                { icon: Heart, text: "7 Days Return" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    className={watchOfferBannerStyles.featureItem}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                >
                                    <item.icon size={18} />
                                    <span>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div 
                        className={watchOfferBannerStyles.imageSection}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* FLOATING IMAGE */}
                        <motion.img 
                            src={F1} 
                            alt="watch"
                            className={watchOfferBannerStyles.image}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* PRICE TAG */}
                        <motion.div 
                            className={watchOfferBannerStyles.priceTag}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className={watchOfferBannerStyles.oldPrice}>₹899</div>
                            <div className={watchOfferBannerStyles.newPrice}>₹629</div>
                            <div>Save 30%</div>
                        </motion.div>

                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default FashionPage;