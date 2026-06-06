import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import bgImage from "../assets/manhwa/loyd2.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl min-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.12)] border border-white/5">

        {/* LEFT — Form */}
        <motion.div
          className="flex flex-1 items-center justify-center bg-zinc-950 px-8 md:px-14 py-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-sm">

            <div className="text-2xl font-black text-white mb-8" style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.05em' }}>
              Pop<span className="text-red-500">verse</span>
            </div>

            <div className="mb-7">
              <h2 className="text-white text-3xl font-black mb-1">Join the Universe</h2>
              <p className="text-zinc-500 text-sm">Anime. Manga. Comics. All in one place.</p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: "Name", type: "text", placeholder: "Your name", value: name, set: setName },
                { label: "Email", type: "email", placeholder: "you@example.com", value: email, set: setEmail },
                { label: "Password", type: "password", placeholder: "••••••••", value: password, set: setPassword },
              ].map(({ label, type, placeholder, value, set }) => (
                <div key={label} className="flex flex-col gap-1">
                  <label className="text-zinc-400 text-xs uppercase tracking-widest">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 text-white rounded-xl border border-white/5 focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-700 text-sm"
                  />
                </div>
              ))}

              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(220,38,38,0.3)] mt-1"
              >
                Create Account
              </button>

              <p className="text-zinc-500 text-xs text-center">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                  Login
                </button>
              </p>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-zinc-600 text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social — Popping */}
            <div className="flex flex-col gap-3">
              <motion.button
                type="button"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold text-sm border border-white/20"
                style={{ boxShadow: '0 4px 15px rgba(255,255,255,0.1)' }}
              >
                <FcGoogle size={20} />
                Sign up with Google
              </motion.button>

              <motion.button
                type="button"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full flex items-center justify-center gap-3 bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm border border-white/10"
                style={{ boxShadow: '0 4px 15px rgba(99,102,241,0.2)' }}
              >
                <FaGithub size={20} />
                Sign up with GitHub
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* RIGHT — Image Panel */}
        <div className="hidden md:block relative w-1/2">
          <img src={bgImage} alt="Popverse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-red-600/50" />
          <div className="absolute bottom-12 left-8 right-8">
            <div className="text-5xl font-black text-white mb-2" style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.05em' }}>
              Pop<span className="text-red-500">verse</span>
            </div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Dive in. It's free.</p>
          </div>
        </div>

      </div>
    </div>
  );
}