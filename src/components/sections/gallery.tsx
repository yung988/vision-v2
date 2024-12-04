"use client"

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

const images = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/img-${i + 1}.jpg`,
  alt: `Project ${i + 1}`,
  size: i % 3 === 0 ? 'large' : i % 3 === 1 ? 'medium' : 'small'
}))

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Horizontální scroll
      gsap.to(containerRef.current, {
        x: () => -(containerRef.current?.scrollWidth || 0) + window.innerWidth,
        ease: "none",
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

      // Titulek
      gsap.to('.gallery-title', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "top 20%",
          scrub: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="gallery-section relative mt-[200vh] pt-32"
    >
      {/* Titulek */}
      <div className="gallery-title absolute top-10 left-[10vw] text-[3vw] font-light">
        Selected Works
      </div>

      {/* Horizontální galerie */}
      <div 
        ref={containerRef} 
        className="absolute top-0 left-0 h-screen flex items-center gap-40 pl-[10vw]"
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative flex-shrink-0 ${
              image.size === 'large' ? 'w-[40vw] h-[60vh]' :
              image.size === 'medium' ? 'w-[30vw] h-[45vh]' :
              'w-[25vw] h-[35vh]'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={
                image.size === 'large' ? '40vw' :
                image.size === 'medium' ? '30vw' :
                '25vw'
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
} 