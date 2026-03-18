import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { dishes } from '../../data/dishes'
import SectionHeader from '../ui/SectionHeader'
import DishCard from '../ui/DishCard'

export default function MenuSection({ limit = 8 }) {
  const { t, lang, isRTL } = useLang()
  const m = t.menuSection

  const allDishes  = dishes[lang] || dishes.en
  const categories = m.categories

  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [animKey, setAnimKey] = useState(0)
  const gridRef = useRef(null)

  const filtered = activeCategory === categories[0]
    ? allDishes.slice(0, limit)
    : allDishes.filter(d => d.cat === activeCategory).slice(0, limit)

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setAnimKey(k => k + 1) // re-trigger stagger animation
  }

  return (
    <section id="menu" className="section-light">
      <div className="container-pad">
        <SectionHeader badge={m.badge} title={m.title} sub={m.sub} />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#c8965a] text-white shadow-[0_4px_16px_rgba(200,150,90,0.35)]'
                  : 'border border-[#c8965a]/35 text-[#c8965a] hover:bg-[#c8965a]/10 hover:border-[#c8965a]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid with stagger animation */}
        <div
          key={animKey}
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((dish, i) => (
              <div
                key={dish.id}
                className="opacity-0 translate-y-4 animate-[fadeUp_0.4s_ease_forwards]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <DishCard dish={dish} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-stone-400">
              <p className="text-lg font-light">{m.noResults || 'No dishes in this category yet.'}</p>
            </div>
          )}
        </div>

        {/* View full menu CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className={`inline-flex items-center gap-2.5 px-8 py-3 rounded-full
                        border-[1.5px] border-[#c8965a] text-[#c8965a] text-sm font-semibold
                        hover:bg-[#c8965a] hover:text-white transition-all duration-200
                        ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {m.viewFull}
            <ArrowRight size={15} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>

      {/* Tailwind keyframe — add to global CSS instead if preferred */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  )
}