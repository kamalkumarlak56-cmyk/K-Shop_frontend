import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Footer from "@/components/Footer"
import { apiBaseUrl, authHeaders } from "@/lib/auth"
import { saveStoredList } from "@/lib/store"

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("kshop_cart") || "[]"))
  const update = (id, quantity) => {
    const next = quantity > 0 ? cart.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0) : cart.filter((item) => item.id !== id)
    setCart(next); saveStoredList("kshop_cart", next)
  }
  const checkout = async () => {
    const response = await fetch(`${apiBaseUrl}/api/products/orders`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ items: cart.map(({ id, name, price, quantity }) => ({ productSlug: id, name, price, quantity })) }) })
    if (response.ok) { setCart([]); saveStoredList("kshop_cart", []) }
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <><main className="min-h-[70vh] bg-[#f7f8f6] px-5 pb-20 pt-[8rem] text-[#11151d] sm:px-8 lg:px-10"><div className="mx-auto max-w-5xl"><Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-cyan-700"><ArrowLeft size={17} /> Continue shopping</Link><h1 className="font-heading text-5xl font-bold">Your cart</h1>{cart.length === 0 ? <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center"><ShoppingBag className="mx-auto text-cyan-600" size={40} /><p className="mt-4 text-slate-600">Your cart is waiting for something great.</p><Link to="/" className="mt-6 inline-flex rounded-full bg-[#11151d] px-6 py-3 text-sm font-bold text-white">Shop products</Link></div> : <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]"><div className="space-y-4">{cart.map((item) => <div key={item.id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4"><img src={item.image} alt={item.name} className="size-24 rounded-xl bg-slate-100 object-contain mix-blend-multiply" /><div className="min-w-0 flex-1"><Link to={`/products/${item.id}`} className="font-bold hover:text-cyan-700">{item.name}</Link><p className="mt-1 text-sm text-slate-500">${item.price.toLocaleString()}</p><div className="mt-3 flex items-center gap-3"><button onClick={() => update(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={15} /></button><span>{item.quantity}</span><button onClick={() => update(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button><button onClick={() => update(item.id, 0)} className="ml-3 text-slate-400 hover:text-red-600" aria-label="Remove item"><Trash2 size={16} /></button></div></div><strong>${(item.price * item.quantity).toLocaleString()}</strong></div>)}</div><aside className="h-fit rounded-2xl bg-[#11151d] p-6 text-white"><h2 className="text-xl font-bold">Order summary</h2><div className="mt-6 flex justify-between border-b border-white/10 pb-4 text-sm text-slate-400"><span>Subtotal</span><span>${total.toLocaleString()}</span></div><div className="mt-5 flex justify-between text-xl font-bold"><span>Total</span><span>${total.toLocaleString()}</span></div><button onClick={checkout} className="mt-6 w-full rounded-full bg-cyan-300 py-3 text-sm font-bold text-[#11151d]">Checkout</button></aside></div>}</div></main><Footer /></>
}

export default Cart
