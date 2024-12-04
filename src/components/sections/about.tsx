"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

const sections = [
  {
    title: "About Us",
    text: "We are a creative studio specializing in immersive digital experiences."
  },
  {
    title: "Our Vision",
    text: "Creating meaningful connections through innovative digital solutions and creative technology."
  },
  {
    title: "Services",
    items: [
      "Creative Direction",
      "Digital Design",
      "Web Development",
      "Motion Design"
    ]
  },
  {
    title: "Clients",
    items: [
      "Nike",
      "Apple",
      "Sony Music",
      "MoMA"
    ]
  }
]

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Hlavní horizontální scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${containerRef.current?.scrollWidth || 0}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      })

      // Animace horizontálního scrollu
      tl.to(containerRef.current, {
        x: () => -(containerRef.current?.scrollWidth || 0) + window.innerWidth,
        ease: "none"
      })

      // Animace pro každou sekci
      gsap.utils.toArray<HTMLElement>('.about-section').forEach((section) => {
        gsap.to(section, {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "left center",
            end: "right center",
            scrub: true,
            containerAnimation: tl
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div 
        ref={containerRef} 
        className="flex h-screen items-center"
      >
        {sections.map((section, index) => (
          <div 
            key={index}
            className="about-section flex-shrink-0 w-screen h-screen flex items-center justify-center px-20 opacity-50 scale-95"
          >
            <div className="max-w-3xl">
              <h2 className="text-[10vw] font-light mb-8">
                {section.title}
              </h2>
              
              {section.text && (
                <p className="text-3xl font-light leading-relaxed">
                  {section.text}
                </p>
              )}
              
              {section.items && (
                <ul className="text-2xl font-light space-y-4 opacity-80">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 