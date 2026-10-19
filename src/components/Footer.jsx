import { ArrowUpRight, AtSign, Globe2, Mail } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#11151d] px-5 py-14 text-white sm:px-8 lg:px-10" aria-labelledby="footer-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2" aria-label="K-Shop home">
              <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-300 font-heading text-xl font-bold text-[#11151d]">K</span>
              <span id="footer-title" className="font-heading text-2xl font-bold">K<span className="text-cyan-300">-Shop</span></span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Thoughtfully selected technology for work, play, and everything in between.</p>
            <div className="mt-6 flex gap-3"><a href="https://kshop.com" aria-label="K-Shop website" className="rounded-full border border-white/10 p-2.5 text-slate-300 hover:border-cyan-300 hover:text-cyan-300"><Globe2 size={17} /></a><a href="mailto:hello@kshop.com" aria-label="Email K-Shop" className="rounded-full border border-white/10 p-2.5 text-slate-300 hover:border-cyan-300 hover:text-cyan-300"><AtSign size={17} /></a></div>
          </div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">Explore</h2><ul className="mt-5 space-y-3 text-sm text-slate-400"><li><Link to="/products" className="hover:text-white">All products</Link></li><li><Link to="/deals" className="hover:text-white">Today&apos;s deals</Link></li><li><Link to="/profile" className="hover:text-white">My account</Link></li></ul></div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">Support</h2><ul className="mt-5 space-y-3 text-sm text-slate-400"><li><a href="mailto:hello@kshop.com" className="hover:text-white">Contact us</a></li><li><a href="mailto:hello@kshop.com" className="hover:text-white">Shipping & returns</a></li><li><a href="mailto:hello@kshop.com" className="hover:text-white">Help center</a></li></ul></div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">Stay in the loop</h2><p className="mt-5 text-sm leading-6 text-slate-400">Fresh launches and honest deals, occasionally.</p><a href="mailto:hello@kshop.com" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-300">hello@kshop.com <ArrowUpRight size={16} /></a><Mail className="mt-5 text-cyan-300" size={22} /></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 K-Shop. Built for better browsing.</p><p>Secure checkout · Fast dispatch · Human support</p></div>
      </div>
    </footer>
  )
}

export default Footer
