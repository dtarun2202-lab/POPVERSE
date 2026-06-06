import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { comicsImages, mangasImages, superherosImages } from '../data/introImages'

// Scrolling Column Component
function ScrollColumn({ images, direction, speed }) {
  return (
    <div className="relative h-full overflow-hidden w-1/3">
      <motion.div
        className="flex flex-col gap-2"
        animate={{ y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {/* Double the images so scroll loops seamlessly */}
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt="panel"
            className="w-full object-cover rounded-sm"
          />
        ))}
      </motion.div>
    </div>
  )
}

// Main Intro Sequence Component
function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('scrolling') 
  // phases: 'scrolling' → 'freeze' → 'logo' → 'done'

  useEffect(() => {
    // After 3 seconds start freeze
    const freezeTimer = setTimeout(() => setPhase('freeze'), 3000)
    // After 4 seconds show logo
    const logoTimer = setTimeout(() => setPhase('logo'), 4000)
    // After 6 seconds finish intro
    const doneTimer = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 6500)

    return () => {
      clearTimeout(freezeTimer)
      clearTimeout(logoTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* 3 Scrolling Columns */}
          <div className="absolute inset-0 flex gap-2 p-2 opacity-60">
            <ScrollColumn
              images={comicsImages}
              direction="up"
              speed={phase === 'freeze' || phase === 'logo' ? 0 : 8}
            />
            <ScrollColumn
              images={mangasImages}
              direction="down"
              speed={phase === 'freeze' || phase === 'logo' ? 0 : 10}
            />
            <ScrollColumn
              images={superherosImages}
              direction="up"
              speed={phase === 'freeze' || phase === 'logo' ? 0 : 9}
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* POPVERSE Logo Slam */}
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                className="relative z-10 text-center"
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1
                  style={{ fontFamily: "'Honk', system-ui" }}
                  className="text-8xl md:text-9xl text-white uppercase"
                >
                  Pop<span className="text-red-500">verse</span>
                </h1>
                <motion.p
                  className="text-red-500 tracking-widest uppercase text-sm font-bold mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your Universe Awaits
                </motion.p>

                {/* Red flash effect */}
                <motion.div
                  className="absolute inset-0 bg-red-600"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroSequence