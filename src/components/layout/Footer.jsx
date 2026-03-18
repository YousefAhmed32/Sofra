import { Link } from 'react-router-dom'
import { Utensils, Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react'
import { useLang } from '../../context/LangContext'

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: 'https://wa.me/201090385390?text=Hello%20YANSY%20TECH%2C%20I%20want%20to%20create%20a%20website%20similar%20to%20this%20one.%0A%0A%D8%A3%D9%86%D8%A7%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%B9%D9%85%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87%20%D9%84%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9' },
  { Icon: Facebook,  label: 'Facebook',  href: 'https://wa.me/201090385390?text=Hello%20YANSY%20TECH%2C%20I%20want%20to%20create%20a%20website%20similar%20to%20this%20one.%0A%0A%D8%A3%D9%86%D8%A7%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%B9%D9%85%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87%20%D9%84%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9' },
  { Icon: Twitter,   label: 'Twitter',   href: 'https://wa.me/201090385390?text=Hello%20YANSY%20TECH%2C%20I%20want%20to%20create%20a%20website%20similar%20to%20this%20one.%0A%0A%D8%A3%D9%86%D8%A7%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%B9%D9%85%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87%20%D9%84%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9' },
  { Icon: Youtube,   label: 'YouTube',   href: 'https://wa.me/201090385390?text=Hello%20YANSY%20TECH%2C%20I%20want%20to%20create%20a%20website%20similar%20to%20this%20one.%0A%0A%D8%A3%D9%86%D8%A7%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%B9%D9%85%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87%20%D9%84%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9' },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/201090385390?text=Hello%20YANSY%20TECH%2C%20I%20want%20to%20create%20a%20website%20similar%20to%20this%20one.%0A%0A%D8%A3%D9%86%D8%A7%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%B9%D9%85%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87%20%D9%84%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9'
  }
]

const PAGE_LINKS = [
  { to: '/menu',        labelKey: 0 },
  { to: '/about',       labelKey: 1 },
  { to: '/gallery',     labelKey: 2 },
  { to: '/contact',     labelKey: 3 },
  { to: '/reservation', labelKey: 4 },
]

// ─── Footer ─────────────────────────────────────────────────────────────
export default function Footer() {
  const { t, isRTL } = useLang()
  const f = t.footer

  return (
    <footer className="bg-[#0f0a05] pt-16 pb-8" dir={t.dir}>
      <div className="container-pad">

        {/* Top grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-white/10 ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Brand */}
          <div>
            <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                <Utensils size={17} className="text-white" />
              </div>

              <span className="font-display text-2xl font-bold text-white">
                {isRTL ? 'سُفرة' : 'Sofra'}
              </span>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-5">
              {f.tagline}
            </p>

            <div className={`flex gap-2.5 ${isRTL ? 'justify-end' : ''}`}>
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/45 hover:text-[#c8965a] hover:border-[#c8965a]/50 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold text-xs tracking-widest uppercase mb-4">
              {f.quickLinks}
            </p>

            <ul className="space-y-2.5">
              {PAGE_LINKS.map(({ to, labelKey }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/40 hover:text-[#c8965a] text-sm transition-colors"
                  >
                    {f.links[labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <p className="text-white font-semibold text-xs tracking-widest uppercase mb-4">
              {f.openingHours}
            </p>

            <p className="text-white/40 text-sm leading-relaxed mb-4">
              {f.hours}
            </p>

            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">
                {f.openNow}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>

          <p className="text-white/25 text-xs">
            {f.copy}
          </p>

          <p className="text-white/25 text-xs">
            Made by{" "}
            <a
              href="https://yansytech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8965a] hover:underline"
            >
              YANSY TECH
            </a>
          </p>

        </div>

      </div>
    </footer>
  )
}