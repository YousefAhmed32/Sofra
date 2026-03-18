import { Star } from 'lucide-react'
import { useLang } from '../../context/LangContext'

// ─── Testimonial Card ─────────────────────────────────────────────────────────
export default function TestimonialCard({ item }) {
  const { isRTL } = useLang()

  return (
    <div className={`card p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm gold-gradient-bg">
          {item.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-[#1a1008] text-sm leading-tight truncate">
            {item.name}
          </p>
          <p className="text-stone-400 text-xs">{item.loc}</p>
        </div>
        <div className={`flex gap-0.5 flex-shrink-0 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} size={12} className="text-amber-400" fill="#f59e0b" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-stone-600 text-sm leading-relaxed">
        "{item.text}"
      </blockquote>
    </div>
  )
}
