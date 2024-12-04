"use client"

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionsProps {
  images: {
    src: string
    alt: string
    className: string
  }[]
}

export function AnimatedSections({ images }: AnimatedSectionsProps) {
  const mainRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from('.hero-text', {
        opacity: 0,
        y: 100,
        duration: 2,
        ease: "power4.out",
        stagger: 0.2
      })

      // Blur effect animation
      gsap.to('.blur-animate', {
        scrollTrigger: {
          trigger: '.blur-animate',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        },
        filter: 'blur(20px)',
        scale: 1.1,
      })

      // Images stagger animation
      gsap.from('.image-reveal', {
        scrollTrigger: {
          trigger: '.image-grid',
          start: 'top 80%',
          end: 'bottom 20%',
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      })

      // Background color animation
      gsap.to('.gradient-bg', {
        scrollTrigger: {
          trigger: '.gradient-bg',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        backgroundPosition: '100% 100%',
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 blur-animate">
          <Image
            src="/images/img-1.jpg"
            alt="Abstract blue light trails"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-[12vw] font-light leading-none mb-8">
            <span className="hero-text block">Visual</span>
            <span className="hero-text block">Poetry in</span>
            <span className="hero-text block">Motion</span>
          </h1>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="py-40 gradient-bg bg-gradient-to-b from-black via-blue-950 to-black bg-[length:100%_400%]">
        <div className="container mx-auto px-6">
          <div className="image-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className={`image-reveal relative overflow-hidden ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="hero-text text-[5vw] md:text-[4vw] leading-tight font-light max-w-4xl mx-auto text-center">
            Capturing the ephemeral moments where light, motion, and emotion converge
          </h2>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 blur-animate">
          <Image
            src="/images/img-2.jpg"
            alt="Crowd silhouette"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="hero-text text-[6vw] font-light mb-12">
              Let's create something extraordinary
            </h2>
            <Link 
              href="/contact"
              className="inline-block text-xl border border-white/50 px-12 py-6 hover:bg-white hover:text-black transition-all duration-500"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 