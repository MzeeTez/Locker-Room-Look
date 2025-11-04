import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

// You can later fetch this from an API or Firebase
const initialProducts = [
  { id: 1, name: 'Manchester United Home Jersey', price: 120, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400' },
  { id: 2, name: 'Real Madrid Away Jersey', price: 115, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400' },
  { id: 3, name: 'FC Barcelona Third Kit', price: 110, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
  { id: 4, name: 'Liverpool Home Jersey', price: 120, image: 'https://images.unsplash.com/photo-1600086828238-70a91b3944b5?w=400' },
  { id: 5, name: 'AC Milan Away Jersey', price: 110, image: 'https://images.unsplash.com/photo-1587398147684-e5c2e3414bff?w=400' },
  { id: 6, name: 'Argentina Home Jersey', price: 130, image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=400' },
  { id: 7, name: 'Arsenal Home Kit', price: 120, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
  { id: 8, name: 'Chelsea Third Kit', price: 110, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Simulate data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(initialProducts)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const featured = products.slice(0, 4)
  const arrivals = products.slice(4)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 text-lg animate-pulse">Loading Jerseys...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[65vh] bg-cover bg-center rounded-b-2xl overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511886921323-8E02848cb733?w=1200&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            The New Season Kits Are Here
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg mb-6">
            Discover the latest official jerseys from your favorite teams and leagues.
            Fresh designs, authentic quality.
          </p>
          <Link
            to="/shop"
            className="bg-lime-400 hover:bg-lime-300 text-blue-900 font-semibold px-6 py-3 rounded-md shadow-md transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Jerseys */}
      <ProductSection title="Featured Jerseys" products={featured} />

      {/* Promo Banner */}
      <PromoBanner />

      {/* New Arrivals */}
      <ProductSection title="New Arrivals" products={arrivals} />

      <Footer />
    </div>
  )
}

// Split sections into reusable sub-components
function ProductSection({ title, products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 w-full">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function PromoBanner() {
  return (
    <section className="bg-white py-16 my-8">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          20% Off All Premier League Jerseys
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Limited time offer! Grab your team’s kit before it’s too late. Use code:{' '}
          <span className="font-semibold text-blue-900">PREMIER20</span>
        </p>
        <Link
          to="/shop"
          className="bg-blue-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-semibold shadow-md transition transform hover:scale-105"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  )
}
