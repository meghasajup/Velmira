import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Grid,
    Minus,
    Plus,
    ShoppingCart,
    User,
    Users,
} from "lucide-react";

import { WATCHES, FILTERS as RAW_FILTERS } from "../assets/dummywdata";
import { useCart } from "./CartContext";
import { watchPageStyles } from "../assets/dummyStyles";

const ICON_MAP = { Grid, User, Users };

const FILTERS = RAW_FILTERS?.length
    ? RAW_FILTERS.map((f) => ({
        ...f,
        icon: ICON_MAP[f.iconName] ?? Grid,
    }))
    : [
        { key: "all", label: "All", icon: Grid },
        { key: "men", label: "Men", icon: User },
        { key: "women", label: "Women", icon: Users },
    ];

const WatchPage = () => {
    const [filter, setFilter] = useState("all");

    const { cart, addItem, increment, decrement, removeItem } =
        useCart();

    const filtered = useMemo(
        () =>
            WATCHES.filter((w) =>
                filter === "all" ? true : w.gender === filter
            ),
        [filter]
    );

    const getQty = (id) => {
        const item = cart.find((c) => String(c.id) === String(id));
        return item ? Number(item.qty || 0) : 0;
    };

    return (
        <div className="min-h-screen bg-[#f7f7f5] text-black overflow-hidden">

            {/* Soft Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_40%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16"
                >
                    <div>
                        <div>
                            <h1 className={watchPageStyles.headerTitle}>
                                Timepieces{" "}
                                <span className={watchPageStyles.titleAccent}>Curated</span>
                            </h1>
                            <p className={watchPageStyles.headerDescription}>
                                A handpicked selection - clean presentation, zero borders. Choose a
                                filter to refine.
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        {FILTERS.map((f) => {
                            const Icon = f.icon;
                            const active = filter === f.key;

                            return (
                                <motion.button
                                    key={f.key}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setFilter(f.key)}
                                    className={`px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 text-sm font-medium ${active
                                        ? "bg-black text-white border-black"
                                        : "bg-white border-black/10 text-black hover:bg-black/[0.03]"
                                        }`}
                                >
                                    <Icon size={15} />
                                    {f.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                    <AnimatePresence>
                        {filtered.map((w, index) => {
                            const sid = String(
                                w.id ?? w._id ?? w.sku ?? w.name
                            );

                            const qty = getQty(sid);

                            return (
                                <motion.div
                                    key={sid}
                                    layout
                                    initial={{ opacity: 0, y: 35 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="group relative overflow-hidden rounded-[22px] bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

                                    {/* Image */}
                                    <div className="relative overflow-hidden aspect-[3/4]">

                                        <motion.img
                                            src={w.img}
                                            alt={w.name}
                                            draggable={false}
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Cart Controls */}
                                        <div className="absolute bottom-4 left-4 right-4">

                                            {qty > 0 ? (
                                                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md border border-black/10 rounded-2xl px-3 py-2">
                                                    <button
                                                        onClick={() => {
                                                            if (qty > 1) decrement(sid);
                                                            else removeItem(sid);
                                                        }}
                                                        className="w-10 h-10 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition">
                                                        <Minus size={16} />
                                                    </button>

                                                    <span className="font-medium text-lg">
                                                        {qty}
                                                    </span>

                                                    <button
                                                        onClick={() => increment(sid)}
                                                        className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:scale-105 transition">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <motion.button
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() =>
                                                        addItem({
                                                            id: sid,
                                                            name: w.name,
                                                            price: w.price,
                                                            img: w.img,
                                                        })
                                                    }
                                                    className="w-full rounded-2xl bg-black text-white py-3.5 flex items-center justify-center gap-2 font-medium hover:gap-4 transition-all duration-30">
                                                    <ShoppingCart size={17} />
                                                    Add to Cart
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    {/* Info */}
                                    <div className="p-5 space-y-3">

                                        {/* Top Row */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div>
                                                <h3 className="text-[15px] font-semibold tracking-tight leading-tight">
                                                    {w.name}
                                                </h3>

                                                <p className="text-sm text-black/55 mt-1 leading-relaxed max-w-[220px]">
                                                    {w.desc}
                                                </p>
                                            </div>

                                            <p className="text-[15px] font-semibold whitespace-nowrap">
                                                {w.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Border */}
                                    <div className=" absolute inset-0 rounded-[28px] border border-transparent group-hover:border-black/10 transition duration-500 pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default WatchPage;