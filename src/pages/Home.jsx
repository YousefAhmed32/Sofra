import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import MenuSection from '../components/sections/MenuSection'
import Offers from '../components/sections/Offers'
import Reservation from '../components/sections/Reservation'
import OrderSection from '../components/sections/OrderSection'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import LocationContact from '../components/sections/LocationContact'
import FAQ from '../components/sections/FAQ'
import CTABanner from '../components/sections/CTABanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <MenuSection limit={8} />
      <Offers />
      <Reservation />
      <OrderSection />
      <Gallery limit={8} />
      <Testimonials />
      <LocationContact />
      <FAQ />
      <CTABanner />
    </main>
  )
}
