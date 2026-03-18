import { useEffect, useRef } from 'react'

export default function SectionHeader({
  badge,
  title,
  sub,
  dark = false,
  center = true,
  className = '',
}) {
  const ref = useRef(null)

  // Fade-in on mount / scroll into view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('sh-visible') },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const headingColor = dark ? 'text-white' : 'text-[#1a1008]'
  const subColor     = dark ? 'text-white/45' : 'text-stone-500'
  const alignClass   = center ? 'text-center' : ''

  return (
    <>
      <style>{`
        .sh-root { opacity: 0; transform: translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .sh-visible { opacity: 1 !important; transform: none !important; }
        .badge-gold {
          display: inline-block;
          background: linear-gradient(135deg, rgba(200,150,90,.13), rgba(200,150,90,.07));
          border: 1px solid rgba(200,150,90,.35);
          color: #8a5f2e;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 9999px;
        }
        .badge-dark {
          display: inline-block;
          background: rgba(200,150,90,.1);
          border: 1px solid rgba(200,150,90,.25);
          color: #d4a96a;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 9999px;
        }
      `}</style>

      <div
        ref={ref}
        className={`sh-root mb-10 md:mb-14 ${alignClass} ${className}`}
      >
        {badge && (
          <div className="mb-5">
            <span className={dark ? 'badge-dark' : 'badge-gold'}>
              {badge}
            </span>
          </div>
        )}

        <h2
          className={`
            font-display text-3xl md:text-4xl lg:text-5xl font-bold
            ${headingColor} leading-tight mb-3 tracking-tight
          `}
        >
          {title}
        </h2>

        {sub && (
          <p
            className={`
              ${subColor} text-base md:text-lg font-light leading-relaxed
              max-w-xl mb-5
              ${center ? 'mx-auto' : ''}
            `}
          >
            {sub}
          </p>
        )}

        {/* Decorative divider — three-segment gold rule */}
        <div className={`flex items-center gap-1.5 ${center ? 'justify-center' : ''}`}>
          <div className="h-px w-1.5 bg-[#c8965a] opacity-40 rounded-full" />
          <div className="h-px w-7 bg-gradient-to-r from-[#c8965a] to-[#e6b880] rounded-full" />
          <div className="h-px w-1.5 bg-[#c8965a] opacity-40 rounded-full" />
        </div>
      </div>
    </>
  )
}