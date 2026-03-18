import { Link } from 'react-router-dom'
import { Calendar, ShoppingCart } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export default function CTABanner() {
  const { t, isRTL } = useLang()
  const c = t.cta

  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=80"
        alt="Restaurant atmosphere"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,150,90,0.08), transparent 70%)' }}
      />

      <div className="relative container-pad text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {c.title}
        </h2>
        <p className="text-white/55 text-lg mb-10 font-light max-w-lg mx-auto">
          {c.sub}
        </p>
        <div className={`flex flex-wrap items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/reservation" className="btn-primary px-10 py-4 text-base">
            <Calendar size={16} />
            {c.book}
          </Link>
          <Link to="/order" className="btn-outline-white px-10 py-4 text-base">
            <ShoppingCart size={16} />
            {c.order}
          </Link>
        </div>
      </div>
    </section>
  )
}
