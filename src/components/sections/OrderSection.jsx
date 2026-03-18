import { Link } from 'react-router-dom'
import { MessageCircle, Plus, Minus, ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { useCart } from '../../context/CartContext'
import { dishes } from '../../data/dishes'
import SectionHeader from '../ui/SectionHeader'

export default function OrderSection() {
  const { t, lang, isRTL } = useLang()
  const { addToCart, updateQty, getQty, totalPrice } = useCart()
  const o = t.orderSection

  const deliveryDishes = (dishes[lang] || dishes.en).slice(0, 4)

  const whatsappMsg = encodeURIComponent(
    `Hello! I'd like to place an order. Total: $${totalPrice.toFixed(2)}`
  )
  const whatsappUrl = `https://wa.me/201090385390?text=${whatsappMsg}`

  return (
    <section id="order" className="section-light">
      <div className="container-pad">
        <SectionHeader badge={o.badge} title={o.title} sub={o.sub} />

        {/* Dish cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {deliveryDishes.map(dish => {
            const qty = getQty(dish.id)
            return (
              <div key={dish.id} className="card">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`flex justify-between items-start mb-1.5 gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-display font-semibold text-[#1a1008] text-sm leading-tight">{dish.name}</h4>
                    <span className="text-[#c8965a] font-bold text-sm font-display whitespace-nowrap">{dish.price}</span>
                  </div>
                  <p className="text-stone-400 text-xs mb-3 line-clamp-2">{dish.desc}</p>

                  {/* Qty controls */}
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={() => updateQty(dish.id, qty - 1)}
                      className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-[#c8965a] hover:text-[#c8965a] transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-semibold text-[#1a1008] min-w-[18px] text-center text-sm">
                      {qty}
                    </span>
                    <button
                      onClick={() => qty === 0 ? addToCart(dish) : updateQty(dish.id, qty + 1)}
                      className="w-7 h-7 rounded-full bg-[#c8965a] flex items-center justify-center text-white hover:bg-[#a8763a] transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom action bar */}
        <div className={`bg-[#1a1008] rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="font-display text-white text-xl font-bold mb-1">
              {totalPrice > 0 ? `${o.total}: $${totalPrice.toFixed(2)}` : o.title}
            </div>
            <div className="text-white/45 text-sm">{o.sub}</div>
          </div>

          <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              to="/cart"
              className="btn-outline border-white/30 text-white hover:bg-white hover:text-[#1a1008] text-sm"
            >
              <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
              {o.viewCart}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={16} />
              {o.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
