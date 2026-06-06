import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  animeImages,
  mangasImages,
  superherosImages,
  comicsImages,
  manhwaImages
} from '../data/introImages'

function ScrollColumn({ images, direction, speed }) {
  return (
    <div className="relative h-full overflow-hidden w-1/3 pointer-events-none">
      <motion.div
        className="flex flex-col gap-1"
        animate={{ y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...images, ...images].map((src, index) => (
          <img key={index} src={src} alt="panel" className="w-full object-cover" />
        ))}
      </motion.div>
    </div>
  )
}

export default function Navbar({ openLogin, openSignup }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      <div className="relative h-20 w-full overflow-hidden">

        {/* Background scroll */}
        <div className="absolute inset-0 flex gap-1 pointer-events-none">
          <ScrollColumn images={animeImages} direction="up" speed={13} />
          <ScrollColumn images={mangasImages} direction="down" speed={13} />
          <ScrollColumn images={superherosImages} direction="up" speed={13} />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/80 via-purple-900/20 to-black/80" />

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-center justify-between px-8 z-20">

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setMenuOpen(!menuOpen) }}
            className="text-white text-3xl hover:text-red-500 transition-colors"
          >
            {menuOpen ? '✕' : '☰'}
          </Link>

          <Link
            to="/"
            className="text-4xl text-white uppercase"
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            Pop<span className="text-red-500">verse</span>
          </Link>

          <div className="flex gap-4">
            <button
              onClick={openSignup}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold transition hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={openLogin}
              className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full font-bold transition hover:scale-105"
            >
              Login
            </button>
          </div>

        </div>
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="relative border-b border-red-600 bg-black"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col w-full">
              {['Home', 'Anime', 'Comics', 'Manga', 'Manhwa', 'Superheroes'].map((item) => (
                <motion.li
                  key={item}
                  className="relative w-full cursor-pointer"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                    setMenuOpen(false)
                  }}
                >
                  {/* Red box sliding from left to right */}
                  <AnimatePresence>
                    {hoveredItem === item && (
                      <motion.div
                        className="absolute inset-0 bg-red-600 z-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Text */}
                  <span className="relative z-10 flex items-center justify-center px-8 py-4 text-xl font-bold uppercase tracking-widest text-white">
                    {item}
                  </span>

                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  )
}