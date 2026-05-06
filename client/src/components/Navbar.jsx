import React, { useEffect, useState } from 'react'
import { navbarStyles } from '../assets/dummyStyles'
import { BaggageClaim, Clock, Menu, User, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
]

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname || "/");

    const { totalItems } = useCart();
    const [loggedIn, setLoggedIn] = useState(() => {
        try {
            return (
                localStorage.getItem("isLoggedIn") === "true" ||
                !!localStorage.getItem("authToken")
            )
        } catch {
            return false;
        }
    });

    useEffect(() => {
        setActive(location.pathname || "/")
    }, [location]);

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "isLoggedIn" || e.key === "authToken") {
                try {
                    const isNowLoggedIn =
                        localStorage.getItem("isLoggedIn") === "true" ||
                        !!localStorage.getItem("authToken");
                    setLoggedIn(isNowLoggedIn);
                } catch {
                    setLoggedIn(false);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleNavClick = (href) => {
        setActive(href);
        setOpen(false);
    }

    const handleLogout = () => {
        try {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("authToken");
        } catch (e) {
            console.error(e)
        }
        setLoggedIn(false);
        setOpen(false);
        navigate("/")
    };

    return (
        <motion.header
            className={navbarStyles.header}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <nav className={navbarStyles.nav} role='navigation'>
                <div className={navbarStyles.container}>

                    {/* Brand Logo */}
                    <div className={navbarStyles.brandContainer}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={navbarStyles.logoContainer}
                        >
                            <Clock className={navbarStyles.logoIcon} />
                        </motion.div>

                        <Link to='/' onClick={() => handleNavClick("/")}
                            className={navbarStyles.logoLink}>
                            <span style={navbarStyles.logoTextStyle} className={navbarStyles.logoText}>
                                ChronoElite
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={navbarStyles.desktopNav}>
                        {navItems.map((item) => {
                            const isActive = active.startsWith(item.href);
                            return (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        to={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`${navbarStyles.navItemBase} ${isActive
                                            ? navbarStyles.navItemActive
                                            : navbarStyles.navItemInactive
                                            }`}
                                    >
                                        <span>{item.name}</span>

                                        <motion.span
                                            layoutId="activeIndicator"
                                            className={navbarStyles.activeIndicator}
                                            initial={false}
                                            animate={{
                                                opacity: isActive ? 1 : 0,
                                                scaleX: isActive ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Right Side */}
                    <div className={navbarStyles.rightActions}>

                        {/* Cart */}
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link to="/cart" className={navbarStyles.cartLink}>
                                <BaggageClaim className={navbarStyles.cartIcon} />

                                <AnimatePresence>
                                    {totalItems > 0 && (
                                        <motion.span
                                            key={totalItems}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            className={navbarStyles.cartBadge}
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </motion.div>

                        {/* Account */}
                        {!loggedIn ? (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to='/login' className={navbarStyles.accountLink}>
                                    <User className={navbarStyles.accountIcon} />
                                    <span className={navbarStyles.accountText}>Account</span>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button onClick={handleLogout} className={navbarStyles.accountLink}>
                                    <User className={navbarStyles.accountIcon} />
                                    <span className={navbarStyles.accountText}>Logout</span>
                                </button>
                            </motion.div>
                        )}

                        {/* Mobile toggle */}
                        <div className={navbarStyles.mobileMenuButton}>
                            <motion.button
                                onClick={() => setOpen(!open)}
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className={navbarStyles.menuButton}
                            >
                                {open ? (
                                    <X className={navbarStyles.menuIcon} />
                                ) : (
                                    <Menu className={navbarStyles.menuIcon} />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={navbarStyles.mobileMenuButton}
                        >
                            <div className={navbarStyles.mobileMenuContainer}>
                                {navItems.map((item, index) => {
                                    const isActive = active === item.href;
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                        >
                                            <Link
                                                to={item.href}
                                                onClick={() => handleNavClick(item.href)}
                                                className={`${navbarStyles.mobileNavItemBase} ${isActive
                                                    ? navbarStyles.mobileNavItemActive
                                                    : navbarStyles.mobileNavItemInactive
                                                    }`}
                                            >
                                                <span className={navbarStyles.mobileNavItemText}>
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    )
                                })}

                                <div className={navbarStyles.mobileAccountContainer}>
                                    {!loggedIn ? (
                                        <Link
                                            to="/login"
                                            onClick={() => {
                                                setOpen(false);
                                                handleNavClick("/login");
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            <User size={18} />
                                            <span>Account</span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full"
                                        >
                                            <User size={18} />
                                            <span>Logout</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>
        </motion.header>
    )
}

export default Navbar