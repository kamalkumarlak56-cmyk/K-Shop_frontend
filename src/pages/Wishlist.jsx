import { ArrowLeft, Heart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Footer from "@/components/Footer"
import { products } from "@/data/products"
import { readStoredList, saveStoredList } from "@/lib/store"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => [...new Set(readStoredList("kshop_wishlist"))])
  const items = wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean)
  const remove = (id) => {
    const next = wishlist.filter((itemId) => itemId !== id)
    setWishlist(next)
    saveStoredList("kshop_wishlist", next)
  }

  return <><main className="min-h-[70vh] bg-[#f7f8f6] px-5 pb-20 pt-[8rem] text-[#11151d] sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-cyan-700"><ArrowLeft size={17} /> Continue shopping</Link><div className="flex items-center gap-3"><Heart className="text-orange-500" fill="currentColor" size={30} /><h1 className="font-heading text-5xl font-bold">Wishlist</h1></div>{items.length === 0 ? <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center"><Heart className="mx-auto text-slate-300" size={42} /><p className="mt-4 text-slate-600">Save products here to find them later.</p><Link to="/products" className="mt-6 inline-flex rounded-full bg-[#11151d] px-6 py-3 text-sm font-bold text-white">Explore products</Link></div> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((product) => <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white"><Link to={`/products/${product.id}`} className="flex aspect-square items-center justify-center bg-slate-100 p-6"><img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" /></Link><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{product.category}</p><Link to={`/products/${product.id}`} className="mt-2 block font-bold hover:text-cyan-700">{product.name}</Link><div className="mt-4 flex items-center justify-between"><strong>${product.price.toLocaleString()}</strong><button type="button" onClick={() => remove(product.id)} aria-label={`Remove ${product.name} from wishlist`} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={17} /></button></div></div></article>)}</div>}</div></main><Footer /></>
}

export default Wishlist
