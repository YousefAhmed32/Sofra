import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider, useLang } from './context/LangContext'
import { CartProvider } from './context/CartContext'

import Navbar  from './components/layout/Navbar'
import Footer  from './components/layout/Footer'

import Home        from './pages/Home'
import MenuPage    from './pages/Menu'
import GalleryPage from './pages/Gallery'
import About       from './pages/About'
import Contact     from './pages/Contact'
import ReservationPage from './pages/Reservation'
import OrderPage   from './pages/Order'
import Cart        from './pages/Cart'
import NotFound    from './pages/NotFound'

// Scroll to top on route change
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

// Root document dir/lang attr sync
function DirSync() {
  const { t } = useLang()
  useEffect(() => {
    document.documentElement.setAttribute('dir',  t.dir)
    document.documentElement.setAttribute('lang', t.lang)
  }, [t])
  return null
}

function AppShell() {
  return (
    <>
      <DirSync />
      <ScrollReset />
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />}           />
        <Route path="/menu"       element={<MenuPage />}       />
        <Route path="/gallery"    element={<GalleryPage />}    />
        <Route path="/about"      element={<About />}          />
        <Route path="/contact"    element={<Contact />}        />
        <Route path="/reservation"element={<ReservationPage />}/>
        <Route path="/order"      element={<OrderPage />}      />
        <Route path="/cart"       element={<Cart />}           />
        <Route path="*"           element={<NotFound />}       />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </LangProvider>
    </BrowserRouter>
  )
}
