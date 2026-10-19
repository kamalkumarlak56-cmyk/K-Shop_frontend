import { useEffect, useState } from "react"
import { ArrowUpRight, LoaderCircle, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import { products as localProducts } from "@/data/products"
import { apiBaseUrl } from "@/lib/auth"

const normalizeProduct = (product, index) => ({
  id: product.slug || product._id || product.id || `product-${index}`,
  name: product.name || product.title || "Featured product",
  category: product.category || "Electronics",
  price: Number(product.price) || 0,
  compareAt: Number(product.compareAt || product.originalPrice) || null,
  image: product.image || product.imageUrl || "/heroimg.png",
  badge: product.badge || "Featured",
})

const HomeProduct = () => {
  const [products, setProducts] = useState(localProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/products`, { signal: controller.signal })
        if (!response.ok) throw new Error("Products endpoint unavailable")

        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.products
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 20).map(normalizeProduct))
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          // The current backend has no product route yet, so keep the storefront populated.
          setProducts(localProducts)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [])

  return (
    <section className="bg-[#f7f8f6] px-5 py-20 text-[#11151d] sm:px-8 lg:px-10 lg:py-28" aria-labelledby="featured-products-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">The edit</p>
            <h2 id="featured-products-title" className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Good tech, chosen well.</h2>
            <p className="mt-3 max-w-xl text-slate-600">A few customer favorites to get you started. New finds land here every week.</p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 transition-colors hover:text-cyan-700">Browse all products <ArrowUpRight size={17} /></Link>
        </div>

        {isLoading ? <div className="flex min-h-56 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-500"><LoaderCircle className="mr-2 animate-spin" size={20} /> Loading the latest picks</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <article key={product.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40">
            <div className="relative flex aspect-[1.05] items-center justify-center overflow-hidden bg-slate-100 p-6">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#11151d] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{product.badge}</span>
              <Link to={`/products/${product.id}`} aria-label={`View details for ${product.name}`} className="h-full w-full"><img src={product.image} alt={product.name} width="500" height="500" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /></Link>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{product.category}</p>
              <Link to={`/products/${product.id}`} className="mt-2 block text-lg font-bold hover:text-cyan-700">{product.name}</Link>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2"><span className="text-xl font-bold">${product.price.toLocaleString()}</span>{product.compareAt && <span className="text-sm text-slate-400 line-through">${product.compareAt.toLocaleString()}</span>}</div>
                <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`} className="flex size-10 items-center justify-center rounded-full bg-cyan-300 text-[#11151d] transition-colors hover:bg-cyan-200"><ShoppingBag size={17} /></Link>
              </div>
            </div>
          </article>)}
        </div>}
      </div>
    </section>
  )
}

export default HomeProduct
