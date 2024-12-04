"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { isClient } from '@/lib/utils'

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="bg-black text-white min-h-screen">
      <div className="container px-4 py-40">
        <h1 className="fade-in text-[10vw] font-light mb-20">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="fade-in text-2xl font-light leading-relaxed mb-8 opacity-80">
              We are a creative studio specializing in immersive digital experiences. Our work spans across art, technology, and design.
            </p>
            <p className="fade-in text-2xl font-light leading-relaxed opacity-80">
              Founded in 2023, we've collaborated with artists, brands, and institutions to create memorable digital moments.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="fade-in">
              <h3 className="text-xl mb-4">Services</h3>
              <ul className="space-y-2 opacity-80">
                <li>Creative Direction</li>
                <li>Digital Design</li>
                <li>Web Development</li>
                <li>Motion Design</li>
                <li>Interactive Installations</li>
              </ul>
            </div>
            
            <div className="fade-in">
              <h3 className="text-xl mb-4">Clients</h3>
              <ul className="space-y-2 opacity-80">
                <li>Nike</li>
                <li>Apple</li>
                <li>Sony Music</li>
                <li>MoMA</li>
                <li>Spotify</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 