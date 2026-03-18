import { useRef } from 'react'
import { useLang } from '../../context/LangContext'

export default function Offers() {
  const { t, isRTL } = useLang()
  const o = t.offers

  const sideCards = [
    { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', title: o.card2title, sub: o.card2sub, cta: o.card2cta },
{ img: '/images/FreeDelivery.png', title: o.card3title, sub: o.card3sub, cta: o.card3cta },  ]

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%23c8965a'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-pad relative">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Main offer card */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80"
              alt="Weekend special"
              loading="lazy"
              className="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* Stronger gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

            <div className={`absolute inset-0 p-8 md:p-10 flex flex-col justify-end ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="inline-block self-start px-3 py-1 rounded-full bg-[#c8965a] text-white text-[10px] font-bold tracking-widest uppercase mb-3 shadow-[0_2px_12px_rgba(200,150,90,0.5)]">
                {o.badge}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {o.headline}
              </h3>
              <p className="text-white/60 text-sm mb-5 max-w-sm leading-relaxed">{o.sub}</p>
              <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button className="px-5 py-2.5 rounded-full bg-[#c8965a] text-white text-sm font-semibold hover:bg-[#b5834a] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(200,150,90,0.4)]">
                  {o.cta}
                </button>
                <span className="text-[#c8965a] text-xs font-mono tracking-widest border border-[#c8965a]/40 px-3 py-1.5 rounded-md bg-black/20 backdrop-blur-sm">
                  {o.code}
                </span>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-5">
            {sideCards.map((card, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group cursor-pointer flex-1 min-h-[120px]">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/50 to-black/70" />

                <div className={`absolute inset-0 p-5 flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-display text-white font-bold text-[15px] leading-tight">{card.title}</div>
                    <div className="text-white/50 text-xs mt-1">{card.sub}</div>
                  </div>
                  <button className="flex-shrink-0 text-[#c8965a] border border-[#c8965a]/50 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#c8965a] hover:text-white hover:border-transparent transition-all duration-200 whitespace-nowrap backdrop-blur-sm">
                    {card.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}