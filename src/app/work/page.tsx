import { Gallery } from '@/components/sections/gallery'

export default function WorkPage() {
  return (
    <main className="bg-black text-white pt-40">
      <div className="container px-4">
        <h1 className="text-[10vw] font-light mb-20">Selected Work</h1>
      </div>
      <Gallery />
    </main>
  )
} 