import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X, Heart } from 'lucide-react'
import { useStore } from '../store'
import CartSidebar from './CartSidebar'

export default function Navbar() {
  const [showCart, setShowCart] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cart = useStore(state => state.cart)
  const user = useStore(state => state.user)
  const navigate = useNavigate()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`)
    }
  }

  // Use the exact dark blue color from the screenshot
  return (
    <>
      <header className="bg-[#0A192F] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                <span className="text-lime-400">⚽</span> {/* Added emoji for style */}
                Jersey Shop
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link to="/?category=teams" className="text-gray-300 hover:text-white transition">Teams</Link>
                <Link to="/?category=leagues" className="text-gray-300 hover:text-white transition">Leagues</Link>
                <Link to="/?new=true" className="text-gray-300 hover:text-white transition">New Arrivals</Link>
                <Link to="/?sale=true" className="text-gray-300 hover:text-white transition">On Sale</Link>
              </nav>
            </div>

            {/* Search, Icons, and Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search jerseys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm w-48"
                />
              </form>
              
              <Link to={user ? "/profile" : "/login"} className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition" title="Account">
                <User className="w-5 h-5" />
              </Link>
              
              <Link to="/wishlist" className="hidden sm:block p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition" title="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setShowCart(!showCart)}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition relative"
                title="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-lime-400 text-blue-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-800 rounded-lg px-4 py-2 mt-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search jerseys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
                />
              </form>
              <Link to="/?category=teams" className="text-gray-300 hover:text-white transition" onClick={() => setShowMobileMenu(false)}>Teams</Link>
              <Link to="/?category=leagues" className="text-gray-300 hover:text-white transition" onClick={() => setShowMobileMenu(false)}>Leagues</Link>
              <Link to="/?new=true" className="text-gray-300 hover:text-white transition" onClick={() => setShowMobileMenu(false)}>New Arrivals</Link>
              <Link to="/?sale=true" className="text-gray-300 hover:text-white transition" onClick={() => setShowMobileMenu(false)}>On Sale</Link>
              <Link to="/wishlist" className="text-gray-300 hover:text-white transition" onClick={() => setShowMobileMenu(false)}>Wishlist</Link>
            </nav>
          )}
        </div>
      </header>

      <CartSidebar showCart={showCart} setShowCart={setShowCart} />
    </>
  )
}