import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, SlidersHorizontal, Star } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import Footer from "@/components/Footer"
import { products } from "@/data/products"
import { todaysDeals } from "@/data/deals"

const categoryTiles = [
    { name: "All", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=85" },
    { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85" },
    { name: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=85" },
    { name: "Smart watches", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85" },
    { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85" },
    { name: "Earbuds", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85" },
    { name: "Neckbands", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=700&q=85" },
    { name: "Keypad phones", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=700&q=85" },
    { name: "Electronic gadgets", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=85" },
    { name: "Trimmers", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=700&q=85" },
    { name: "Straighteners", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=700&q=85" },
    { name: "Hair dryers", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=700&q=85" },
]

const brandShowcase = {
    Smartphones: [{ name: "Oppo", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=85", ids: ["pixel-pro-9", "pixel-a-series"] }, { name: "Vivo", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=85", ids: ["oneplus-12"] }, { name: "Realme", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=85", ids: ["pixel-a-series"] }, { name: "iQOO", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=85", ids: ["oneplus-12"] }, { name: "iPhone", image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=85", ids: ["iphone-15"] }, { name: "Samsung", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=500&q=85", ids: ["galaxy-s24"] }, { name: "Redmi", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=85", ids: ["pixel-a-series"] }],
    Laptops: [{ name: "Acer", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85", ids: ["airbook-14"] }, { name: "Asus", image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=85", ids: ["zenbook-14"] }, { name: "MacBook", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=500&q=85", ids: ["creator-laptop"] }, { name: "Apple", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=500&q=85", ids: ["creator-laptop"] }, { name: "HP", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85", ids: ["airbook-14"] }, { name: "Dell", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85", ids: ["thinkpad-e14"] }, { name: "Lenovo", image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=85", ids: ["thinkpad-e14"] }],
    Tablets: [{ name: "iPad", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=85", ids: ["read-tab"] }, { name: "Samsung Tab", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=85", ids: ["galaxy-tab-s9"] }, { name: "Lenovo Tab", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=85", ids: ["protab-11"] }, { name: "OnePlus Pad", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=85", ids: ["protab-11"] }],
    "Smart watches": [{ name: "Apple Watch", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=500&q=85", ids: ["watch-ultra"] }, { name: "Galaxy Watch", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=85", ids: ["fit-band-3"] }, { name: "Noise", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=500&q=85", ids: ["fit-band-3"] }],
    Headphones: [{ name: "Sony", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85", ids: ["studio-one-headphones", "max-headphones"] }, { name: "JBL", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=85", ids: ["max-headphones"] }, { name: "Bose", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85", ids: ["studio-one-headphones"] }],
    Earbuds: [{ name: "AirPods", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=85", ids: ["airpods-pro"] }, { name: "OnePlus Buds", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=85", ids: ["quietbuds-pro"] }, { name: "Realme Buds", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=85", ids: ["soundcore-earbuds"] }, { name: "JBL", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=85", ids: ["soundcore-earbuds"] }],
    Neckbands: [{ name: "OnePlus", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=85", ids: ["flex-neckband"] }, { name: "JBL", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=85", ids: ["flex-neckband"] }],
    "Keypad phones": [{ name: "Nokia", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=85", ids: ["nokia-105"] }, { name: "Samsung Guru", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=85", ids: ["nokia-105"] }],
    "Electronic gadgets": [{ name: "K-Shop essentials", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=85", ids: ["usb-c-hub", "chargehub-7", "craft-keyboard"] }],
}
const featuredDeals = todaysDeals.slice(0, 7).map((deal, index) => ({ ...deal, rating: (4.6 + (index % 4) * 0.1).toFixed(1), reviewCount: 86 + index * 37 }))

const ProductCard = ({ product }) => <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40">
    <Link to={`/products/${product.id}`} className="relative flex aspect-[1.05] items-center justify-center overflow-hidden bg-slate-100 p-6" aria-label={`View ${product.name}`}>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-[#11151d] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{product.badge}</span>
        <img src={product.image} alt={product.name} width="500" height="500" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
    </Link>
    <div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{product.category}</p><Link to={`/products/${product.id}`} className="mt-2 block text-lg font-bold hover:text-cyan-700">{product.name}</Link><div className="mt-3 flex items-center gap-1 text-xs text-orange-500"><Star size={14} fill="currentColor" /> {product.rating} <span className="text-slate-400">({product.reviewCount})</span></div><div className="mt-4 flex items-baseline gap-2"><span className="text-xl font-bold">${product.price.toLocaleString()}</span><span className="text-sm text-slate-400 line-through">${product.compareAt.toLocaleString()}</span></div></div>
</article>

const NewLaunches = () => {
    const launchIds = ["trim-pro", "silk-straightener", "airflow-dryer", "classic-watch", "smart-projector", "smart-scale"]
    const launches = launchIds.map((id) => products.find((product) => product.id === id)).filter(Boolean)
    return <section className="mt-10" aria-labelledby="catalog-new-launches-title"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Just landed</p><h2 id="catalog-new-launches-title" className="mt-1 font-heading text-2xl font-bold">New launches</h2></div><Link to="/products" className="text-xs font-bold text-slate-600 hover:text-cyan-700">View all</Link></div><div className="hide-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">{launches.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
}

const Products = () => {
    const [searchParams] = useSearchParams()
    const searchQuery = (searchParams.get("search") || "").trim().toLowerCase()
    const urlCategory = searchParams.get("category") || "All"
    const [selectedCategory, setSelectedCategory] = useState(urlCategory)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [activeDeal, setActiveDeal] = useState(0)
    const [isDealPaused, setIsDealPaused] = useState(false)
    const filteredProducts = useMemo(() => {
        const categoryName = selectedCategory === "Smart watches" ? "Wearables" : selectedCategory
        return products.filter((product) => {
            const matchesCategory = selectedCategory === "All" || product.category === categoryName || (selectedCategory === "Headphones" && product.category === "Audio") || (selectedCategory === "Electronic gadgets" && ["Accessories", "Smart home", "Gaming"].includes(product.category))
            const matchesBrand = !selectedBrand || selectedBrand.ids.includes(product.id)
            const matchesSearch = !searchQuery || `${product.name} ${product.category}`.toLowerCase().includes(searchQuery)
            return matchesCategory && matchesBrand && matchesSearch
        })
    }, [selectedCategory, selectedBrand, searchQuery])

    useEffect(() => {
        const category = searchParams.get("category") || "All"
        const brandName = searchParams.get("brand")
        const brand = brandName && brandShowcase[category]?.find((item) => item.name.toLowerCase() === brandName.toLowerCase())
        setSelectedCategory(category)
        setSelectedBrand(brand || null)
    }, [searchParams])

    useEffect(() => {
        if (isDealPaused) return undefined
        const timer = window.setInterval(() => setActiveDeal((current) => (current + 1) % featuredDeals.length), 3000)
        return () => window.clearInterval(timer)
    }, [isDealPaused])

    const showDeal = (direction) => {
        setActiveDeal((current) => (current + direction + featuredDeals.length) % featuredDeals.length)
    }

    const deal = featuredDeals[activeDeal]

    return <>
        <main className="bg-[#f7f8f6] px-5 pb-20 pt-[4.5rem] text-[#11151d] sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl">
            <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#11151d] text-white" aria-labelledby="catalog-deals-title" onMouseEnter={() => setIsDealPaused(true)} onMouseLeave={() => setIsDealPaused(false)}>
                <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Limited time · refreshes every 3 seconds</p><h2 id="catalog-deals-title" className="mt-2 font-heading text-3xl font-bold">Top deals today</h2></div><Link to="/deals" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">See all <ArrowUpRight size={16} /></Link></div>
                <div className="relative mt-5 min-h-[20rem] sm:min-h-[22rem]">
                    <div key={deal.id} className="grid h-full animate-[slide-in_500ms_ease-out] items-center gap-8 px-5 pb-6 pt-3 sm:grid-cols-[0.9fr_1.1fr] sm:px-8 sm:pb-8">
                        <Link to={`/products/${deal.id}`} className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-white sm:h-64" aria-label={`View ${deal.name}`}><span className="absolute left-4 top-4 z-10 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#11151d]">{deal.discount}</span><img src={deal.image} alt={deal.name} width="750" height="650" className="h-full w-full max-w-[750px] max-h-[650px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105" /></Link>
                        <div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{deal.category}</p><Link to={`/products/${deal.id}`} className="mt-2 font-heading text-3xl font-bold hover:text-cyan-300 sm:text-4xl">{deal.name}</Link><div className="mt-4 flex items-center gap-2 text-sm"><span className="flex items-center gap-1 text-orange-300"><Star size={16} fill="currentColor" /> {deal.rating}</span><span className="text-slate-400">({deal.reviewCount} reviews)</span></div><div className="mt-5 flex items-baseline gap-3"><span className="text-3xl font-bold">${deal.price.toLocaleString()}</span><span className="text-base text-slate-500 line-through">${deal.compareAt.toLocaleString()}</span></div><Link to={`/products/${deal.id}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-[#11151d] hover:bg-cyan-200">View deal <ArrowRight size={16} /></Link></div>
                    </div>
                    <button type="button" onClick={() => showDeal(-1)} aria-label="Previous deal" className="absolute bottom-7 right-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20"><ArrowLeft size={16} /></button><button type="button" onClick={() => showDeal(1)} aria-label="Next deal" className="absolute bottom-7 right-8 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20"><ArrowRight size={16} /></button>
                </div>
                <div className="flex justify-center gap-2 px-5 pb-6 sm:px-8">{featuredDeals.map((item, index) => <button key={item.id} type="button" onClick={() => setActiveDeal(index)} aria-label={`Show deal ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === activeDeal ? "w-8 bg-cyan-300" : "w-2 bg-white/30"}`} />)}</div>
            </section>

            <NewLaunches />

            <div className="mt-12 flex items-center gap-3 text-sm font-bold"><SlidersHorizontal size={18} className="text-cyan-700" /><span>Shop by category</span></div>
            <div className="hide-scrollbar mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-2">{categoryTiles.map((category) => <button type="button" key={category.name} onClick={() => { setSelectedCategory(category.name); setSelectedBrand(null) }} className={`group min-w-24 overflow-hidden rounded-lg border text-left transition-all sm:min-w-28 ${selectedCategory === category.name ? "border-cyan-500 ring-2 ring-cyan-200" : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg"}`}><div className="flex h-12 items-center justify-center overflow-hidden bg-slate-100 sm:h-14"><img src={category.image} alt={`${category.name} category`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><span className="block truncate px-2 py-1.5 text-[11px] font-bold sm:text-xs">{category.name}</span></button>)}</div>
            <section className="mt-8" aria-labelledby="suggestions-title"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Picked for you</p><h2 id="suggestions-title" className="mt-1 font-heading text-2xl font-bold">Suggestions for you</h2></div><Link to="/products" className="text-xs font-bold text-cyan-700 hover:text-cyan-900">Browse more</Link></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
            {brandShowcase[selectedCategory] && <section className="mt-8" aria-labelledby="brand-title"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Browse by brand</p><h2 id="brand-title" className="mt-1 font-heading text-2xl font-bold">{selectedCategory} brands</h2></div>{selectedBrand && <button type="button" onClick={() => setSelectedBrand(null)} className="text-xs font-bold text-cyan-700 hover:text-cyan-900">Show all brands</button>}</div><div className="mt-4 flex gap-3 overflow-x-auto pb-2">{brandShowcase[selectedCategory].map((brand) => <button type="button" key={brand.name} onClick={() => setSelectedBrand(brand)} className={`group min-w-24 overflow-hidden rounded-xl border bg-white text-left ${selectedBrand?.name === brand.name ? "border-cyan-500 ring-2 ring-cyan-200" : "border-slate-200 hover:border-cyan-400"}`}><div className="flex h-16 items-center justify-center overflow-hidden bg-slate-100"><img src={brand.image} alt={`${brand.name} products`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div><span className="block truncate px-2 py-2 text-xs font-bold">{brand.name}</span></button>)}</div></section>}
            <div className="mt-8 flex items-center justify-between"><h2 className="font-heading text-2xl font-bold">{searchQuery ? `Search results for "${searchParams.get("search")}"` : selectedBrand?.name || selectedCategory}</h2><span className="text-sm text-slate-500">{filteredProducts.length} products</span></div>{filteredProducts.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-5 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center"><h3 className="text-xl font-bold">No products found</h3><p className="mt-2 text-sm text-slate-500">We couldn&apos;t find a product matching &quot;{searchParams.get("search")}&quot;.</p><Link to="/products" className="mt-5 inline-flex rounded-full bg-[#11151d] px-5 py-3 text-sm font-bold text-white">Browse all products</Link></div>}
        </div></main><Footer /></>
}

export default Products
