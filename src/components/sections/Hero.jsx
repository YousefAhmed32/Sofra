import { Link } from 'react-router-dom'
import { Calendar, ShoppingCart } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export default function Hero() {
  const { t, isRTL } = useLang()
  const h = t.hero

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(200,150,90,0.12), transparent 60%)' }} />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 right-20 w-72 h-72 rounded-full border border-white/5 animate-pulse-slow" />
        <div className="absolute bottom-32 left-16 w-52 h-52 rounded-full border border-[#c8965a]/10 animate-pulse-slow" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative container-pad pt-28 pb-20">
        <div className={`max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c8965a]/35 bg-[#c8965a]/10 mb-6 animate-fade-up`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8965a] animate-pulse" />
            <span className="text-[#c8965a] text-xs font-bold tracking-widest uppercase">{h.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-5 animate-fade-up delay-100">
            {h.headline1}
            <br />
            <span className="text-[#c8965a] italic">{h.headline2}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light animate-fade-up delay-200">
            {h.sub}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 animate-fade-up delay-300 ${isRTL ? 'justify-end' : ''}`}>
            <Link to="/reservation" className="btn-primary px-8 py-4 text-base">
              <Calendar size={16} />
              {h.book}
            </Link>
            <Link to="/order" className="btn-outline-white px-8 py-4 text-base">
              <ShoppingCart size={16} />
              {h.order}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
