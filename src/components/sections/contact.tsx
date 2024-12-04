"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black flex items-center justify-center">
      <div className="contact-content text-center">
        <h2 className="text-[10vw] font-light mb-8">Let's create together</h2>
        <p className="text-xl font-light mb-12 opacity-70">
          Have a project in mind? We'd love to hear about it.
        </p>
        <a 
          href="#contact" 
          className="group inline-flex items-center gap-4 text-xl font-light border border-white/30 px-8 py-4 
            hover:bg-white hover:text-black transition-all duration-500"
        >
          Get in touch
          <svg 
            className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </a>
      </div>
    </section>
  )
} 