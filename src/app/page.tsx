import { Navigation } from '@/components/navigation'
import { Hero, Gallery, About, Contact } from '@/components/sections'

export default function Page() {
  return (
    <main className="bg-black text-white">
      <Navigation />
      <Hero />
      <Gallery />
      <About />
      <Contact />
    </main>
  )
}

