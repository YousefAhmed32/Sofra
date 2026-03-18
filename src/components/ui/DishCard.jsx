import { useState } from 'react'
import { Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../context/LangContext'
import { TAG_COLORS } from '../../data/dishes'

// ─── Dish Card ────────────────────────────────────────────────────────────────
export default function DishCard({ dish }) {
  const { addToCart, getQty } = useCart()
  const { t, isRTL } = useLang()
  const [hovered, setHovered] = useState(false)

  const qty      = getQty(dish.id)
  const tagColor = TAG_COLORS[dish.tag] || 'bg-[#c8965a]'

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(dish)
  }

  return (
    <article
      className="card group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={dish.name}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.img}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Bottom gradient */}
        <div className="img-overlay-bottom absolute inset-0" />

        {/* Tag badge */}
        {dish.tag && (
          <span
            className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md text-white ${tagColor}`}
          >
            {dish.tag}
          </span>
        )}

        {/* Cart count indicator */}
        {qty > 0 && (
          <span
            className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-6 h-6 rounded-full bg-[#c8965a] text-white text-xs flex items-center justify-center font-bold shadow-lg`}
          >
            {qty}
          </span>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAdd}
            className="bg-white text-[#1a1008] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-[#c8965a] hover:text-white transition-colors shadow-lg"
          >
            <Plus size={12} />
            {t.menuSection.addCart}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-start justify-between gap-2 mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="font-display font-semibold text-[#1a1008] text-base leading-tight">
            {dish.name}
          </h3>
          <span className="font-display text-[#c8965a] font-bold text-base whitespace-nowrap">
            {dish.price}
          </span>
        </div>

        <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
          {dish.desc}
        </p>

        {/* Add to cart — bottom */}
        <button
          onClick={handleAdd}
          className={`mt-3 flex items-center gap-1.5 text-[#c8965a] text-xs font-semibold hover:text-[#a8763a] transition-colors ${
            isRTL ? 'mr-auto flex-row-reverse' : ''
          }`}
        >
          <ShoppingCart size={12} />
          {t.menuSection.addCart}
        </button>
      </div>
    </article>
  )
}
