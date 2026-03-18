import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Utensils, Globe, ShoppingCart, Menu, X } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { t, lang, toggleLang, isRTL } = useLang()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled, setScrolled]     = useState(false)
  const [scrollPct, setScrollPct]   = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartBump, setCartBump]     = useState(false)

  // Scroll position + progress bar
  useEffect(() => {
    const handler = () => {
      const y   = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      setScrolled(y > 60)
      setScrollPct(max > 0 ? Math.min((y / max) * 100, 100) : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  // Cart badge bump animation on item add
  const prevItems = useRef(totalItems)
  useEffect(() => {
    if (totalItems > prevItems.current) {
      setCartBump(true)
      const timer = setTimeout(() => setCartBump(false), 400)
      return () => clearTimeout(timer)
    }
    prevItems.current = totalItems
  }, [totalItems])

  // Focus first item when mobile drawer opens
  const drawerRef = useRef(null)
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll('a, button')
    focusable[0]?.focus()
  }, [mobileOpen])

  const navLinks = [
    { to: '/menu',    label: t.nav.menu    },
    { to: '/about',   label: t.nav.about   },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <>
      <style>{`
        @keyframes cartBump { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
        .cart-bump { animation: cartBump 0.35s ease; }
        .nav-link-item { position:relative; font-size:0.8rem; letter-spacing:0.03em; transition:color 0.2s; padding-bottom:3px; }
        .nav-link-item::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:#c8965a; border-radius:2px; transition:width 0.25s ease; }
        .nav-link-item.active::after { width:100%; }
      `}</style>

      {/* Scroll progress bar */}
      {scrolled && (
        <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#c8965a] to-[#e6b880] rounded-r transition-[width] duration-150"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      )}

      <nav
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-[2px] bg-[#1a1008]/97 backdrop-blur-md shadow-2xl py-3 border-b border-white/[0.06]'
            : 'top-0 bg-white/90 backdrop-blur-sm py-5 border-b border-stone-200/60'
        }`}
        dir={t.dir}
        aria-label="Main navigation"
      >
        <div className="container-pad flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Sofra home">
            <div className="w-9 h-9 rounded-full bg-[#c8965a] flex items-center justify-center
                            transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Utensils size={15} className="text-white" />
            </div>
            <span className={`font-display text-[1.35rem] font-bold tracking-wide leading-none transition-colors duration-500 ${
              scrolled ? 'text-white' : 'text-[#1a1008]'
            }`}>
              {isRTL ? 'سُفرة' : 'Sofra'}
            </span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden md:flex items-center gap-7 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active text-[#c8965a]' : ''} ${
                    !isActive && (scrolled
                      ? 'text-white/60 hover:text-black'
                      : 'text-stone-600 hover:text-[#1a1008]')
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest transition-all ${
                scrolled
                  ? 'border border-white/20 text-white/60 hover:text-white hover:border-white/45'
                  : 'border border-stone-300 text-stone-600 hover:text-[#1a1008] hover:border-stone-400'
              }`}
            >
              <Globe size={12} />
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              aria-label={`View cart, ${totalItems} items`}
              className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                cartBump ? 'cart-bump' : ''
              } ${
                scrolled
                  ? 'border border-white/20 text-white/60 hover:text-white hover:border-[#c8965a]'
                  : 'border border-stone-300 text-stone-600 hover:text-[#1a1008] hover:border-[#c8965a]'
              }`}
            >
              <ShoppingCart size={14} />
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full
                                 bg-[#c8965a] text-white text-[9px] font-bold
                                 flex items-center justify-center ring-2 ${
                                   scrolled ? 'ring-[#1a1008]' : 'ring-white'
                                 }`}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Book a table — desktop only */}
            <Link
              to="/reservation"
              className="hidden md:inline-flex items-center
                         px-5 py-2 rounded-full bg-[#c8965a] text-white
                         text-xs font-semibold tracking-wide
                         hover:bg-[#b5834a] active:scale-95 transition-all duration-200"
            >
              {t.nav.book}
            </Link>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                scrolled
                  ? 'border border-white/20 text-white/70 hover:text-[#c8965a] hover:border-[#c8965a]'
                  : 'border border-stone-300 text-stone-600 hover:text-[#c8965a] hover:border-[#c8965a]'
              }`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          ref={drawerRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="bg-[#1a1008] border-t border-white/8 px-6 pt-5 pb-7 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                tabIndex={mobileOpen ? 0 : -1}
                className={({ isActive }) =>
                  `text-[15px] py-3 border-b border-white/[0.06] transition-colors last:border-0 ${
                    isActive ? 'text-[#c8965a] font-medium' : 'text-white/65 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="flex gap-3 mt-5 items-center">
              <Link
                to="/reservation"
                tabIndex={mobileOpen ? 0 : -1}
                className="flex-1 text-center py-2.5 rounded-full bg-[#c8965a]
                           text-white text-sm font-semibold tracking-wide
                           hover:bg-[#b5834a] transition-colors"
              >
                {t.nav.book}
              </Link>
              <button
                onClick={toggleLang}
                tabIndex={mobileOpen ? 0 : -1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full
                           border border-white/20 text-white/60 text-xs font-semibold
                           hover:text-white hover:border-white/40 transition-all"
              >
                <Globe size={12} />
                {lang === 'en' ? 'عربي' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}