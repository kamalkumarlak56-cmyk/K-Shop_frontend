import { useEffect, useState } from "react"
import { ArrowLeft, Check, Heart, Star, Truck } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { products } from "@/data/products"
import Footer from "@/components/Footer"
import { apiBaseUrl, authHeaders, getAccessToken } from "@/lib/auth"
import { readStoredList, saveStoredList } from "@/lib/store"

const specificationsFor = (product) => {
    const category = product.category
    if (category === "Smartphones") return { RAM: "8 GB", "Internal storage": "128 GB", Processor: "Octa-core 5G chipset", "Front camera": "16 MP", "Rear camera": "50 MP + ultra-wide", Display: "6.6 inch AMOLED, 120 Hz", Cooling: "Vapor chamber cooling", Charging: "67 W fast charging", Battery: "5,000 mAh", Connectivity: "Wi-Fi 6, Bluetooth 5.3, USB-C", Network: "4G / 5G" }
    if (["Laptops", "Computers"].includes(category)) return { RAM: "16 GB DDR5", Storage: "512 GB SSD", Processor: "Intel Core i7 / Ryzen 7", "Graphics card": "Integrated graphics", Display: "14 inch Full HD IPS", Battery: "Up to 10 hours", Connectivity: "Wi-Fi 6E, Bluetooth 5.3, USB-C", Ports: "USB-C, USB-A, HDMI" }
    if (category === "Tablets") return { RAM: "8 GB", Storage: "128 GB", Processor: "Octa-core tablet chipset", Display: "11 inch 2K display", "Front camera": "8 MP", "Rear camera": "13 MP", Battery: "8,000 mAh", Charging: "33 W fast charging", Connectivity: "Wi-Fi 6, Bluetooth 5.2, USB-C" }
    if (["Wearables"].includes(category)) return { Display: "AMOLED touch display", Storage: "4 GB", Battery: "Up to 7 days", Charging: "Magnetic fast charging", Connectivity: "Bluetooth 5.3, Wi-Fi", Sensors: "Heart rate, SpO2, sleep tracking", Resistance: "5 ATM water resistance" }
    if (["Audio", "Headphones"].includes(category)) return { Driver: "40 mm dynamic drivers", Battery: "Up to 40 hours", Charging: "USB-C fast charging", Connectivity: "Bluetooth 5.3, 3.5 mm audio", Microphone: "Dual noise-reduction microphones", Features: "Active noise cancellation" }
    if (["Earbuds", "EarPods", "Neckbands"].includes(category)) return { Driver: "12 mm dynamic drivers", Battery: "Up to 30 hours with case", Charging: "USB-C charging", Connectivity: "Bluetooth 5.3", Microphone: "Dual microphones per earbud", Resistance: "IPX4 splash resistance" }
    if (category === "Trimmers") return { Battery: "90 minutes cordless use", Charging: "USB-C fast charging", Blades: "Stainless steel precision blades", Settings: "20 length settings", Connectivity: "Cordless and wired operation", Resistance: "Washable head" }
    if (category === "Hair dryers") return { Power: "1800 W", Heat: "3 heat and 2 speed settings", Motor: "High-speed ionic motor", Cable: "1.8 m swivel cable", Features: "Cool-shot button and diffuser", Safety: "Overheat protection" }
    if (category === "Straighteners") return { Plates: "Ceramic floating plates", Temperature: "120-230 C adjustable", Heating: "30-second heat-up", Cable: "2 m swivel cable", Features: "Auto shut-off and heat protection", Voltage: "Universal voltage" }
    if (category === "Keypad phones") return { Display: "2.4 inch color display", Storage: "Up to 32 GB expandable", Battery: "1,450 mAh", Camera: "2 MP rear camera", Connectivity: "4G, Bluetooth, FM radio", SIM: "Dual SIM" }
    return { Connectivity: "Bluetooth and USB-C", Battery: "All-day battery", Compatibility: "Works with major devices", Warranty: "Two-year limited warranty", Included: "Device, cable, and quick-start guide" }
}

const ProductDetail = () => {
    const { productId } = useParams()
    const localProduct = products.find((item) => item.id === productId) || products[0]
    const [product, setProduct] = useState(localProduct)
    const [review, setReview] = useState({ rating: 5, comment: "" })
    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState("")
    const [isWishlisted, setIsWishlisted] = useState(() => readStoredList("kshop_wishlist").includes(productId))
    const navigate = useNavigate()

    useEffect(() => {
        const nextProduct = products.find((item) => item.id === productId) || products[0]
        setProduct(nextProduct)
        setIsWishlisted(readStoredList("kshop_wishlist").includes(productId))
        fetch(`${apiBaseUrl}/api/products/${nextProduct.id}`)
            .then((response) => response.ok ? response.json() : null)
            .then((data) => {
                if (data?.product) setProduct((current) => ({ ...current, ...data.product, id: data.product.slug || current.id }))
                if (data?.reviews) setReviews(data.reviews)
            })
            .catch(() => { })
    }, [productId])

    const addToCart = () => {
        if (!getAccessToken()) {
            navigate("/login", { state: { from: `/products/${product.id}` } })
            return
        }
        const cart = JSON.parse(localStorage.getItem("kshop_cart") || "[]")
        const existing = cart.find((item) => item.id === product.id)
        if (existing) existing.quantity += 1
        else cart.push({ ...product, quantity: 1 })
        saveStoredList("kshop_cart", cart)
        setMessage("Added one item to your cart.")
    }

    const toggleWishlist = () => {
        const wishlist = readStoredList("kshop_wishlist")
        const next = isWishlisted ? wishlist.filter((id) => id !== product.id) : [...new Set([...wishlist, product.id])]
        saveStoredList("kshop_wishlist", next)
        setIsWishlisted(!isWishlisted)
        setMessage(isWishlisted ? "Removed from your wishlist." : "Added to your wishlist.")
    }

    const submitReview = async (event) => {
        event.preventDefault()
        if (!getAccessToken()) return setMessage("Please log in to review this product.")
        try {
            const response = await fetch(`${apiBaseUrl}/api/products/${product.id}/reviews`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify(review) })
            const result = await response.json()
            setMessage(response.ok ? "Your review was submitted." : result.message || "You can review after buying this product.")
            if (response.ok) { setReview({ rating: 5, comment: "" }); setReviews((current) => [result.review, ...current]) }
        } catch { setMessage("Reviews are temporarily unavailable.") }
    }

    const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
    const specifications = specificationsFor(product)

    return <>
        <main className="bg-[#f7f8f6] px-5 pb-20 pt-[8rem] text-[#11151d] sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl"><Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-cyan-700"><ArrowLeft size={17} /> Back to shopping</Link>
                <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:p-12">
                    <div className="flex min-h-[26rem] items-center justify-center rounded-2xl bg-slate-100 p-8"><img src={product.image} alt={product.name} width="700" height="600" className="max-h-[30rem] h-full w-full object-contain mix-blend-multiply" /></div>
                    <div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{product.category}</p><h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">{product.name}</h1><div className="mt-5 flex items-center gap-3"><span className="flex items-center gap-1 text-orange-500"><Star size={17} fill="currentColor" /> {product.rating}</span><span className="text-sm text-slate-500">{product.reviewCount} ratings</span></div><p className="mt-6 text-3xl font-bold">${product.price.toLocaleString()} <span className="ml-2 text-base font-normal text-slate-400 line-through">${product.compareAt.toLocaleString()}</span></p><p className="mt-5 leading-7 text-slate-600">{product.description}</p><ul className="mt-6 space-y-3 text-sm text-slate-700">{product.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="text-cyan-600" size={17} /> {feature}</li>)}</ul><div className="mt-8 flex gap-3"><button type="button" onClick={addToCart} className="h-12 flex-1 rounded-full bg-cyan-300 px-7 text-sm font-bold hover:bg-cyan-200">Add to cart</button><button type="button" onClick={toggleWishlist} aria-label={isWishlisted ? "Remove product from wishlist" : "Add product to wishlist"} className={`flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors ${isWishlisted ? "border-pink-500 bg-pink-500" : "border-slate-200 bg-white text-slate-700 hover:border-pink-400 hover:text-pink-500"}`}><Heart size={20} fill={isWishlisted ? "currentColor" : "none"} /></button></div>{message && <p className="mt-4 text-sm font-semibold text-cyan-700">{message}</p>}<div className="mt-8 flex gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600"><Truck className="text-cyan-600" size={20} /> Free delivery and easy returns on eligible orders</div></div>
                </div>

                <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="specifications-title"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Product information</p><h2 id="specifications-title" className="mt-2 font-heading text-3xl font-bold">Specifications & features</h2><p className="mt-3 text-sm leading-6 text-slate-600">Everything you need to compare this product before buying.</p></div><dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{Object.entries(specifications).map(([label, value]) => <div key={label} className="border-b border-slate-100 pb-3"><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd></div>)}</dl></div></section>

                <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]" aria-labelledby="reviews-title"><div><h2 id="reviews-title" className="font-heading text-3xl font-bold">Ratings & reviews</h2><p className="mt-3 text-slate-600">Verified buyers can share what they think after an order is completed.</p>{reviews.length > 0 && <div className="mt-7 space-y-3">{reviews.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between"><strong>{item.userId?.firstName || "Verified buyer"}</strong><span className="text-orange-500">{"★".repeat(item.rating)}</span></div><p className="mt-3 text-sm text-slate-600">{item.comment}</p></article>)}</div>}<div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-bold">Write a review</h3><form onSubmit={submitReview} className="mt-4 space-y-4"><select value={review.rating} onChange={(event) => setReview({ ...review, rating: Number(event.target.value) })} className="rounded-lg border border-slate-200 p-3"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select><textarea value={review.comment} onChange={(event) => setReview({ ...review, comment: event.target.value })} required rows="4" placeholder="How is this product?" className="w-full rounded-lg border border-slate-200 p-3" /><button className="rounded-full bg-[#11151d] px-5 py-3 text-sm font-bold text-white">Submit review</button></form></div></div><div className="rounded-2xl bg-[#11151d] p-7 text-white"><p className="text-5xl font-bold">{product.rating}</p><div className="mt-3 flex text-orange-300">★★★★★</div><p className="mt-3 text-sm text-slate-400">Based on {product.reviewCount} verified ratings</p></div></section>
                {related.length > 0 && <section className="mt-16"><h2 className="font-heading text-3xl font-bold">You may also like</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.id} to={`/products/${item.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:-translate-y-1 hover:shadow-lg"><img src={item.image} alt={item.name} className="h-40 w-full object-contain mix-blend-multiply" /><p className="mt-3 font-bold">{item.name}</p><p className="mt-1 font-bold">${item.price.toLocaleString()}</p></Link>)}</div></section>}
            </div>
        </main><Footer /></>
}

export default ProductDetail
