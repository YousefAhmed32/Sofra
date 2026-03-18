import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { t, isRTL } = useLang()
  const { items, removeItem, updateQty, clearCart, totalPrice, totalItems } = useCart()
  const c = t.cart

  const deliveryFee = totalPrice > 30 ? 0 : 4.99
  const grandTotal  = totalPrice + deliveryFee

  const whatsappLines = items.map(i => `• ${i.name} x${i.qty} — ${i.price}`).join('\n')
  const whatsappMsg   = encodeURIComponent(
    `Hello Sofra! I'd like to order:\n${whatsappLines}\n\nTotal: $${grandTotal.toFixed(2)}`
  )
  const whatsappUrl = `https://wa.me/201090385390?text=${whatsappMsg}`

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#faf8f5]" dir={t.dir}>
      <div className="container-pad max-w-4xl">
        {/* Page title */}
        <div className={`flex items-center gap-3 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <ShoppingBag size={24} className="text-[#c8965a]" />
          <h1 className="font-display text-3xl font-bold text-[#1a1008]">
            {c.title}
            {totalItems > 0 && (
              <span className="ml-2 text-base font-normal text-stone-400">({totalItems})</span>
            )}
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="font-display text-2xl font-bold text-[#1a1008] mb-2">{c.empty}</h2>
            <p className="text-stone-400 mb-8">{c.emptyDesc}</p>
            <Link to="/menu" className="btn-primary">
              {c.browseMenu}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className={`card flex gap-4 p-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-start justify-between gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h4 className="font-display font-semibold text-[#1a1008] text-sm leading-tight">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label={c.remove}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p className="text-stone-400 text-xs mb-3 line-clamp-1">{item.desc}</p>

                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {/* Qty controls */}
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center hover:border-[#c8965a] hover:text-[#c8965a] transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-semibold text-[#1a1008] w-6 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-[#c8965a] flex items-center justify-center text-white hover:bg-[#a8763a] transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Line price */}
                      <span className="font-display font-bold text-[#c8965a] text-base">
                        ${(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <div className={`flex items-center gap-4 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  to="/menu"
                  className={`flex items-center gap-1.5 text-stone-400 hover:text-[#c8965a] text-sm transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <ArrowLeft size={14} className={isRTL ? 'rotate-180' : ''} />
                  {c.continueShopping}
                </Link>
                <button
                  onClick={clearCart}
                  className="text-stone-300 hover:text-red-400 text-xs transition-colors ml-auto"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <div className={`card p-6 sticky top-28 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-display font-bold text-[#1a1008] text-lg mb-5">
                  {isRTL ? 'ملخص الطلب' : 'Order Summary'}
                </h3>

                <div className="space-y-3 mb-5">
                  <div className={`flex justify-between text-sm text-stone-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{c.subtotal}</span>
                    <span className="font-medium text-[#1a1008]">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between text-sm text-stone-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{c.delivery}</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-[#1a1008]'}`}>
                      {deliveryFee === 0 ? c.free : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-[#c8965a]">
                      {isRTL ? 'أضف $' + (30 - totalPrice).toFixed(2) + ' للتوصيل المجاني' : `Add $${(30 - totalPrice).toFixed(2)} for free delivery`}
                    </p>
                  )}
                  <div className="border-t border-stone-100 pt-3">
                    <div className={`flex justify-between font-bold text-[#1a1008] text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{c.total}</span>
                      <span className="text-[#c8965a] font-display">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} />
                  {c.checkout}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
