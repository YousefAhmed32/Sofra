import { Star, Award, Heart, BookOpen } from 'lucide-react'
import { useLang } from '../context/LangContext'
import SectionHeader from '../components/ui/SectionHeader'

const VALUE_ICONS = [Award, Heart, BookOpen]

const TEAM = [
  { name: 'Chef Karim Hassan',  role: 'Executive Chef',     img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80' },
  { name: 'Lina Mansour',       role: 'Pastry Chef',        img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=300&q=80' },
  { name: 'Marco Delgado',      role: 'Head of Beverages',  img: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=300&q=80' },
]

export default function About() {
  const { t, isRTL } = useLang()
  const a = t.about

  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative h-56 md:h-72 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="About Sofra"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-pad pb-8 w-full">
          <span className="badge-dark">{a.badge}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{a.title}</h1>
        </div>
      </div>

      {/* Story */}
      <section className="section-light">
        <div className="container-pad">
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <SectionHeader badge={a.badge} title={a.title} sub={a.sub} center={false} />
              <p className="text-stone-600 leading-relaxed mb-4 text-sm md:text-base">{a.p1}</p>
              <p className="text-stone-600 leading-relaxed text-sm md:text-base">{a.p2}</p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
                  alt="Restaurant"
                  loading="lazy"
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Rating bubble */}
              <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl p-5 shadow-card-hover">
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" className="text-amber-400" />
                  ))}
                </div>
                <div className="font-display font-bold text-[#1a1008] text-base">4.9 / 5.0</div>
                <div className="text-stone-400 text-xs">2,400+ reviews</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {a.values.map((v, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <div key={i} className={`card p-7 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="w-12 h-12 rounded-full bg-[#c8965a]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#c8965a]" />
                  </div>
                  <h3 className="font-display font-bold text-[#1a1008] text-lg mb-2">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Team */}
          <div className="text-center mb-10">
            <SectionHeader badge="" title={a.team} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="card p-6 text-center group">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-[#c8965a]/20 group-hover:ring-[#c8965a]/50 transition-all">
                  <img src={member.img} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display font-bold text-[#1a1008] text-base">{member.name}</h4>
                <p className="text-[#c8965a] text-xs font-semibold mt-1 uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
