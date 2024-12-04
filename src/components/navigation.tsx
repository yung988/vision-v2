"use client"

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { isClient } from '@/lib/utils'
import Link from 'next/link'

export function Navigation() {
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useLayoutEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      const button = navRef.current?.querySelector<HTMLElement>('.menu-button')
      if (!button) return

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = button.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        
        gsap.to(button, {
          x: (x - width/2) * 0.2,
          y: (y - height/2) * 0.2,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3
        })
      }

      button.addEventListener('mousemove', handleMouseMove as EventListener)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove as EventListener)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, navRef)

    return () => ctx.revert()
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    
    if (!isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at top right)',
        duration: 1,
        ease: "power3.inOut"
      })
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at top right)',
        duration: 0.8,
        ease: "power3.inOut"
      })
    }
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 right-0 z-50 p-8">
        <button 
          onClick={toggleMenu}
          className="menu-button w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-xl font-light hover:scale-110 transition-transform"
        >
          Menu
        </button>
      </nav>

      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-white text-black z-40"
        style={{ clipPath: 'circle(0% at top right)' }}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-[8vw] font-light space-y-8">
            <Link href="/" className="block hover:opacity-50 transition-opacity">Home</Link>
            <Link href="/work" className="block hover:opacity-50 transition-opacity">Work</Link>
            <Link href="/about" className="block hover:opacity-50 transition-opacity">About</Link>
            <Link href="/contact" className="block hover:opacity-50 transition-opacity">Contact</Link>
          </div>
        </div>
      </div>
    </>
  )
} 