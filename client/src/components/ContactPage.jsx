import React, { useState } from 'react'
import { contactPageStyles } from '../assets/dummyStyles'

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

    // show toast
    function showToast(text, kind = "info", duration = 1800) {
        setToast({ text, kind });
        setTimeout(() => setToast(null), duration);
    }

    // strict validation: all fields required
    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email is invalid";
        if (!form.phone.trim()) e.phone = "Phone is required";
        if (!form.product.trim()) e.product = "Select product";
        if (!form.budget.trim()) e.budget = "Budget is required";
        if (!form.contactMethod.trim()) e.contactMethod = "Select contact method";
        if (!form.message.trim()) e.message = "Message is required";
        return e;
    }

    //to submit and redirect to whatsapp
    function handleSubmit(ev) {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) {
            showToast("Please fill all required fields", "error");
            return;
        }

        setSending(true);

        // Build WhatsApp message (formatted)
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
            showToast("Submitted — form cleared", "success", 1600);
        }, 700);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({
            ...s,
            [name]: value,
        }))
        setErrors((s) => ({
            ...s,
            [name]: undefined,
        }))
    }

    //to clear the form after submit
    function clearForm() {
        setForm(initialForm)
        setErrors({});
    }

    return (
        <div className={contactPageStyles.pageContainer}>
            <div className={contactPageStyles.innerContainer}>
                <div className={contactPageStyles.pageHeader}>
                    <h1 className={contactPageStyles.pageTitle} style={{ fontFamily: "'Dancing Script',cursive" }}>
                        Get in Touch
                    </h1>
                    <p style={{fontFamily: "'Pla"}}></p>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
