import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff, User, Lock, ArrowLeft } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    const fakeToken = btoa(`${email}:${Date.now()}`);
    localStorage.setItem("authToken", fakeToken);

    toast.success("Login success 🚀");

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">

      {/* Animated Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      <ToastContainer />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 w-[350px]"
      >
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-white mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              value={email}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pt-4 pb-2 bg-transparent border-b border-gray-500 focus:border-purple-400 outline-none text-white"
            />

            <label
              className={`absolute left-10 transition-all ${
                focused === "email" || email
                  ? "top-1 text-xs text-purple-400"
                  : "top-3 text-gray-400"
              }`}
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pt-4 pb-2 bg-transparent border-b border-gray-500 focus:border-purple-400 outline-none text-white"
            />

            <label
              className={`absolute left-10 transition-all ${
                focused === "password" || password
                  ? "top-1 text-xs text-purple-400"
                  : "top-3 text-gray-400"
              }`}
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;