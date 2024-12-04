"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { isClient } from '@/lib/utils'

export default function ContactPage() {
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
        <div className="max-w-4xl">
          <h1 className="fade-in text-[10vw] font-light mb-12">Get in Touch</h1>
          
          <div className="space-y-20">
            <div>
              <p className="fade-in text-2xl font-light leading-relaxed mb-8">
                Have a project in mind? Let's create something extraordinary together.
              </p>
              <a 
                href="mailto:hello@studio.com"
                className="fade-in inline-block text-xl border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                hello@studio.com
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="fade-in">
                <h3 className="text-xl mb-4">Location</h3>
                <p className="opacity-80">
                  123 Creative Street<br />
                  New York, NY 10013<br />
                  United States
                </p>
              </div>
              
              <div className="fade-in">
                <h3 className="text-xl mb-4">Social</h3>
                <ul className="space-y-2 opacity-80">
                  <li><a href="#" className="hover:opacity-50 transition-opacity">Instagram</a></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">Twitter</a></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 