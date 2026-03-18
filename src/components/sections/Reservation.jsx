import { useState } from 'react'
import { Calendar, Star } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import SectionHeader from '../ui/SectionHeader'

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

const EMPTY_FORM = { name: '', phone: '', datetime: '', guests: '2', requests: '' }

export default function Reservation() {
  const { t, isRTL } = useLang()
  const r = t.reservation

  const [form, setForm]         = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm(EMPTY_FORM)
      setTimeout(() => setSubmitted(false), 5000)
    }, 900)
  }

  return (
    <section id="reservation" className="section-tinted">
      <div className="container-pad">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left: image + rating card */}
          <div className="relative hidden md:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
                alt="Restaurant atmosphere"
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-5 shadow-card-hover">
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#f59e0b" className="text-amber-400" />
                ))}
              </div>
              <div className="font-display font-bold text-[#1a1008] text-base">4.9 / 5.0</div>
              <div className="text-stone-400 text-xs">Based on 2,400+ reviews</div>
            </div>
          </div>

          {/* Right: form */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <SectionHeader
              badge={r.badge}
              title={r.title}
              sub={r.sub}
              center={false}
            />

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-3 text-green-700">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600 flex-shrink-0">
                  ✓
                </div>
                <span className="text-sm font-medium">{r.success}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{r.name}</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className="form-input"
                      style={{ textAlign: isRTL ? 'right' : 'left' }}
                    />
                  </div>
                  <div>
                    <label className="form-label">{r.phone}</label>
                    <input
                      type="tel" required
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{r.date}</label>
                    <input
                      type="datetime-local" required
                      value={form.datetime}
                      onChange={e => update('datetime', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">{r.guests}</label>
                    <select
                      value={form.guests}
                      onChange={e => update('guests', e.target.value)}
                      className="form-input"
                    >
                      {GUEST_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">{r.requests}</label>
                  <textarea
                    rows={3}
                    value={form.requests}
                    onChange={e => update('requests', e.target.value)}
                    className="form-input resize-none"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-base rounded-xl justify-center disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Calendar size={16} />
                  )}
                  {r.btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
