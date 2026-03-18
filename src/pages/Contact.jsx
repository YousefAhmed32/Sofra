import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useLang } from '../context/LangContext'
import SectionHeader from '../components/ui/SectionHeader'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t, isRTL } = useLang()
  const c = t.contact
  const loc = t.location

  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm(EMPTY)
      setTimeout(() => setSubmitted(false), 5000)
    }, 900)
  }

  return (
    <main className="min-h-screen pt-24">
      {/* Banner */}
      <div className="relative h-52 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-pad pb-8">
          <span className="badge-dark">{c.badge}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{c.title}</h1>
        </div>
      </div>

      <section className="section-light">
        <div className="container-pad">
          <div className="grid md:grid-cols-2 gap-14">

            {/* Contact info + map */}
            <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <SectionHeader badge={c.badge} title={c.title} sub={c.sub} center={false} />

              {[
                { Icon: MapPin,  val: `${loc.address}, ${loc.city}` },
                { Icon: Phone,   val: loc.phone  },
                { Icon: Mail,    val: loc.email  },
              ].map(({ Icon, val }, i) => (
                <div key={i} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#c8965a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#c8965a]" />
                  </div>
                  <span className="text-stone-600 text-sm leading-relaxed pt-2">{val}</span>
                </div>
              ))}

              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-[#c8965a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#c8965a]" />
                </div>
                <div className={`pt-1 ${isRTL ? 'text-right' : ''}`}>
                  {loc.hours.map((h, i) => (
                    <div key={i} className="flex gap-4 text-sm text-stone-600 mb-1">
                      <span className="font-medium text-[#1a1008] w-32">{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-card h-52">
                <iframe
                  title="Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-74.0040%2C40.7148&layer=mapnik"
                />
              </div>
            </div>

            {/* Form */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
                  <p className="text-green-700 font-medium">{c.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">{c.nameLbl}</label>
                      <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="form-input" style={{ textAlign: isRTL ? 'right' : 'left' }} />
                    </div>
                    <div>
                      <label className="form-label">{c.emailLbl}</label>
                      <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">{c.subjectLbl}</label>
                    <input type="text" required value={form.subject} onChange={e => update('subject', e.target.value)} className="form-input" style={{ textAlign: isRTL ? 'right' : 'left' }} />
                  </div>
                  <div>
                    <label className="form-label">{c.messageLbl}</label>
                    <textarea rows={6} required value={form.message} onChange={e => update('message', e.target.value)} className="form-input resize-none" style={{ textAlign: isRTL ? 'right' : 'left' }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base justify-center rounded-xl disabled:opacity-60">
                    {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Send size={15} />}
                    {c.sendBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
