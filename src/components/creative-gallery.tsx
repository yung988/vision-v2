"use client"

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from '@/lib/utils'

if (isClient) {
  gsap.registerPlugin(ScrollTrigger)
}

interface CreativeGalleryProps {
  images: Array<{
    src: string
    alt: string
    className: string
  }>
}

export function CreativeGallery({ images }: CreativeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Paralax efekt pro každý obrázek
      gsap.utils.toArray('.gallery-item').forEach((item: any, i) => {
        gsap.to(item, {
          yPercent: -50 * (i % 3),
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        })
      })

      // Fade in animace při scrollu
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 1,
          from: "random"
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item relative overflow-hidden ${image.className} group`}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 