import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft,
  ArrowRight, MapPin, Phone, User, CreditCard, Banknote,
  CheckCircle2, Clock, Bike, ChevronRight, Tag, X, Sparkles
} from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'

// ─── STEP CONFIG ──────────────────────────────────────────────────────────────
const STEPS = ['cart', 'delivery', 'payment', 'confirm']

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt = (n) => `$${Number(n).toFixed(2)}`
const parsePrice = (p) => parseFloat(String(p).replace(/[^\d.]/g, '')) || 0

// ─── PROGRESS STEPPER ────────────────────────────────────────────────────────
function Stepper({ step, isRTL }) {
  const labels = ['Cart', 'Delivery', 'Payment', 'Done']
  const idx = STEPS.indexOf(step)
  return (
    <div className={`flex items-center justify-center gap-0 mb-10 select-none ${isRTL ? 'flex-row-reverse' : ''}`}>
      {labels.map((label, i) => {
        const done    = i < idx
        const active  = i === idx
        const future  = i > idx
        return (
          <div key={i} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                transition-all duration-400 ${
                  done   ? 'bg-[#c8965a] text-white shadow-[0_0_0_4px_rgba(200,150,90,0.15)]' :
                  active ? 'bg-[#1a1008] text-white shadow-[0_0_0_4px_rgba(26,16,8,0.12)]' :
                           'bg-stone-100 text-stone-400 border border-stone-200'
                }`}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-semibold tracking-wide transition-colors ${
                active ? 'text-[#1a1008]' : done ? 'text-[#c8965a]' : 'text-stone-400'
              }`}>{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className={`w-12 sm:w-20 h-[1.5px] mb-5 mx-1 transition-all duration-500 ${
                i < idx ? 'bg-[#c8965a]' : 'bg-stone-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── ORDER SUMMARY SIDEBAR ───────────────────────────────────────────────────
function OrderSummary({ items, totalPrice, deliveryFee, grandTotal, promoSaving, isRTL }) {
  return (
    <div className={`bg-[#1a1008] rounded-2xl p-6 text-white sticky top-28 ${isRTL ? 'text-right' : ''}`}>
      <h3 className="font-display font-bold text-base mb-5 text-white/90 tracking-wide">
        {isRTL ? 'ملخص الطلب' : 'Order Summary'}
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-5 max-h-56 overflow-y-auto pr-1 custom-scroll">
        {items.map(item => (
          <div key={item.id} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <img src={item.img} alt={item.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 ring-1 ring-white/10" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/85 truncate">{item.name}</p>
              <p className="text-[11px] text-white/40">x{item.qty}</p>
            </div>
            <span className="text-xs font-bold text-[#c8965a] flex-shrink-0">
              {fmt(parsePrice(item.price) * item.qty)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-white/10 pt-4 space-y-2.5">
        <Row label={isRTL ? 'المجموع' : 'Subtotal'} val={fmt(totalPrice)} isRTL={isRTL} dim />
        {promoSaving > 0 && (
          <Row label={isRTL ? 'خصم الكود' : 'Promo'} val={`−${fmt(promoSaving)}`}
            isRTL={isRTL} dim green />
        )}
        <Row
          label={isRTL ? 'التوصيل' : 'Delivery'}
          val={deliveryFee === 0 ? (isRTL ? 'مجاني' : 'FREE') : fmt(deliveryFee)}
          isRTL={isRTL} dim green={deliveryFee === 0}
        />
        <div className={`flex justify-between items-center pt-2 border-t border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-bold text-white text-sm">{isRTL ? 'الإجمالي' : 'Total'}</span>
          <span className="font-display font-bold text-[#c8965a] text-lg">{fmt(grandTotal)}</span>
        </div>
      </div>

      {/* Delivery estimate */}
      <div className={`mt-5 flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Clock size={13} className="text-[#c8965a] flex-shrink-0" />
        <span className="text-[11px] text-white/55">
          {isRTL ? 'التوصيل المتوقع: ٣٠–٤٥ دقيقة' : 'Est. delivery: 30–45 min'}
        </span>
      </div>
    </div>
  )
}

function Row({ label, val, isRTL, dim, green }) {
  return (
    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
      <span className={`text-xs ${dim ? 'text-white/50' : 'text-white'}`}>{label}</span>
      <span className={`text-xs font-semibold ${green ? 'text-green-400' : 'text-white/80'}`}>{val}</span>
    </div>
  )
}

// ─── STEP 1: CART ITEMS ───────────────────────────────────────────────────────
function CartStep({ items, removeItem, updateQty, clearCart, totalPrice,
                    promo, setPromo, promoInput, setPromoInput, isRTL, onNext }) {
  const PROMOS = { 'SOFRA10': 0.10, 'WELCOME': 0.15 }
  const [promoErr, setPromoErr] = useState('')

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMOS[code]) {
      setPromo({ code, pct: PROMOS[code] })
      setPromoErr('')
    } else {
      setPromoErr(isRTL ? 'كود غير صحيح' : 'Invalid promo code')
    }
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-4 flex gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] transition-shadow"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <img src={item.img} alt={item.name}
            className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
            <div className={`flex items-start justify-between gap-2 mb-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h4 className="font-display font-semibold text-[#1a1008] text-sm leading-snug">{item.name}</h4>
              <button onClick={() => removeItem(item.id)}
                className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5 hover:scale-110">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-stone-400 text-[11px] mb-3 line-clamp-1">{item.desc}</p>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Qty */}
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center
                             hover:border-[#c8965a] hover:text-[#c8965a] transition-all hover:scale-110 text-stone-500">
                  <Minus size={11} />
                </button>
                <span className="font-bold text-[#1a1008] w-6 text-center text-sm">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-7 h-7 rounded-full bg-[#c8965a] flex items-center justify-center
                             text-white hover:bg-[#a8763a] transition-all hover:scale-110">
                  <Plus size={11} />
                </button>
              </div>
              <span className="font-display font-bold text-[#c8965a] text-base">
                {fmt(parsePrice(item.price) * item.qty)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Promo code */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Tag size={14} className="text-[#c8965a]" />
          <span className="text-sm font-semibold text-[#1a1008]">{isRTL ? 'كود الخصم' : 'Promo Code'}</span>
          {promo && (
            <span className="ml-auto text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
              {isRTL ? `خصم ${promo.pct * 100}%` : `${promo.pct * 100}% OFF`}
            </span>
          )}
        </div>
        {!promo ? (
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <input
              value={promoInput}
              onChange={e => setPromoInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applyPromo()}
              placeholder={isRTL ? 'SOFRA10' : 'SOFRA10'}
              className={`flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm
                         focus:outline-none focus:border-[#c8965a] transition-colors ${isRTL ? 'text-right' : ''}`}
            />
            <button onClick={applyPromo}
              className="px-4 py-2 bg-[#1a1008] text-white text-xs font-semibold rounded-xl
                         hover:bg-[#2a200a] transition-colors">
              {isRTL ? 'تطبيق' : 'Apply'}
            </button>
          </div>
        ) : (
          <div className={`flex items-center justify-between bg-green-50 rounded-xl px-3 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-green-700 text-sm font-semibold">{promo.code}</span>
            <button onClick={() => setPromo(null)} className="text-green-500 hover:text-red-400 transition-colors">
              <X size={14} />
            </button>
          </div>
        )}
        {promoErr && <p className="text-red-400 text-xs mt-1.5">{promoErr}</p>}
        <p className="text-stone-400 text-[11px] mt-2">{isRTL ? 'جرب: SOFRA10 أو WELCOME' : 'Try: SOFRA10 or WELCOME'}</p>
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between pt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Link to="/menu"
          className={`flex items-center gap-1.5 text-stone-400 hover:text-[#c8965a] text-sm transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
          {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {isRTL ? 'تابع التسوق' : 'Continue Shopping'}
        </Link>
        <button onClick={clearCart} className="text-stone-300 hover:text-red-400 text-xs transition-colors">
          {isRTL ? 'مسح السلة' : 'Clear cart'}
        </button>
      </div>

      <button onClick={onNext}
        className={`w-full mt-2 flex items-center justify-center gap-2 py-4 rounded-2xl
                   bg-[#c8965a] hover:bg-[#b5834a] active:scale-[.98] text-white
                   font-semibold tracking-wide transition-all duration-200 shadow-lg
                   shadow-[#c8965a]/25 hover:shadow-[#c8965a]/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {isRTL ? 'متابعة للتوصيل' : 'Continue to Delivery'}
        {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
      </button>
    </div>
  )
}
// ─── FIELD COMPONENT (خارج DeliveryStep تماماً) ──────────────────────────────
function Field({ name, label, icon: Icon, placeholder, type = 'text', value, onChange, error, isRTL }) {
  return (
    <div>
      <label className={`flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1.5
                         uppercase tracking-wider ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        <Icon size={11} />{label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border ${error ? 'border-red-300 bg-red-50/30' : 'border-stone-200 bg-white'}
                   rounded-xl px-4 py-3 text-sm text-[#1a1008]
                   focus:outline-none focus:border-[#c8965a] focus:ring-2 focus:ring-[#c8965a]/10
                   transition-all placeholder:text-stone-300 ${isRTL ? 'text-right' : ''}`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  )
}
// ─── STEP 2: DELIVERY INFO ────────────────────────────────────────────────────
function DeliveryStep({ form, setForm, isRTL, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = isRTL ? 'مطلوب' : 'Required'
    if (!form.phone.trim())   e.phone   = isRTL ? 'مطلوب' : 'Required'
    if (!form.address.trim()) e.address = isRTL ? 'مطلوب' : 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }



  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] space-y-4">
        <h3 className={`font-display font-bold text-[#1a1008] text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <MapPin size={16} className="text-[#c8965a]" />
          {isRTL ? 'بيانات التوصيل' : 'Delivery Details'}
        </h3>

        <Field name="name"    label={isRTL ? 'الاسم' : 'Full Name'}    icon={User}     placeholder={isRTL ? 'أحمد محمد' : 'John Doe'}                               value={form.name}    onChange={e => setForm(p => ({ ...p, name:    e.target.value }))} error={errors.name}    isRTL={isRTL} />
<Field name="phone"   label={isRTL ? 'الهاتف' : 'Phone'}       icon={Phone}    placeholder="+20 10X XXX XXXX" type="tel"                                    value={form.phone}   onChange={e => setForm(p => ({ ...p, phone:   e.target.value }))} error={errors.phone}   isRTL={isRTL} />
<Field name="address" label={isRTL ? 'العنوان' : 'Address'}    icon={MapPin}   placeholder={isRTL ? 'الشارع، المبنى، الدور' : 'Street, Building, Floor'}    value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} error={errors.address} isRTL={isRTL} />
<Field name="notes"   label={isRTL ? 'ملاحظات' : 'Notes'}      icon={Sparkles} placeholder={isRTL ? 'ملاحظات للمندوب (اختياري)' : 'Notes for driver (optional)'} value={form.notes}   onChange={e => setForm(p => ({ ...p, notes:   e.target.value }))} error={errors.notes}   isRTL={isRTL} />
   </div>

      {/* Delivery type */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h4 className={`text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 ${isRTL ? 'text-right' : ''}`}>
          {isRTL ? 'نوع التوصيل' : 'Delivery Type'}
        </h4>
        <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'direction-rtl' : ''}`}>
          {[
            { val: 'delivery', icon: Bike,         label: isRTL ? 'توصيل' : 'Delivery', sub: '30–45 min' },
            { val: 'pickup',   icon: ShoppingBag,  label: isRTL ? 'استلام' : 'Pickup',   sub: '15–20 min' },
          ].map(opt => (
            <button key={opt.val}
              onClick={() => setForm(p => ({ ...p, type: opt.val }))}
              className={`flex flex-col items-center gap-1.5 py-4 rounded-xl border-2 transition-all ${
                form.type === opt.val
                  ? 'border-[#c8965a] bg-[#c8965a]/5'
                  : 'border-stone-200 hover:border-stone-300'
              }`}>
              <opt.icon size={20} className={form.type === opt.val ? 'text-[#c8965a]' : 'text-stone-400'} />
              <span className={`font-semibold text-sm ${form.type === opt.val ? 'text-[#c8965a]' : 'text-stone-600'}`}>
                {opt.label}
              </span>
              <span className="text-[11px] text-stone-400">{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={handleNext} isRTL={isRTL}
        nextLabel={isRTL ? 'متابعة للدفع' : 'Continue to Payment'} />
    </div>
  )
}

// ─── STEP 3: PAYMENT ──────────────────────────────────────────────────────────
function PaymentStep({ payment, setPayment, grandTotal, isRTL, onNext, onBack, items, form }) {
  const METHODS = [
    { val: 'cash',      icon: Banknote,       label: isRTL ? 'كاش عند التسليم' : 'Cash on Delivery' },
    { val: 'card',      icon: CreditCard,     label: isRTL ? 'بطاقة ائتمان' : 'Credit / Debit Card' },
    { val: 'whatsapp',  icon: MessageCircle,  label: isRTL ? 'إتمام عبر واتساب' : 'Order via WhatsApp' },
  ]

  const whatsappLines = items.map(i => `• ${i.name} x${i.qty} — ${fmt(parsePrice(i.price) * i.qty)}`).join('\n')
  const whatsappMsg   = encodeURIComponent(
    `🍽️ ${isRTL ? 'طلب جديد من سُفرة' : 'New order from Sofra'}:\n\n${whatsappLines}\n\n📍 ${form.address}\n📞 ${form.phone}\n\n💳 ${isRTL ? 'الإجمالي' : 'Total'}: ${fmt(grandTotal)}`
  )
  const whatsappUrl = `https://wa.me/201090385390?text=${whatsappMsg}`

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Payment methods */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className={`font-display font-bold text-[#1a1008] text-base mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <CreditCard size={16} className="text-[#c8965a]" />
          {isRTL ? 'طريقة الدفع' : 'Payment Method'}
        </h3>
        <div className="space-y-2">
          {METHODS.map(m => (
            <button key={m.val}
              onClick={() => setPayment(p => ({ ...p, method: m.val }))}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all
                         ${isRTL ? 'flex-row-reverse text-right' : ''} ${
                payment.method === m.val
                  ? 'border-[#c8965a] bg-[#c8965a]/5'
                  : 'border-stone-200 hover:border-stone-300'
              }`}>
              <m.icon size={18} className={payment.method === m.val ? 'text-[#c8965a]' : 'text-stone-400'} />
              <span className={`font-semibold text-sm flex-1 ${payment.method === m.val ? 'text-[#1a1008]' : 'text-stone-600'}`}>
                {m.label}
              </span>
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                payment.method === m.val ? 'border-[#c8965a] bg-[#c8965a]' : 'border-stone-300'
              }`}>
                {payment.method === m.val && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card fields */}
      {payment.method === 'card' && (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] space-y-3 animate-fade-in">
          <div className="h-32 bg-gradient-to-br from-[#1a1008] to-[#3a2810] rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-3 right-4 flex gap-1">
              <div className="w-7 h-7 rounded-full bg-[#c8965a]/70" />
              <div className="w-7 h-7 rounded-full bg-[#e6b880]/50 -ml-3" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/30 text-[10px] tracking-widest mb-1">CARD NUMBER</p>
              <p className="text-white font-mono text-sm tracking-[0.25em]">
                {payment.cardNum ? payment.cardNum.replace(/(\d{4})/g,'$1 ').trim() : '•••• •••• •••• ••••'}
              </p>
            </div>
          </div>
          {[
            { key: 'cardNum',  label: isRTL ? 'رقم البطاقة' : 'Card Number', ph: '1234 5678 9012 3456', maxLen: 16 },
            { key: 'expiry',   label: isRTL ? 'تاريخ الانتهاء' : 'Expiry',   ph: 'MM/YY',              maxLen: 5  },
            { key: 'cvv',      label: 'CVV',                                  ph: '•••',                maxLen: 3  },
          ].map(f => (
            <div key={f.key}>
              <label className={`text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-1 ${isRTL ? 'text-right' : ''}`}>
                {f.label}
              </label>
              <input
                maxLength={f.maxLen}
                placeholder={f.ph}
                value={payment[f.key] || ''}
                onChange={e => setPayment(p => ({ ...p, [f.key]: e.target.value }))}
                className={`w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#c8965a] transition-colors font-mono ${isRTL ? 'text-right' : ''}`}
              />
            </div>
          ))}
          <p className="text-[10px] text-stone-400 text-center">
            {isRTL ? '🔒 بيانات البطاقة محمية ومشفرة' : '🔒 Card details are encrypted & secure'}
          </p>
        </div>
      )}

      {/* WhatsApp CTA */}
      {payment.method === 'whatsapp' && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-fade-in">
          <p className={`text-sm text-green-700 mb-3 ${isRTL ? 'text-right' : ''}`}>
            {isRTL
              ? 'سيتم فتح واتساب مع تفاصيل طلبك جاهزة للإرسال.'
              : 'WhatsApp will open with your order details ready to send.'}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600
                       text-white py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5
                       shadow-lg shadow-green-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MessageCircle size={16} />
            {isRTL ? 'أكمل الطلب عبر واتساب' : 'Complete Order via WhatsApp'}
          </a>
        </div>
      )}

      <NavButtons
        onBack={onBack}
        onNext={payment.method !== 'whatsapp' ? onNext : null}
        isRTL={isRTL}
        nextLabel={isRTL ? 'تأكيد الطلب' : 'Place Order'}
        nextClass="bg-[#1a1008] hover:bg-[#2a2010] shadow-[#1a1008]/20"
      />
    </div>
  )
}

// ─── STEP 4: CONFIRMATION ─────────────────────────────────────────────────────
function ConfirmStep({ grandTotal, form, payment, isRTL, clearCart }) {
  const METHOD_LABELS = {
    cash:      isRTL ? 'كاش عند التسليم' : 'Cash on Delivery',
    card:      isRTL ? 'بطاقة ائتمان' : 'Credit Card',
    whatsapp:  isRTL ? 'واتساب' : 'WhatsApp',
  }
  const orderNum = `SF-${Date.now().toString().slice(-6)}`

  return (
    <div className="text-center animate-fade-in">
      {/* Success icon */}
      <div className="relative inline-flex mb-6">
        <div className="w-24 h-24 rounded-full bg-[#c8965a]/10 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#c8965a] flex items-center justify-center shadow-xl shadow-[#c8965a]/30">
            <CheckCircle2 size={32} className="text-white" />
          </div>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#c8965a]/20 animate-ping" />
      </div>

      <h2 className="font-display text-2xl font-bold text-[#1a1008] mb-2">
        {isRTL ? '🎉 تم استلام طلبك!' : '🎉 Order Placed!'}
      </h2>
      <p className="text-stone-500 text-sm mb-1">
        {isRTL ? 'رقم الطلب:' : 'Order #'} <span className="font-bold text-[#c8965a]">{orderNum}</span>
      </p>
      <p className="text-stone-400 text-xs mb-8">
        {isRTL ? 'ستصلك رسالة تأكيد على هاتفك.' : 'A confirmation will be sent to your phone.'}
      </p>

      {/* Summary card */}
      <div className={`bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-6 text-left ${isRTL ? 'text-right' : ''}`}>
        <div className="space-y-3">
          {[
            { icon: User,        label: isRTL ? 'الاسم'        : 'Name',     val: form.name     },
            { icon: Phone,       label: isRTL ? 'الهاتف'       : 'Phone',    val: form.phone    },
            { icon: MapPin,      label: isRTL ? 'العنوان'      : 'Address',  val: form.address  },
            { icon: CreditCard,  label: isRTL ? 'الدفع'        : 'Payment',  val: METHOD_LABELS[payment.method] },
            { icon: Clock,       label: isRTL ? 'الوقت المتوقع': 'Est. Time', val: form.type === 'pickup' ? '15–20 min' : '30–45 min' },
          ].map(row => (
            <div key={row.label} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <row.icon size={14} className="text-[#c8965a] mt-0.5 flex-shrink-0" />
              <span className="text-xs text-stone-400 w-20 flex-shrink-0">{row.label}</span>
              <span className="text-xs font-semibold text-[#1a1008] flex-1">{row.val}</span>
            </div>
          ))}
          <div className={`border-t border-stone-100 pt-3 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold text-[#1a1008] text-sm">{isRTL ? 'الإجمالي' : 'Total'}</span>
            <span className="font-display font-bold text-[#c8965a] text-xl">{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Delivery tracker strip */}
      <div className={`flex items-center justify-between bg-[#1a1008] rounded-2xl px-5 py-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {[
          { icon: CheckCircle2, label: isRTL ? 'تأكيد' : 'Confirmed', done: true  },
          { icon: Sparkles,     label: isRTL ? 'تحضير' : 'Preparing', done: false },
          { icon: Bike,         label: isRTL ? 'في الطريق' : 'On Way', done: false },
          { icon: CheckCircle2, label: isRTL ? 'وصل' : 'Delivered',   done: false },
        ].map((s, i, arr) => (
          <div key={i} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex flex-col items-center gap-1">
              <s.icon size={16} className={s.done ? 'text-[#c8965a]' : 'text-white/25'} />
              <span className={`text-[9px] ${s.done ? 'text-[#c8965a]' : 'text-white/30'}`}>{s.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className={`w-6 h-[1px] mx-1 mb-3 ${i === 0 ? 'bg-[#c8965a]' : 'bg-white/15'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link to="/menu" onClick={clearCart}
          className="flex-1 py-3.5 rounded-2xl border-2 border-[#c8965a] text-[#c8965a]
                     font-semibold text-sm hover:bg-[#c8965a]/5 transition-colors text-center">
          {isRTL ? 'طلب مجدداً' : 'Order Again'}
        </Link>
        <Link to="/"
          className="flex-1 py-3.5 rounded-2xl bg-[#1a1008] text-white
                     font-semibold text-sm hover:bg-[#2a2010] transition-colors text-center">
          {isRTL ? 'الرئيسية' : 'Back Home'}
        </Link>
      </div>
    </div>
  )
}

// ─── NAV BUTTONS ─────────────────────────────────────────────────────────────
function NavButtons({ onBack, onNext, isRTL, nextLabel, nextClass = 'bg-[#c8965a] hover:bg-[#b5834a] shadow-[#c8965a]/25' }) {
  return (
    <div className={`flex gap-3 pt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <button onClick={onBack}
        className="flex-shrink-0 w-12 h-12 rounded-2xl border-2 border-stone-200
                   flex items-center justify-center text-stone-500
                   hover:border-[#c8965a] hover:text-[#c8965a] transition-all">
        {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
      </button>
      {onNext && (
        <button onClick={onNext}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl
                     text-white font-semibold tracking-wide transition-all duration-200
                     shadow-lg active:scale-[.98] ${nextClass} ${isRTL ? 'flex-row-reverse' : ''}`}>
          {nextLabel}
          {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      )}
    </div>
  )
}

// ─── MAIN CART PAGE ───────────────────────────────────────────────────────────
export default function Cart() {
  const { t, isRTL } = useLang()
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()

  const [step, setStep]         = useState('cart')
  const [promo, setPromo]       = useState(null)
  const [promoInput, setPromoInput] = useState('')
  const [form, setForm]         = useState({ name: '', phone: '', address: '', notes: '', type: 'delivery' })
  const [payment, setPayment]   = useState({ method: 'cash', cardNum: '', expiry: '', cvv: '' })
  const topRef = useRef(null)

  const deliveryFee  = totalPrice > 30 ? 0 : 4.99
  const promoSaving  = promo ? totalPrice * promo.pct : 0
  const grandTotal   = totalPrice - promoSaving + (form.type === 'pickup' ? 0 : deliveryFee)

  const goStep = (s) => {
    setStep(s)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isConfirm = step === 'confirm'

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#faf8f5]" dir={t.dir}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease forwards; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(200,150,90,0.3); border-radius: 4px; }
      `}</style>

      <div ref={topRef} className="container-pad max-w-5xl">
        {/* Page title */}
        <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <ShoppingBag size={22} className="text-[#c8965a]" />
          <h1 className="font-display text-2xl font-bold text-[#1a1008]">
            {isRTL ? 'السلة' : 'Your Cart'}
            {items.length > 0 && !isConfirm && (
              <span className="ml-2 text-sm font-normal text-stone-400">({items.length} {isRTL ? 'أصناف' : 'items'})</span>
            )}
          </h1>
        </div>

        {/* Empty state */}
        {items.length === 0 && step === 'cart' ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="font-display text-2xl font-bold text-[#1a1008] mb-2">
              {isRTL ? 'سلتك فارغة' : 'Your cart is empty'}
            </h2>
            <p className="text-stone-400 mb-8">{isRTL ? 'أضف أصنافاً من القائمة' : 'Add some items from the menu'}</p>
            <Link to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c8965a] text-white
                         rounded-full font-semibold hover:bg-[#b5834a] transition-colors">
              {isRTL ? 'استعرض القائمة' : 'Browse Menu'}
            </Link>
          </div>
        ) : (
          <>
            {/* Stepper */}
            {!isConfirm && <Stepper step={step} isRTL={isRTL} />}

            <div className={`grid ${isConfirm ? '' : 'md:grid-cols-3'} gap-8`}>
              {/* Main content */}
              <div className={isConfirm ? 'max-w-lg mx-auto w-full' : 'md:col-span-2'}>
                {step === 'cart' && (
                  <CartStep
                    items={items} removeItem={removeItem} updateQty={updateQty} clearCart={clearCart}
                    totalPrice={totalPrice} promo={promo} setPromo={setPromo}
                    promoInput={promoInput} setPromoInput={setPromoInput}
                    isRTL={isRTL} onNext={() => goStep('delivery')}
                  />
                )}
                {step === 'delivery' && (
                  <DeliveryStep
                    form={form} setForm={setForm} isRTL={isRTL}
                    onNext={() => goStep('payment')} onBack={() => goStep('cart')}
                  />
                )}
                {step === 'payment' && (
                  <PaymentStep
                    payment={payment} setPayment={setPayment} grandTotal={grandTotal}
                    isRTL={isRTL} items={items} form={form}
                    onNext={() => goStep('confirm')} onBack={() => goStep('delivery')}
                  />
                )}
                {step === 'confirm' && (
                  <ConfirmStep
                    grandTotal={grandTotal} form={form} payment={payment}
                    isRTL={isRTL} clearCart={clearCart}
                  />
                )}
              </div>

              {/* Sidebar summary — hidden on confirm */}
              {!isConfirm && step !== 'cart' && (
                <div className="md:col-span-1">
                  <OrderSummary
                    items={items} totalPrice={totalPrice}
                    deliveryFee={form.type === 'pickup' ? 0 : deliveryFee}
                    grandTotal={grandTotal} promoSaving={promoSaving} isRTL={isRTL}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}