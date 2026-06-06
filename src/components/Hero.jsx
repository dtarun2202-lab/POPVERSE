import { useEffect, useRef } from 'react'
import * as THREE from 'three'
export default function Hero({ openLogin, openSignup }) {

  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // 🔮 Dying Star
    const sunGeo = new THREE.SphereGeometry(2.2, 32, 32)
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const sun = new THREE.Mesh(sunGeo, sunMat)
    scene.add(sun)

    // Sun Aura Layers
    const auraColors = [0xff2200, 0x9900ff, 0xff6600, 0xff0066, 0xffaa00]
    auraColors.forEach((color, i) => {
      const auraGeo = new THREE.SphereGeometry(2.8 + i * 0.5, 32, 32)
      const auraMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12 - i * 0.015,
      })
      scene.add(new THREE.Mesh(auraGeo, auraMat))
    })

    // 🪐 Fantasy Planets
    const planetData = [
      { size: 0.35, orbit: 3.5, speed: 0.03, color: 0xff0000, glow: 0xff4444 },
      { size: 0.55, orbit: 5, speed: 0.022, color: 0xaa00ff, glow: 0xdd00ff },
      { size: 0.6, orbit: 7, speed: 0.016, color: 0x00ffdd, glow: 0x00ffaa },
      { size: 0.45, orbit: 9, speed: 0.012, color: 0xff8800, glow: 0xffaa00 },
      { size: 1.3, orbit: 12, speed: 0.008, color: 0x7700ff, glow: 0xaa44ff, ring: true },
      { size: 1.0, orbit: 15.5, speed: 0.005, color: 0x0044ff, glow: 0x0088ff, ring: true },
      { size: 0.75, orbit: 19, speed: 0.003, color: 0x00ff44, glow: 0x00ff88 },
      { size: 0.7, orbit: 23, speed: 0.002, color: 0xff0088, glow: 0xff44aa },
    ]

    const planets = planetData.map((data) => {
      const orbitGeo = new THREE.RingGeometry(data.orbit, data.orbit + 0.03, 128)
      const orbitMat = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      })
      const orbit = new THREE.Mesh(orbitGeo, orbitMat)
      orbit.rotation.x = Math.PI / 2
      scene.add(orbit)

      const planetGeo = new THREE.SphereGeometry(data.size, 32, 32)
      const planetMat = new THREE.MeshPhongMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.3,
        shininess: 100,
      })
      const planet = new THREE.Mesh(planetGeo, planetMat)

      if (data.glow) {
        const glowGeo = new THREE.SphereGeometry(data.size * 1.6, 32, 32)
        const glowMat = new THREE.MeshBasicMaterial({
          color: data.glow,
          transparent: true,
          opacity: 0.12,
        })
        planet.add(new THREE.Mesh(glowGeo, glowMat))
      }

      if (data.ring) {
        const ringGeo = new THREE.RingGeometry(data.size + 0.3, data.size + 0.9, 64)
        const ringMat = new THREE.MeshBasicMaterial({
          color: data.glow || data.color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 3
        planet.add(ring)
      }

      scene.add(planet)
      return {
        mesh: planet,
        orbit: data.orbit,
        speed: data.speed,
        angle: Math.random() * Math.PI * 2,
      }
    })

    // 🌌 Realistic Cosmic Clouds
    const cloudConfigs = [
      { color: 0x9900ff, count: 2000, spread: 60, size: 0.4, opacity: 0.08, offsetX: 20, offsetY: 10 },
      { color: 0xff2200, count: 1500, spread: 50, size: 0.35, opacity: 0.07, offsetX: -20, offsetY: -10 },
      { color: 0x00ffcc, count: 1800, spread: 55, size: 0.3, opacity: 0.07, offsetX: 10, offsetY: -20 },
      { color: 0xff6600, count: 1200, spread: 45, size: 0.45, opacity: 0.06, offsetX: -15, offsetY: 15 },
      { color: 0x0033ff, count: 1600, spread: 58, size: 0.38, opacity: 0.07, offsetX: 25, offsetY: -5 },
      { color: 0xff0066, count: 1000, spread: 40, size: 0.5, opacity: 0.06, offsetX: -25, offsetY: 20 },
    ]

    const cosmicClouds = cloudConfigs.map((config) => {
      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(config.count * 3)
      const sizes = new Float32Array(config.count)

      for (let j = 0; j < config.count; j++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = Math.pow(Math.random(), 0.5) * config.spread
        positions[j * 3] = config.offsetX + r * Math.sin(phi) * Math.cos(theta)
        positions[j * 3 + 1] = config.offsetY + r * Math.sin(phi) * Math.sin(theta) * 0.4
        positions[j * 3 + 2] = r * Math.cos(phi) * 0.3
        sizes[j] = config.size * (0.5 + Math.random() * 1.5)
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)')
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.3)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
      const texture = new THREE.CanvasTexture(canvas)

      const mat = new THREE.PointsMaterial({
        color: config.color,
        size: config.size * 8,
        map: texture,
        transparent: true,
        opacity: config.opacity,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        alphaTest: 0.001,
      })

      return new THREE.Points(geo, mat)
    })

    cosmicClouds.forEach(cloud => scene.add(cloud))

    // ⭐ Stars
    const starGeo = new THREE.BufferGeometry()
    const starCount = 6000
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 400
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }))
    scene.add(stars)

    // 🌠 Shooting Stars
    const shootingStars = []
    const shootColors = [0xff2200, 0x9900ff, 0x00ffcc, 0xffaa00, 0xff0066, 0x00aaff, 0xffff00]
    for (let i = 0; i < 15; i++) {
      const shootGeo = new THREE.BufferGeometry()
      const shootPositions = new Float32Array([0, 0, 0, 5, 1.2, 0])
      shootGeo.setAttribute('position', new THREE.BufferAttribute(shootPositions, 3))
      const shootMat = new THREE.LineBasicMaterial({
        color: shootColors[i % shootColors.length],
        transparent: true,
        opacity: 1,
      })
      const shootingStar = new THREE.Line(shootGeo, shootMat)
      shootingStar.position.set(40, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30)
      shootingStar.userData = {
        speedX: -(Math.random() * 0.8 + 0.5),
        speedY: -(Math.random() * 0.5 + 0.2),
        life: Math.random() * 80,
      }
      scene.add(shootingStar)
      shootingStars.push(shootingStar)
    }

    // 💡 Lighting
    scene.add(new THREE.AmbientLight(0x220022, 1))
    const redLight = new THREE.PointLight(0xff2200, 8, 80)
    redLight.position.set(0, 0, 0)
    scene.add(redLight)
    const purpleLight = new THREE.PointLight(0x9900ff, 6, 100)
    purpleLight.position.set(15, 15, 15)
    scene.add(purpleLight)
    const cyanLight = new THREE.PointLight(0x00ffcc, 5, 100)
    cyanLight.position.set(-15, -15, 10)
    scene.add(cyanLight)
    const orangeLight = new THREE.PointLight(0xff8800, 4, 80)
    orangeLight.position.set(20, -10, 5)
    scene.add(orangeLight)
    const blueLight = new THREE.PointLight(0x0066ff, 4, 80)
    blueLight.position.set(-20, 10, -5)
    scene.add(blueLight)

    camera.position.set(0, 10, 26)
    camera.lookAt(0, 0, 0)

    // 🎬 Animation Loop
    const animate = () => {
      requestAnimationFrame(animate)
      const time = Date.now() * 0.002

      // Sun pulse
      const pulse = Math.sin(time) * 0.12
      sun.rotation.y += 0.012
      sun.scale.set(1 + pulse, 1 + pulse, 1 + pulse)

      // Pulse lights
      redLight.intensity = 8 + Math.sin(time) * 4
      purpleLight.intensity = 6 + Math.sin(time * 1.3) * 3
      cyanLight.intensity = 5 + Math.sin(time * 0.8) * 2

      // Orbit Planets
      planets.forEach((planet) => {
        planet.angle += planet.speed
        planet.mesh.position.x = Math.cos(planet.angle) * planet.orbit
        planet.mesh.position.z = Math.sin(planet.angle) * planet.orbit
        planet.mesh.rotation.y += 0.015
      })

      // Shooting Stars
      shootingStars.forEach((star) => {
        star.position.x += star.userData.speedX
        star.position.y += star.userData.speedY
        star.userData.life -= 1
        if (star.userData.life <= 0 || star.position.x < -40) {
          star.position.set(40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20)
          star.userData.life = Math.random() * 150 + 50
          star.userData.speedX = -(Math.random() * 0.5 + 0.3)
        }
      })

      // Cosmic Clouds
      cosmicClouds.forEach((cloud, i) => {
        cloud.rotation.y += 0.00008 * (i % 2 === 0 ? 1 : -1)
        cloud.rotation.z += 0.00005 * (i % 3 === 0 ? 1 : -1)
        const breathe = Math.sin(Date.now() * 0.0005 + i) * 0.002
        cloud.scale.set(1 + breathe, 1 + breathe, 1 + breathe)
      })

      stars.rotation.y += 0.0001
      renderer.render(scene, camera)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center text-center overflow-hidden mt-20">

      {/* Solar System Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

     {/* Dark overlay */}
<div className="absolute inset-0 bg-black opacity-40 z-0" />

{/* Grain/Noise overlay — ADD THIS */}
<div
  className="absolute inset-0 z-1 pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3C/svg%3E")`,
    opacity: 0.08,
    mixBlendMode: 'overlay',
  }}
/>

      {/* Floating Silhouettes */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

        {/* Superman */}
        <div className="absolute animate-float-6" style={{ top: '15%', left: '8%' }}>
          <svg width="60" height="80" viewBox="0 0 60 80" fill="rgba(255,255,255,0.06)">
            <ellipse cx="30" cy="15" rx="10" ry="12" />
            <rect x="20" y="25" width="20" height="28" rx="3" />
            <polygon points="15,30 0,55 20,45" />
            <polygon points="45,30 60,55 40,45" />
            <rect x="24" y="53" width="6" height="20" rx="2" />
            <rect x="30" y="53" width="6" height="20" rx="2" />
            <path d="M20,25 Q5,40 8,65 Q20,55 30,60 Q40,55 52,65 Q55,40 40,25Z" fill="rgba(255,0,0,0.08)" />
          </svg>
        </div>

        {/* Anime Warrior */}
        <div className="absolute animate-float-2" style={{ top: '20%', right: '10%' }}>
          <svg width="55" height="85" viewBox="0 0 55 85" fill="rgba(255,255,255,0.06)">
            <ellipse cx="27" cy="13" rx="9" ry="11" />
            <polygon points="18,8 14,0 20,6" fill="rgba(255,255,255,0.08)" />
            <polygon points="27,5 25,0 29,0 31,5" fill="rgba(255,255,255,0.08)" />
            <polygon points="36,8 40,0 34,6" fill="rgba(255,255,255,0.08)" />
            <rect x="19" y="23" width="17" height="25" rx="2" />
            <rect x="10" y="24" width="9" height="20" rx="2" />
            <rect x="36" y="24" width="9" height="20" rx="2" />
            <rect x="21" y="48" width="6" height="22" rx="2" />
            <rect x="28" y="48" width="6" height="22" rx="2" />
            <rect x="44" y="5" width="3" height="45" rx="1" fill="rgba(255,255,255,0.12)" />
            <rect x="38" y="20" width="15" height="3" rx="1" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>

        {/* Batman */}
        <div className="absolute animate-float-3" style={{ bottom: '25%', left: '5%' }}>
          <svg width="65" height="75" viewBox="0 0 65 75" fill="rgba(255,255,255,0.06)">
            <ellipse cx="32" cy="13" rx="10" ry="11" />
            <polygon points="24,5 18,0 22,8" fill="rgba(255,255,255,0.08)" />
            <polygon points="40,5 46,0 42,8" fill="rgba(255,255,255,0.08)" />
            <rect x="22" y="23" width="21" height="26" rx="2" />
            <path d="M22,24 Q5,20 0,45 Q15,38 22,50Z" fill="rgba(255,255,255,0.05)" />
            <path d="M43,24 Q60,20 65,45 Q50,38 43,50Z" fill="rgba(255,255,255,0.05)" />
            <rect x="25" y="49" width="6" height="20" rx="2" />
            <rect x="34" y="49" width="6" height="20" rx="2" />
          </svg>
        </div>

        {/* Manga Girl */}
        <div className="absolute animate-float-4" style={{ bottom: '20%', right: '7%' }}>
          <svg width="50" height="80" viewBox="0 0 50 80" fill="rgba(255,255,255,0.06)">
            <ellipse cx="25" cy="13" rx="11" ry="12" />
            <path d="M14,10 Q5,25 8,50" stroke="rgba(255,255,255,0.07)" strokeWidth="6" fill="none" />
            <path d="M36,10 Q45,25 42,50" stroke="rgba(255,255,255,0.07)" strokeWidth="6" fill="none" />
            <path d="M17,24 Q10,40 12,65 Q25,60 38,65 Q40,40 33,24Z" />
            <rect x="10" y="24" width="8" height="18" rx="2" />
            <rect x="32" y="24" width="8" height="18" rx="2" />
            <rect x="40" y="10" width="2" height="30" rx="1" fill="rgba(255,200,0,0.15)" />
            <polygon points="41,8 38,14 44,14" fill="rgba(255,200,0,0.2)" />
          </svg>
        </div>

        {/* Titan */}
        <div className="absolute animate-float-5" style={{ top: '45%', left: '2%' }}>
          <svg width="70" height="80" viewBox="0 0 70 80" fill="rgba(255,255,255,0.05)">
            <ellipse cx="35" cy="13" rx="14" ry="12" />
            <rect x="18" y="24" width="34" height="30" rx="4" />
            <rect x="5" y="24" width="14" height="25" rx="3" />
            <rect x="51" y="24" width="14" height="25" rx="3" />
            <rect x="22" y="54" width="10" height="22" rx="3" />
            <rect x="38" y="54" width="10" height="22" rx="3" />
          </svg>
        </div>

        {/* Ninja */}
        <div className="absolute animate-float-6" style={{ top: '30%', right: '3%' }}>
          <svg width="50" height="75" viewBox="0 0 50 75" fill="rgba(255,255,255,0.06)">
            <ellipse cx="25" cy="12" rx="9" ry="10" />
            <rect x="16" y="14" width="18" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
            <rect x="18" y="22" width="14" height="22" rx="2" />
            <rect x="8" y="23" width="10" height="18" rx="2" />
            <rect x="32" y="23" width="10" height="18" rx="2" />
            <rect x="19" y="44" width="5" height="20" rx="2" />
            <rect x="26" y="44" width="5" height="20" rx="2" />
            <polygon points="5,5 8,12 2,12" fill="rgba(255,255,255,0.1)" />
            <polygon points="5,5 12,8 12,2" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>

      </div>

      {/* Content */}
      <div className="relative z-10 px-4">

        <p className="text-red-500 text-sm font-bold tracking-widest uppercase mb-4">
          Welcome to the universe
        </p>

        <h1
          style={{
            fontFamily: "'HeroLegends', sans-serif",
            letterSpacing: '0.05em',
            textShadow: `
              -2px -2px 0px #000,
              2px -2px 0px #000,
              -2px 2px 0px #000,
              2px 2px 0px #000,
              -3px 0px 0px #000,
              3px 0px 0px #000,
              0px -3px 0px #000,
              0px 3px 0px #000
            `,
          }}
          className="text-6xl md:text-9xl text-white uppercase leading-tight mb-6"
        >
          Pop<span className="text-red-500">verse</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          Your ultimate destination for Anime, Comics, Manga, Manhwa and everything Pop Culture. Dive into the universe.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105">
            Explore Now
          </button>
          <button className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105">
            Learn More
          </button>
          <button></button>
        </div>

      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-8 w-full overflow-hidden z-10">
        <div className="animate-marquee gap-12 whitespace-nowrap text-gray-600 font-bold text-sm tracking-widest uppercase">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-6">
              Anime <span className="text-red-600 mx-2">•</span>
              Comics <span className="text-red-600 mx-2">•</span>
              Manga <span className="text-red-600 mx-2">•</span>
              Manhwa <span className="text-red-600 mx-2">•</span>
              Superheroes <span className="text-red-600 mx-2">•</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
   
