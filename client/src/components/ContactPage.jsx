import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    User,
    Mail,
    Phone,
    Clock,
    ShoppingCart,
    IndianRupee,
    Send,
    MapPin,
    AlertCircle,
    Check,
} from "lucide-react";

const ContactPage = () => {
    const WHATSAPP_NUMBER = "918299431275";

    const initialForm = {
        name: "",
        email: "",
        phone: "",
        product: "General Inquiry",
        budget: "",
        contactMethod: "WhatsApp",
        message: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);

    const products = [
        "General Inquiry",
        "Norqain Independence",
        "Zenith Chronomaster",
        "Jacob & Co. Epic X",
        "Bvlgari Octo",
        "H. Moser Endeavour",
    ];

    function showToast(text, kind = "info", duration = 1800) {
        setToast({ text, kind });

        setTimeout(() => {
            setToast(null);
        }, duration);
    }

    function validate() {
        const e = {};

        if (!form.name.trim()) {
            e.name = "Name is required";
        }

        if (!form.email.trim()) {
            e.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            e.email = "Invalid email";
        }

        if (!form.phone.trim()) {
            e.phone = "Phone is required";
        }

        if (!form.product.trim()) {
            e.product = "Select a product";
        }

        if (!form.budget.trim()) {
            e.budget = "Budget is required";
        }

        if (!form.contactMethod.trim()) {
            e.contactMethod = "Select contact method";
        }

        if (!form.message.trim()) {
            e.message = "Message is required";
        }

        return e;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    }

    function clearForm() {
        setForm(initialForm);
        setErrors({});
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            showToast("Please fill all required fields", "error");
            return;
        }

        setSending(true);

        const message =
            `Hello! I am *${form.name}*.\n\n` +
            `*Interest:* ${form.product}\n` +
            `*Budget:* ${form.budget}\n` +
            `*Phone:* ${form.phone}\n` +
            `*Email:* ${form.email}\n` +
            `*Preferred Contact:* ${form.contactMethod}\n\n` +
            `*Message:* ${form.message}`;

        const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
            message
        )}`;

        showToast("Opening WhatsApp...", "success", 900);

        setTimeout(() => {
            window.open(url, "_blank");

            clearForm();

            setSending(false);

            showToast("Submitted Successfully", "success");
        }, 700);
    }

    function InputWithIcon({
        icon,
        label,
        name,
        value,
        onChange,
        error,
        required,
    }) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
            >
                <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                        {icon}
                    </div>

                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder=" "
                        required={required}
                        className={`peer w-full h-16 rounded-2xl bg-white border
                            ${error
                                ? "border-red-500"
                                : "border-black/10"
                            }
                            text-black pl-14 pr-4 pt-5 outline-none backdrop-blur-xl transition-all duration-500 focus:border-amber-400 focus:bg-white focus:shadow-[0_0_25px_rgba(251,191,36,0.18)] hover:border-amber-300
                        `}
                    />

                    <label
                        className="absolute left-14  text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:-top- peer-focus:text-xs peer-focus:text-amber-500 peer-focus:bg-white peer-focus:px-2 top-[-8px] text-xs bg-white px-2 rounded-full">
                        {label}
                    </label>
                </div>

                {error && (
                    <p className="flex items-center gap-2 text-red-500 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
            </motion.div>
        );
    }

    function SelectWithIcon({
        icon,
        label,
        name,
        value,
        onChange,
        options = [],
        error,
        required,
    }) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
            >
                <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                        {icon}
                    </div>

                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className={`w-full h-16 rounded-2xl bg-white border
                            ${error
                                ? "border-red-500"
                                : "border-black/10"
                            }
                            text-blac pl-14 pr-4 outline-none transition-all duration-500 focus:border-amber-400 focus:bg-white focus:shadow-[0_0_25px_rgba(251,191,36,0.18)] hover:border-amber-300
                        `}
                    >
                        {options.map((option) => (
                            <option
                                key={option}
                                value={option}
                                className="bg-white text-black"
                            >
                                {option}
                            </option>
                        ))}
                    </select>

                    <label
                        className="absolute left-14 -top-2 text-xs text-amber-500 bg-white px-2 rounded-full">
                        {label}
                    </label>
                </div>

                {error && (
                    <p className="flex items-center gap-2 text-red-500 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
            </motion.div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f8f8f8] text-black py-20 px-4">
            {/* Background */}
            <div className="absolute inset-0 bg-[#f8f8f8]" />

            {/* Gradient Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-100px] left-[-100px] w-[450px] h-[450px] bg-amber-300/30 blur-3xl rounded-full animate-pulse" />

                <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-indigo-300/20 blur-3xl rounded-full animate-pulse delay-1000" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_40%)]" />
            </div>

            {/* Texture */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold tracking-[0.12em] text-black"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                        }}
                    >
                        Get in Touch
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxe"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                        }}
                    >
                        Discover timeless luxury watches curated for collectors,
                        enthusiasts, and visionaries.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="backdrop-blur-2xl bg-white/80 border border-black/10 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] ">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <InputWithIcon
                                    icon={
                                        <User className="w-5 h-5 text-amber-500" />
                                    }
                                    label="Your Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />

                                <InputWithIcon
                                    icon={
                                        <Mail className="w-5 h-5 text-amber-500" />
                                    }
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <InputWithIcon
                                    icon={
                                        <Phone className="w-5 h-5 text-amber-500" />
                                    }
                                    label="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    required
                                />

                                <SelectWithIcon
                                    icon={
                                        <Clock className="w-5 h-5 text-amber-500" />
                                    }
                                    label="Preferred Contact"
                                    name="contactMethod"
                                    value={form.contactMethod}
                                    onChange={handleChange}
                                    options={[
                                        "WhatsApp",
                                        "Phone Call",
                                        "Email",
                                    ]}
                                    error={errors.contactMethod}
                                    required
                                />
                            </div>

                            <SelectWithIcon
                                icon={
                                    <ShoppingCart className="w-5 h-5 text-amber-500" />
                                }
                                label="Product of Interest"
                                name="product"
                                value={form.product}
                                onChange={handleChange}
                                options={products}
                                error={errors.product}
                                required
                            />

                            <InputWithIcon
                                icon={
                                    <IndianRupee className="w-5 h-5 text-amber-500" />
                                }
                                label="Estimated Budget"
                                name="budget"
                                value={form.budget}
                                onChange={handleChange}
                                error={errors.budget}
                                required
                            />

                            {/* MESSAGE */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative">
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder=" "
                                        className={`
                                            peer
                                            w-full
                                            rounded-3xl
                                            bg-white
                                            border
                                            ${errors.message
                                                ? "border-red-500"
                                                : "border-black/10"
                                            }
                                            text-black px-6 pt-8 pb-4 outline-none] transition-all duration-500 focus:border-amber-400 focus:bg-white focus:shadow-[0_0_25px_rgba(251,191,36,0.18)]
                                        `}
                                    />

                                    <label
                                        className="
                                            absolute] left-6 top-4] text-gray-500 transition-all duration-300 peer-focus:text-amber-500">
                                        Short Message
                                    </label>
                                </div>

                                {errors.message && (
                                    <p className="flex items-center gap-2 text-red-500 text-sm mt-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.message}
                                    </p>
                                )}
                            </motion.div>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="relative overflow-hidden group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500to-amber-600 text-black font-semibold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-all duration-500">
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-white/20 skew-x-12" />

                                    <Send className="w-5 h-5 relative z-10" />

                                    <span className="relative z-10">
                                        {sending
                                            ? "Sending..."
                                            : "Send via WhatsApp"}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        clearForm();
                                        showToast("Form Cleared", "info");
                                    }}
                                    className="px-8 py-4 rounded-2xl borderborder-black/10 bg-black/5 hover:bg-black/10 transition-all duration-300 " >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div
                            className="relative overflow-hidden rounded-[32px]border border-black/10 bg-white/70 backdrop-blur-2xl p-10 min-h-[320px]">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-300/30 blur-3xl rounded-full" />

                            <div className="relative z-10">
                                <p className="text-4xl leading-relaxed font-light italic text-black">
                                    “Time is the ultimate luxury.”
                                </p>

                                <div className="mt-10 space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                                        <span className="text-zinc-700">
                                            WhatsApp Support Active
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Check className="text-amber-500" />

                                        <span className="text-zinc-700">
                                            Premium Watch Consultation
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Check className="text-amber-500" />

                                        <span className="text-zinc-700">
                                            Verified Luxury Collection
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VISIT CARD */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="rounded-[32px]border border-black/10 bg-gradient-to-br from-amber-100 to-white backdrop-blur-2xl p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                            <div className="flex items-start gap-5">
                                <div className="p-4 rounded-2xl bg-amber-200/60">
                                    <MapPin className="w-6 h-6 text-amber-600" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-black">
                                        Showroom Visits
                                    </h3>

                                    <p className="text-zinc-600 mt-2 leading-relaxed">
                                        Experience private luxury watch viewing
                                        sessions curated exclusively for you.
                                    </p>

                                    <button
                                        onClick={() => {
                                            const msg =
                                                "Hi, I'd like to book a private showroom visit.";

                                            window.open(
                                                `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                                                    msg
                                                )}`,
                                                "_blank"
                                            );
                                        }}
                                        className="mt-6 px-6 py-3 rounded-2xl bg-amber-400 text-black font-semibold hover:scale-105 transition-all duration-300">
                                        Book Visit
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* TOAST */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl border shadow-2xl
                            ${toast.kind === "error"
                                ? "bg-red-100 border-red-300 text-red-600"
                                : "bg-emerald-100 border-emerald-300 text-emerald-700"
                            }
                        `}
                    >
                        {toast.kind === "success" ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}

                        <span>{toast.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FONTS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

                body {
                    background: #f8f8f8;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #e5e5e5;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #f59e0b, #d97706);
                    border-radius: 999px;
                }
            `}</style>
        </div>
    );
};

export default ContactPage;