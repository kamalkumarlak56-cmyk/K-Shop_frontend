import { ArrowLeft, Clock3, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "@/components/Footer"
import { todaysDeals } from "@/data/deals"

const Deals = () => {
  return (
    <>
      <main className="bg-[#f7f8f6] px-5 pb-20 pt-[8rem] text-[#11151d] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-cyan-700"><ArrowLeft size={17} /> Back to home</Link>
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600"><Clock3 size={15} /> Limited-time offers</div>
            <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">Today&apos;s deals</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">The best prices we found today, gathered in one place. Grab your favorites before the clock resets.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {todaysDeals.map((deal) => <article key={deal.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40">
              <div className="relative flex aspect-[1.1] items-center justify-center overflow-hidden bg-slate-100 p-7">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-orange-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#11151d]">{deal.discount}</span>
                <Link to={`/products/${deal.id}`} aria-label={`View ${deal.name} details`} className="block h-full w-full"><img src={deal.image} alt={deal.name} width="500" height="450" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /></Link>
              </div>
              <div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{deal.category}</p><Link to={`/products/${deal.id}`} className="mt-2 block text-lg font-bold hover:text-cyan-700">{deal.name}</Link><div className="mt-4 flex items-center justify-between"><div><span className="text-xl font-bold">${deal.price.toLocaleString()}</span><span className="ml-2 text-sm text-slate-400 line-through">${deal.compareAt.toLocaleString()}</span></div><Link to="/cart" aria-label={`Add ${deal.name} to cart`} className="flex size-10 items-center justify-center rounded-full bg-cyan-300 text-[#11151d] transition-colors hover:bg-cyan-200"><ShoppingBag size={17} /></Link></div></div>
            </article>)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Deals
