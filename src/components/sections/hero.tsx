"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Úvodní animace textu - pouze při načtení
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      })

      // Video fade in s průhledností
      gsap.fromTo(videoRef.current, 
        { opacity: 0 },
        {
          opacity: 0.6,
          duration: 2,
          delay: 1
        }
      )

      // Nastavení scrollTrigger pro zmizení celé sekce před galerií
      ScrollTrigger.create({
        trigger: '.gallery-section', // Předpokládám, že galerie má tuto třídu
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
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="fixed inset-0 z-10">
      {/* Text, který je vždy viditelný */}
      <div className="relative z-20 h-screen flex items-center">
        <div className="container px-4">
          <h1 className="hero-title text-[15vw] font-light leading-[0.8] text-white">
            <span className="block">Create</span>
            <span className="block">Beyond</span>
            <span className="block">Limits</span>
          </h1>
        </div>
      </div>

      {/* Video pozadí s průhledností */}
      <div className="absolute inset-0 z-30">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        >
          <source src="/video/showreel.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Extra gradient pro lepší čitelnost */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-40 pointer-events-none" />
    </section>
  )
} 