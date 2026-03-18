import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { galleryImages } from '../../data/gallery'
import SectionHeader from '../ui/SectionHeader'

export default function Gallery({ limit = 8 }) {
  const { t, isRTL } = useLang()
  const g = t.gallery
  const images = galleryImages.slice(0, limit)

  return (
    <section id="gallery" className="section-dark">
      <div className="container-pad">
        <SectionHeader badge={g.badge} title={g.title} sub={g.sub} dark />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[180px]">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                img.wide ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                <Heart
                  size={22}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className={`btn-outline border-white/30 text-white hover:bg-white hover:text-[#1a1008] inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? 'عرض كل الصور' : 'View Full Gallery'}
            <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  )
}
