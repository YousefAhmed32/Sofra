import Reservation from '../components/sections/Reservation'
import FAQ from '../components/sections/FAQ'

export default function ReservationPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="relative h-52 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Reservation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-pad pb-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">Reserve a Table</h1>
        </div>
      </div>
      <Reservation />
      <FAQ />
    </main>
  )
}
