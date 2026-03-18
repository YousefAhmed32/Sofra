import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { dishes } from '../data/dishes'
import DishCard from '../components/ui/DishCard'
import SectionHeader from '../components/ui/SectionHeader'

export default function MenuPage() {
  const { t, lang } = useLang()
  const m = t.menuSection
  const allDishes = dishes[lang] || dishes.en
  const categories = m.categories

  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [search, setSearch] = useState('')

  const filtered = allDishes.filter(d => {
    const matchCat = activeCategory === categories[0] || d.cat === activeCategory
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                        d.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="min-h-screen pt-24">
      {/* Hero banner */}
      <div className="relative h-52 md:h-64 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="Menu"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-pad pb-8 w-full">
          <span className="badge-dark">{m.badge}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{m.title}</h1>
        </div>
      </div>

      <section className="section-light">
        <div className="container-pad">
          {/* Filters row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Search */}
            <input
              type="search"
              placeholder={lang === 'ar' ? 'ابحث في القائمة...' : 'Search menu...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input max-w-xs"
            />
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#c8965a] text-white shadow-gold'
                      : 'border border-[#c8965a]/35 text-[#c8965a] hover:bg-[#c8965a]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-stone-400 text-sm mb-6">
            {filtered.length} {lang === 'ar' ? 'طبق' : 'dishes'}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
              {filtered.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-stone-400">
              <p className="text-5xl mb-4">🍽️</p>
              <p className="text-lg">{lang === 'ar' ? 'لا توجد نتائج' : 'No dishes found'}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
