"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { isClient } from '@/lib/utils'

export function Contact() {
  const contactRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-text', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top center",
          end: "bottom center",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      })
    }, contactRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={contactRef} id="contact" className="min-h-screen flex items-center">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="contact-text text-[6vw] font-light mb-8">
            Let's create together
          </h2>
          <p className="contact-text text-xl font-light opacity-70 mb-12">
            Have a project in mind? We'd love to hear about it.
          </p>
          <a 
            href="mailto:hello@studio.com"
            className="contact-text inline-block border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
} 