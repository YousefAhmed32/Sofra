import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import TestimonialCard from '../ui/TestimonialCard'
import SectionHeader from '../ui/SectionHeader'

export default function Testimonials() {
  const { t, isRTL } = useLang()
  const { badge, title, items } = t.testimonials
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx(p => (p - 1 + items.length) % items.length)
  const next = () => setIdx(p => (p + 1) % items.length)

  return (
    <section className="section-tinted">
      <div className="container-pad">
        <SectionHeader badge={badge} title={title} />

        {/* Desktop: 2×2 grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 stagger-children">
          {items.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <TestimonialCard item={items[idx]} />

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:border-[#c8965a] hover:text-[#c8965a] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? 'w-6 h-2 bg-[#c8965a]'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:border-[#c8965a] hover:text-[#c8965a] transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
