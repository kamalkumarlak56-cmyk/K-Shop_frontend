import { ArrowUpRight, Clock3, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import { todaysDeals } from "@/data/deals"

const TodaysDeals = () => {
  return (
    <section className="overflow-hidden bg-[#11151d] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20" aria-labelledby="todays-deals-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300"><Clock3 size={15} /> Ending soon</div>
            <h2 id="todays-deals-title" className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Today&apos;s top deals</h2>
            <p className="mt-3 max-w-xl text-slate-400">Small prices, big upgrades. These offers are refreshed daily.</p>
          </div>
          <Link to="/deals" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-200">See all deals <ArrowUpRight size={17} /></Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-color:#334155_transparent]">
          {todaysDeals.slice(0, 5).map((deal) => <article key={deal.id} className="group min-w-[16rem] snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] sm:min-w-[18rem] lg:min-w-0 lg:flex-1">
            <div className="relative flex aspect-[1.15] items-center justify-center overflow-hidden bg-white p-5">
              <span className="absolute left-3 top-3 z-10 rounded-full bg-orange-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#11151d]">{deal.discount}</span>
              <Link to={`/products/${deal.id}`} aria-label={`View ${deal.name} details`} className="h-full w-full"><img src={deal.image} alt={deal.name} width="500" height="430" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /></Link>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">{deal.category}</p>
              <Link to={`/products/${deal.id}`} className="mt-1 block truncate font-bold hover:text-cyan-300">{deal.name}</Link>
              <div className="mt-3 flex items-center justify-between"><div><span className="text-lg font-bold">${deal.price.toLocaleString()}</span><span className="ml-2 text-xs text-slate-500 line-through">${deal.compareAt.toLocaleString()}</span></div><Link to="/cart" aria-label={`Add ${deal.name} to cart`} className="flex size-9 items-center justify-center rounded-full bg-cyan-300 text-[#11151d] hover:bg-cyan-200"><ShoppingBag size={15} /></Link></div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  )
}

export default TodaysDeals
