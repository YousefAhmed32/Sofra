import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import SectionHeader from '../ui/SectionHeader'

function FAQItem({ item, isOpen, onToggle, isRTL }) {
  return (
    <div className="card-dark rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full p-5 flex items-center gap-4 hover:bg-white/5 transition-colors ${
          isRTL ? 'flex-row-reverse text-right' : 'text-left'
        }`}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white text-sm leading-snug flex-1">
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#c8965a] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`px-5 pb-5 pt-1 text-white/55 text-sm leading-relaxed border-t border-white/8 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {item.a}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t, isRTL } = useLang()
  const f = t.faq
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(prev => (prev === i ? null : i))

  return (
    <section className="section-dark">
      <div className="container-pad">
        <div className="max-w-3xl mx-auto">
          <SectionHeader badge={f.badge} title={f.title} dark />

          <div className="space-y-3">
            {f.items.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
