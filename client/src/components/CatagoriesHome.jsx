import React, { useState } from 'react'
import { categoriesHomeStyles } from '../assets/dummyStyles'
import brands from "../assets/CategoriesHomedata"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CatagoriesHome = () => {

    const [hoveredBrand, setHoveredBrand] = useState(null);

    // Stagger container
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    // Card animation
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={categoriesHomeStyles.section}>
            <div className={categoriesHomeStyles.container}>

                {/* HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={categoriesHomeStyles.header}
                    style={categoriesHomeStyles.playfairFont}
                >
                    <h1 className={categoriesHomeStyles.h1} style={categoriesHomeStyles.h1FontSize}>
                        <span className={categoriesHomeStyles.h1SpanRegular}>
                            Premium Watch
                        </span>
                        <span className={categoriesHomeStyles.h1SpanAccent}>
                            Brands
                        </span>
                    </h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={categoriesHomeStyles.underline}
                    />

                    <p className={categoriesHomeStyles.subtext}>
                        Discover the world's most prestigious watchmakers — curated picks for every style.
                    </p>
                </motion.header>

                {/* GRID */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className={categoriesHomeStyles.grid}
                    style={categoriesHomeStyles.playfairFont}
                >
                    {brands.map((brand) => (
                        <motion.div
                            key={brand.id}
                            variants={cardVariants}
                        >
                            <Link
                                to={brand.link}
                                className={categoriesHomeStyles.cardLink}
                                onMouseEnter={() => setHoveredBrand(brand.id)}
                                onMouseLeave={() => setHoveredBrand(null)}
                            >
                                <motion.div
                                    className={categoriesHomeStyles.cardWrapper}
                                    whileHover={{
                                        rotateX: 5,
                                        rotateY: -5,
                                        scale: 1.05
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >

                                    {/* IMAGE */}
                                    <div className={categoriesHomeStyles.imageContainer}>
                                        <motion.img
                                            src={brand.image}
                                            alt={brand.name}
                                            loading='lazy'
                                            className={categoriesHomeStyles.image}
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.6 }}
                                        />

                                        {/* GRADIENT OVERLAY */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: hoveredBrand === brand.id
                                                    ? 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                                                    : 'transparent',
                                                transition: '0.4s'
                                            }}
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className={categoriesHomeStyles.cardContent}>
                                        <h3 className={`${categoriesHomeStyles.cardTitleBase} ${hoveredBrand === brand.id
                                            ? categoriesHomeStyles.cardTitleHover
                                            : categoriesHomeStyles.cardTitleNormal
                                            }`}>
                                            {brand.name}
                                        </h3>

                                        {brand.tagline && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredBrand === brand.id ? 1 : 0.7 }}
                                                className={categoriesHomeStyles.cardTagline}
                                            >
                                                {brand.tagline}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* GLOW EFFECT */}
                                    {hoveredBrand === brand.id && (
                                        <motion.div
                                            layoutId="glow"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '16px',
                                                boxShadow: '0 0 40px rgba(212,175,55,0.4)',
                                                zIndex: 0
                                            }}
                                        />
                                    )}

                                    <span className={categoriesHomeStyles.focusRing} />

                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{categoriesHomeStyles.styleString}</style>
        </section>
    )
}

export default CatagoriesHome