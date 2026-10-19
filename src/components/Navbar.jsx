import { Button } from "@/components/ui/button"
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { clearAuth, getStoredUser } from "@/lib/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { readStoredList } from "@/lib/store";

const Navbar = () => {
  const user = getStoredUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const refreshCounts = () => {
      const cart = readStoredList("kshop_cart");
      setCartCount(cart.length);
      setWishlistCount(readStoredList("kshop_wishlist").length);
    };
    refreshCounts();
    window.addEventListener("storage", refreshCounts);
    window.addEventListener("kshop:store", refreshCounts);
    return () => {
      window.removeEventListener("storage", refreshCounts);
      window.removeEventListener("kshop:store", refreshCounts);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const logout = () => {
    clearAuth();
    closeMenu();
    navigate("/", { replace: true });
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    closeMenu();
  };

  const navClass = (path) => `transition-colors ${location.pathname === path ? "text-cyan-300" : "hover:text-cyan-300"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11151d]/90 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" onClick={closeMenu} className="group flex items-center gap-2" aria-label="K-Shop home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-300 font-heading text-xl font-bold text-[#11151d] transition-transform group-hover:-rotate-6">K</span>
          <span className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">K<span className="text-cyan-300">-Shop</span></span>
        </Link>

        <form onSubmit={submitSearch} className="mx-5 hidden max-w-md flex-1 items-center rounded-full border border-white/15 bg-white/10 px-4 focus-within:border-cyan-300/70 md:flex" role="search">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" aria-label="Search products" className="h-10 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-400" />
        </form>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <ul className="flex items-center gap-7 text-sm font-semibold text-slate-300">
            <li><Link to="/" className={navClass("/")}>Home</Link></li>
            <li><Link to="/products" className={navClass("/products")}>Products</Link></li>
            {user && <li><Link to="/profile" className={navClass("/profile")}>Hello, <span className={location.pathname === "/profile" ? "text-cyan-300" : "text-cyan-300"}>{user.firstName || "User"}</span></Link></li>}
          </ul>
          <Link to="/cart" className="relative rounded-full p-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-cyan-300" aria-label="Shopping cart">
            <ShoppingCart size={19} />
            <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-[#11151d]">{cartCount}</span>
          </Link>
          <Link to="/wishlist" className="relative rounded-full p-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-cyan-300" aria-label="Wishlist"><Heart size={19} /><span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-[#11151d]">{wishlistCount}</span></Link>
          {user ? <Button onClick={logout} className="h-9 rounded-full bg-cyan-300 px-5 text-xs text-[#11151d] hover:bg-cyan-200">Logout</Button> : <Button onClick={() => navigate("/login")} className="h-9 rounded-full bg-cyan-300 px-5 text-xs text-[#11151d] hover:bg-cyan-200">Login</Button>}
        </nav>

        <button type="button" className="rounded-lg p-2 text-slate-200 transition-colors hover:bg-white/10 md:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && <nav id="mobile-navigation" className="border-t border-white/10 bg-[#11151d] px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
        <form onSubmit={submitSearch} className="mb-3 flex items-center rounded-full border border-white/15 bg-white/10 px-4 focus-within:border-cyan-300/70" role="search">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" aria-label="Search products" className="h-10 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-400" />
        </form>
        <ul className="space-y-1 text-sm font-semibold text-slate-300">
          <li><Link to="/" onClick={closeMenu} className={`block rounded-lg px-3 py-3 ${location.pathname === "/" ? "bg-white/10 text-cyan-300" : "hover:bg-white/10 hover:text-cyan-300"}`}>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu} className={`block rounded-lg px-3 py-3 ${location.pathname === "/products" ? "bg-white/10 text-cyan-300" : "hover:bg-white/10 hover:text-cyan-300"}`}>Products</Link></li>
          {user && <li><Link to="/profile" onClick={closeMenu} className={`block rounded-lg px-3 py-3 ${location.pathname === "/profile" ? "bg-white/10 text-cyan-300" : "hover:bg-white/10 hover:text-cyan-300"}`}>Hello, <span className="text-cyan-300">{user.firstName || "User"}</span></Link></li>}
          <li><Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 rounded-lg px-3 py-3 hover:bg-white/10 hover:text-cyan-300"><ShoppingCart size={18} /> Cart <span className="text-xs text-orange-300">({cartCount})</span></Link></li>
          <li><Link to="/wishlist" onClick={closeMenu} className="flex items-center gap-2 rounded-lg px-3 py-3 hover:bg-white/10 hover:text-cyan-300"><Heart size={18} /> Wishlist <span className="text-xs text-orange-300">({wishlistCount})</span></Link></li>
        </ul>
        <Button onClick={user ? logout : () => navigate("/login")} className="mt-3 h-10 w-full rounded-full bg-cyan-300 text-xs text-[#11151d] hover:bg-cyan-200">{user ? "Logout" : "Login"}</Button>
      </nav>}
    </header>
  )
}

export default Navbar
