import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
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

  return (
    <>
      <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-white text-blue-900 w-8 h-8 rounded-full flex items-center justify-center">⚽</span>
                Jersey Shop
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                <Link to="/?category=football" className="hover:text-blue-200 transition">Football</Link>
                <Link to="/?category=basketball" className="hover:text-blue-200 transition">Basketball</Link>
                <Link to="/?category=baseball" className="hover:text-blue-200 transition">Baseball</Link>
                <Link to="/?sale=true" className="hover:text-blue-200 transition">Sale</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-blue-800 rounded-lg px-4 py-2">
                <Search className="w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder-blue-300 w-48"
                />
              </form>
              <Link to={user ? "/profile" : "/login"} className="p-2 hover:bg-blue-800 rounded-full transition">
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="p-2 hover:bg-blue-800 rounded-full transition relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-blue-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-blue-800 rounded-full transition"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <Link to="/" className="hover:text-blue-200 transition" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/?category=football" className="hover:text-blue-200 transition" onClick={() => setShowMobileMenu(false)}>Football</Link>
              <Link to="/?category=basketball" className="hover:text-blue-200 transition" onClick={() => setShowMobileMenu(false)}>Basketball</Link>
              <Link to="/?category=baseball" className="hover:text-blue-200 transition" onClick={() => setShowMobileMenu(false)}>Baseball</Link>
              <Link to="/?sale=true" className="hover:text-blue-200 transition" onClick={() => setShowMobileMenu(false)}>Sale</Link>
              <form onSubmit={handleSearch} className="flex items-center bg-blue-800 rounded-lg px-4 py-2 mt-2">
                <Search className="w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder-blue-300 w-full"
                />
              </form>
            </nav>
          )}
        </div>
      </header>

      <CartSidebar showCart={showCart} setShowCart={setShowCart} />
    </>
  )
}