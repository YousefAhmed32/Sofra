import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { galleryImages } from '../data/gallery'
import SectionHeader from '../components/ui/SectionHeader'

export default function GalleryPage() {
  const { t, isRTL } = useLang()
  const g = t.gallery
  const [lightbox, setLightbox] = useState(null) // index

  const open  = (i) => setLightbox(i)
  const close = ()  => setLightbox(null)
  const prev  = ()  => setLightbox(i => (i - 1 + galleryImages.length) % galleryImages.length)
  const next  = ()  => setLightbox(i => (i + 1) % galleryImages.length)

  return (
    <main className="min-h-screen pt-24 bg-[#1a1008]">
      {/* Header */}
      <div className="container-pad pt-10 pb-4">
        <SectionHeader badge={g.badge} title={g.title} sub={g.sub} dark />
      </div>

      {/* Grid */}
      <section className="container-pad pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              onClick={() => open(i)}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.wide ? 'col-span-2 row-span-2' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Heart size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <img
            src={galleryImages[lightbox].src.replace('w=500', 'w=1200')}
            alt={galleryImages[lightbox].alt}
            className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </main>
  )
}
