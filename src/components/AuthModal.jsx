import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiX } from "react-icons/hi";

export default function AuthModal({ isOpen, onClose, type, setType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isLogin = type === "login";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="relative z-10 w-[420px] max-w-[95vw]"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 rounded-t-2xl" />

            <div className="bg-zinc-950 border border-white/10 rounded-b-2xl px-8 py-8 shadow-[0_0_80px_rgba(220,38,38,0.15)]">

              <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors">
                <HiX size={20} />
              </button>

              <div
                className="text-center text-2xl font-black mb-1"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.05em' }}
              >
                Pop<span className="text-red-500">verse</span>
              </div>

              {/* Tabs */}
              <div className="flex mt-5 mb-7 bg-zinc-900 rounded-xl p-1">
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                      type === t ? "bg-red-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {t === "login" ? "Login" : "Sign Up"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-3">
                    {!isLogin && (
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900 text-white rounded-xl border border-white/5 focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600 text-sm"
                      />
                    )}
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900 text-white rounded-xl border border-white/5 focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600 text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900 text-white rounded-xl border border-white/5 focus:outline-none focus:border-red-500 transition-colors placeholder-zinc-600 text-sm"
                    />

                    {isLogin && (
                      <div className="text-right">
                        <button type="button" className="text-xs text-red-500 hover:text-red-400 transition-colors">Forgot password?</button>
                      </div>
                    )}

                    <button
                      type="button"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold tracking-wider uppercase text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-1 shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
                    >
                      {isLogin ? "Login" : "Create Account"}
                    </button>

                    <p className="text-zinc-500 text-xs text-center">
                      {isLogin ? (
                        <>Still haven't signed up?{" "}
                          <button type="button" onClick={() => setType("signup")} className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                            Create an account
                          </button>
                        </>
                      ) : (
                        <>Already have an account?{" "}
                          <button type="button" onClick={() => setType("login")} className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                            Login
                          </button>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 my-5">
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
                      Continue with Google
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
                      Continue with GitHub
                    </motion.button>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}