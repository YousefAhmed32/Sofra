import { Award, Users, Utensils, Truck } from 'lucide-react'
import { useLang } from '../../context/LangContext'

const ICONS = [Award, Users, Utensils, Truck]

export default function Stats() {
  const { t } = useLang()

  return (
    <section className="bg-[#1a1008] py-16">
      <div className="container-pad">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-[#c8965a]/10 flex items-center justify-center mb-3 transition-colors group-hover:bg-[#c8965a]/20">
                  <Icon size={22} className="text-[#c8965a]" />
                </div>
                <div className="font-display text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-white/45 text-sm font-light">{s.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
