import OrderSection from '../components/sections/OrderSection'

export default function OrderPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="relative h-52 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1594007716099-a2c7b26cbf38?w=1600&q=80"
          alt="Order Online"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-pad pb-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">Order Online</h1>
        </div>
      </div>
      <OrderSection />
    </main>
  )
}
