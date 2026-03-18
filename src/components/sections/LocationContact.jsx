import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import SectionHeader from '../ui/SectionHeader'

const INFO_ICONS = [MapPin, Phone, Mail]

export default function LocationContact() {
  const { t, isRTL } = useLang()
  const loc = t.location

  const infoItems = [
    `${loc.address}, ${loc.city}`,
    loc.phone,
    loc.email,
  ]

  return (
    <section id="contact" className="section-light">
      <div className="container-pad">
        <SectionHeader badge={loc.badge} title={loc.title} />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Map embed */}
          <div className="rounded-3xl overflow-hidden shadow-card-hover h-80 md:h-[420px]">
            <iframe
              title="Sofra location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-74.0040%2C40.7148&layer=mapnik"
              allowFullScreen
            />
          </div>

          {/* Info panel */}
          <div className={`space-y-5 ${isRTL ? 'text-right' : 'text-left'}`}>
            {infoItems.map((val, i) => {
              const Icon = INFO_ICONS[i]
              return (
                <div key={i} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#c8965a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#c8965a]" />
                  </div>
                  <span className="text-stone-600 text-sm leading-relaxed pt-2">{val}</span>
                </div>
              )
            })}

            {/* Hours */}
            <div className="pt-3 border-t border-stone-100">
              <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock size={16} className="text-[#c8965a]" />
                <span className="font-display font-semibold text-[#1a1008] text-sm">
                  {isRTL ? 'أوقات العمل' : 'Opening Hours'}
                </span>
              </div>
              <div className="space-y-2.5">
                {loc.hours.map((h, i) => (
                  <div key={i} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-stone-500 text-sm">{h.day}</span>
                    <span className="font-medium text-[#1a1008] text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live badge */}
            <div className={`flex items-center gap-2 pt-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-600 text-xs font-semibold">
                {isRTL ? 'مفتوح الآن' : 'Open Now · Closes at 10 PM'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
