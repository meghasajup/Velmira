import React, { useEffect } from 'react'
import { comingSoonStyles } from '../assets/dummyStyles'
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";

const watches = [
    { id: 1, name: "Norqain Independence", price: 619000, imgUrl: CS1 },
    { id: 2, name: "Zenith Chronomaster", price: 1069200, imgUrl: CS2 },
    { id: 3, name: "Jacob & Co. Epic X", price: 3100000, imgUrl: CS3 },
    { id: 4, name: "Bvlgari Octo", price: 2450000, imgUrl: CS4 },
    { id: 5, name: "Louis Erard Excellence", price: 3300000, imgUrl: CS5 },
];

const formatINR = comingSoonStyles.formatINR;

const ComingSoonPage = () => {

    useEffect(() => {
        const items = document.querySelectorAll(".watch-card");

        items.forEach((item, index) => {
            item.style.opacity = 0;
            item.style.transform = "translateY(40px)";

            setTimeout(() => {
                item.style.transition = "all 0.6s ease";
                item.style.opacity = 1;
                item.style.transform = "translateY(0)";
            }, index * 150);
        });
    }, []);

    const handleMouseMove = (e, el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (el) => {
        el.style.transform = "rotateX(0) rotateY(0) scale(1)";
    };

    return (
        <section
            className={comingSoonStyles.section}
            style={{ overflow: "hidden" }} // prevent global overflow
        >
            <div className={comingSoonStyles.container}>

                {/* HEADER */}
                <div className={comingSoonStyles.headerContainer}>
                    <div className={comingSoonStyles.titleContainer}>
                        <h2 className={comingSoonStyles.title} style={comingSoonStyles.titleStyle}>
                            New Arrivals
                        </h2>
                        <p className={comingSoonStyles.subtitle}>Coming Soon</p>
                    </div>

                    <a
                        href="/watches"
                        className={comingSoonStyles.viewAllLink}
                        style={{ transition: "all 0.3s ease" }}
                        onMouseEnter={e => e.target.style.transform = "translateX(5px)"}
                        onMouseLeave={e => e.target.style.transform = "translateX(0)"}
                    >
                        View All →
                    </a>
                </div>

                {/* WATCHES ROW */}
                <div className={comingSoonStyles.watchesContainer}>
                    <div
                        className={`${comingSoonStyles.watchesRow} watchesRow`}
                        style={{
                            display: "flex",
                            gap: "20px",
                            overflowX: "auto",
                            overflowY: "hidden",
                            scrollBehavior: "smooth",
                            paddingBottom: "10px"
                        }}
                    >

                        {watches.map((w) => (
                            <figure
                                key={w.id}
                                className={`watch-card ${comingSoonStyles.watchItem}`}
                                style={{
                                    minWidth: "220px",
                                    flexShrink: 0,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    transformStyle: "preserve-3d",
                                    cursor: "pointer"
                                }}
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeaveCapture={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >

                                {/* IMAGE */}
                                <div
                                    className={comingSoonStyles.imageContainer}
                                    style={{
                                        overflow: "hidden",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <img
                                        src={w.imgUrl}
                                        alt={w.name}
                                        className={comingSoonStyles.image}
                                        loading="lazy"
                                        style={{ transition: "transform 0.5s ease" }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22240%22></svg>";
                                        }}
                                    />
                                </div>

                                {/* TEXT */}
                                <figcaption className={comingSoonStyles.figcaption}>
                                    <div className={comingSoonStyles.watchName}>{w.name}</div>
                                    <div className={comingSoonStyles.price}>
                                        {formatINR(w.price)}
                                    </div>
                                </figcaption>

                            </figure>
                        ))}

                    </div>
                </div>
            </div>

            {/* SCROLLBAR HIDE (INLINE STYLE TAG) */}
            <style>
                {`
                .watchesRow::-webkit-scrollbar {
                    display: none;
                }
                .watchesRow {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>

        </section>
    )
}

export default ComingSoonPage;