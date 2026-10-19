import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"


const Hero = () => {
    return (
        <section className="relative isolate overflow-hidden bg-[#11151d] pt-[4.5rem] text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_42%,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_15%_90%,rgba(251,146,60,0.12),transparent_30%)]" />
            <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-20">
                <div className="max-w-2xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200"><Sparkles size={14} /> Curated tech, better prices</div>
                    <h1 className="font-heading text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Technology that <span className="text-cyan-300">moves</span> with you.</h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Discover thoughtful electronics, from pocket-sized powerhouses to workday essentials, selected to make every day a little smarter.</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link to="/products" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 text-sm font-semibold text-[#11151d] transition-colors hover:bg-cyan-200">Shop the collection <ArrowRight size={17} /></Link>
                        <Link to="/deals" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10">View today's deals</Link>
                    </div>
                    <div className="mt-12 flex gap-8 border-t border-white/10 pt-5 text-sm text-slate-400">
                        <span><strong className="block text-xl text-white">24h</strong> Fast dispatch</span>
                        <span><strong className="block text-xl text-white">4.9/5</strong> Customer rated</span>
                    </div>
                </div>
                <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none">
                    <div className="absolute size-[70%] rounded-full bg-cyan-300/15 blur-3xl" />
                    <div className="relative flex aspect-square w-full items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/40 backdrop-blur-sm">
                        <span className="absolute right-6 top-6 rounded-full border border-orange-300/40 bg-orange-300/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-200">New drop</span>
                        <img src="/heroimg.png" alt="Google Pixel smartphone in light sage green" width="560" height="560" fetchPriority="high" className="relative w-[74%] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)] transition-transform duration-700 hover:scale-105" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
