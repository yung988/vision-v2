"use client"

import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins outside of any conditions
gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Úvodní animace textu s efektem
      const tl = gsap.timeline()
      
      // Pozadí se objeví první
      tl.fromTo(videoRef.current,
        { 
          opacity: 0,
          scale: 1.2
        },
        {
          opacity: 0.85,
          scale: 1,
          duration: 2,
          ease: "power2.out"
        }
      )
      
      // Pak text po písmenech
      .from('.hero-title .char', {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out"
      }, "-=1")

      // Paralax efekt při scrollu
      gsap.to(videoRef.current, {
        scale: 1.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })

      // Efekt na textu při scrollu
      gsap.to('.hero-title', {
        y: '-25%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })

      // Zmizení před galerií
      ScrollTrigger.create({
        trigger: '.gallery-section',
        start: "top center",
        onEnter: () => {
          gsap.to(heroRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              if (heroRef.current) {
                heroRef.current.style.pointerEvents = 'none'
              }
            }
          })
        },
        onLeaveBack: () => {
          gsap.to(heroRef.current, {
            opacity: 1,
            duration: 1,
            onStart: () => {
              if (heroRef.current) {
                heroRef.current.style.pointerEvents = 'auto'
              }
            }
          })
        }
      })

      // Hover efekt na textu
      const chars = document.querySelectorAll('.hero-title .char')
      chars.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            y: -20,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
          })
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [isClient])

  // Funkce pro rozdělení textu na písmena
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block hover:cursor-pointer">
        {char}
      </span>
    ))
  }

  // Only render content when on client side
  if (!isClient) {
    return (
      <section className="fixed inset-0 z-10">
        {/* Initial loading state that matches server render */}
        <div className="relative z-20 h-screen flex items-center">
          <div className="container px-4">
            <h1 className="hero-title text-[15vw] font-light leading-[0.8] text-white mix-blend-difference">
              <div className="block">Create</div>
              <div className="block">Beyond</div>
              <div className="block">Limits</div>
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={heroRef} className="fixed inset-0 z-10">
      {/* Text */}
      <div className="relative z-20 h-screen flex items-center">
        <div className="container px-4">
          <h1 className="hero-title text-[15vw] font-light leading-[0.8] text-white mix-blend-difference">
            <div className="block">{splitText('Create')}</div>
            <div className="block">{splitText('Beyond')}</div>
            <div className="block">{splitText('Limits')}</div>
          </h1>
        </div>
      </div>

      {/* Scroll indikátor */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-light tracking-widest opacity-50">
            SCROLL FOR MORE
          </span>
          <div className="w-[1px] h-[30px] bg-white/30 animate-bounce" />
        </div>
      </div>

      {/* Video pozadí */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 z-20" />
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/showreel.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Světelné efekty */}
      <div className="absolute inset-0 z-30 mix-blend-overlay opacity-30">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-500/20 to-transparent" />
      </div>

      {/* Noise efekt pomocí SVG */}
      <div className="absolute inset-0 z-40 opacity-[0.12] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.80" 
              numOctaves="4" 
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </section>
  )
} 