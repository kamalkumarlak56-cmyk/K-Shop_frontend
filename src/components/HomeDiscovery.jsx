import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Sparkles, Star, Tag } from "lucide-react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"

const watchedIds = ["iphone-15", "airbook-14", "airpods-pro", "watch-ultra", "galaxy-tab-s9", "studio-one-headphones"]
const newLaunchIds = ["galaxy-s24", "oneplus-12", "creator-laptop", "galaxy-tab-s9", "airpods-pro", "action-cam", "zenbook-14", "max-headphones"]
const suggestionIds = ["pixel-pro-9", "zenbook-14", "quietbuds-pro", "fit-band-3", "protab-11", "usb-c-hub"]
const forYouIds = ["pixel-a-series", "thinkpad-e14", "read-tab", "soundcore-earbuds", "flex-neckband", "nokia-105", "chargehub-7", "home-mini", "orbit-controller", "luma-camera", "studio-mic", "powercore-20k"]

const spotlightBrands = [
  { name: "Samsung", category: "Smartphones", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=85" },
  { name: "Apple", category: "Laptops", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=700&q=85" },
  { name: "Sony", category: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85" },
  { name: "OnePlus", category: "Smartphones", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85" },
  { name: "Lenovo", category: "Laptops", image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=700&q=85" },
  { name: "JBL", category: "Earbuds", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85" },
]

const productByIds = (ids) => ids.map((id) => products.find((product) => product.id === id)).filter(Boolean)

const ProductMiniCard = ({ product }) => <Link to={`/products/${product.id}`} className="group min-w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-52"><div className="relative flex h-36 items-center justify-center overflow-hidden bg-slate-100 p-4"><span className="absolute left-3 top-3 z-10 rounded-full bg-[#11151d] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">{product.badge}</span><img src={product.image} alt={product.name} width="300" height="260" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /></div><div className="p-4"><p className="truncate text-[10px] font-bold uppercase tracking-wider text-cyan-700">{product.category}</p><h3 className="mt-1 truncate text-sm font-bold group-hover:text-cyan-700">{product.name}</h3><div className="mt-2 flex items-center gap-1 text-xs text-orange-500"><Star size={12} fill="currentColor" /> {product.rating}<span className="text-slate-400">({product.reviewCount})</span></div><p className="mt-2 font-bold">${product.price.toLocaleString()}</p></div></Link>

const ProductRail = ({ eyebrow, title, icon: Icon, items }) => <section className="mt-12" aria-labelledby={`${title.replaceAll(" ", "-").toLowerCase()}-title`}><div className="flex items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700"><Icon size={14} /> {eyebrow}</p><h2 id={`${title.replaceAll(" ", "-").toLowerCase()}-title`} className="mt-1 font-heading text-3xl font-bold">{title}</h2></div><Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-cyan-700">View more <ArrowUpRight size={14} /></Link></div><div className="hide-scrollbar mt-5 flex gap-4 overflow-x-auto pb-3">{items.map((product) => <ProductMiniCard key={product.id} product={product} />)}</div></section>

const NewLaunchSlider = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const activeProduct = items[activeIndex]

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % items.length), 3000)
    return () => window.clearInterval(timer)
  }, [items.length, paused])

  const move = (direction) => setActiveIndex((current) => (current + direction + items.length) % items.length)

  return <section className="mt-12" aria-labelledby="new-launches-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}><div className="flex items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700"><Sparkles size={14} /> Just landed · auto-slides every 3 seconds</p><h2 id="new-launches-title" className="mt-1 font-heading text-3xl font-bold">New launches</h2></div><Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-cyan-700">View more <ArrowUpRight size={14} /></Link></div><div key={activeProduct.id} className="relative mt-5 overflow-hidden rounded-3xl bg-[#11151d] animate-[slide-in_500ms_ease-out]"><Link to={`/products/${activeProduct.id}`} className="relative block h-72 sm:h-96"><img src={activeProduct.image} alt={activeProduct.name} width="900" height="600" className="h-full w-full object-cover opacity-70 transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#11151d] via-[#11151d]/30 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{activeProduct.category}</p><h3 className="mt-2 font-heading text-3xl font-bold sm:text-5xl">{activeProduct.name}</h3><div className="mt-3 flex items-center gap-4"><span className="text-2xl font-bold">${activeProduct.price.toLocaleString()}</span><span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-[#11151d]">New launch</span></div></div></Link><button type="button" onClick={() => move(-1)} aria-label="Previous launch" className="absolute right-20 top-5 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white hover:bg-black/40"><ArrowLeft size={16} /></button><button type="button" onClick={() => move(1)} aria-label="Next launch" className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white hover:bg-black/40"><ArrowRight size={16} /></button><div className="absolute bottom-5 right-5 flex gap-1.5 sm:right-9">{items.map((item, index) => <button key={item.id} type="button" aria-label={`Show ${item.name}`} onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-cyan-300" : "w-1.5 bg-white/50"}`} />)}</div></div></section>
}

const HomeDiscovery = () => {
  const watched = productByIds(watchedIds)
  const launches = productByIds(newLaunchIds)
  const suggestions = productByIds(suggestionIds)
  const forYou = productByIds(forYouIds)

  return <section className="bg-[#f7f8f6] px-5 py-8 text-[#11151d] sm:px-8 lg:px-10 lg:py-12"><div className="mx-auto max-w-7xl"><ProductRail eyebrow="Pick up where you left off" title="Recently watched" icon={Clock3} items={watched} /><NewLaunchSlider items={launches} /><ProductRail eyebrow="Made for your setup" title="Suggestions for you" icon={Tag} items={suggestions} /><section className="mt-14" aria-labelledby="spotlight-title"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Trusted names</p><h2 id="spotlight-title" className="mt-1 font-heading text-3xl font-bold">Brands in spotlight</h2></div><Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-cyan-700">Explore catalog <ArrowUpRight size={14} /></Link></div><div className="hide-scrollbar mt-5 grid grid-cols-2 gap-3 overflow-x-auto sm:grid-cols-3 lg:grid-cols-6">{spotlightBrands.map((brand) => <Link key={brand.name} to={`/products?brand=${encodeURIComponent(brand.name)}&category=${encodeURIComponent(brand.category)}`} className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg"><div className="h-24 overflow-hidden bg-slate-100"><img src={brand.image} alt={`${brand.name} ${brand.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-3"><p className="font-bold group-hover:text-cyan-700">{brand.name}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{brand.category}</p></div></Link>)}</div></section><section className="mt-14" aria-labelledby="for-you-title"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Curated for you</p><h2 id="for-you-title" className="mt-1 font-heading text-3xl font-bold">For you</h2></div><Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-cyan-700">See all <ArrowUpRight size={14} /></Link></div><div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{forYou.map((product) => <ProductMiniCard key={product.id} product={product} />)}</div></section></div></section>
}

export default HomeDiscovery
