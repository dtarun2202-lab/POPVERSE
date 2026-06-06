import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("login");

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar
        openLogin={() => {
          setType("login");
          setShowModal(true);
        }}
        openSignup={() => {
          setType("signup");
          setShowModal(true);
        }}
      />

      <Hero />

      {/* ✅ FIXED: setType passed */}
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={type}
        setType={setType}
      />
    </div>
  );
}