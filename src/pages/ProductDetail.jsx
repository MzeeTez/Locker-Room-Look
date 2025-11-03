import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store'

// Mock data - replace with Supabase data
const mockProducts = [
  { id: 1, name: 'Team Name Home Jersey 23/24', category: 'Football', price: 50.00, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400', stock: 10 },
  { id: 2, name: 'Team Name Away Jersey', category: 'Football', price: 51.50, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', stock: 8 },
  { id: 3, name: 'National Team Third Kit', category: 'Football', price: 25.00, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', stock: 15 },
  { id: 4, name: 'Baseball Team Special Edition Jersey', category: 'Baseball', price: 52.00, image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400', stock: 5 },
  { id: 5, name: 'Los Angeles Lakers 2024 City Edition', category: 'Basketball', price: 120.00, image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=400', stock: 12 },
  { id: 6, name: 'Chicago Bulls Classic Jersey', category: 'Basketball', price: 85.00, image: 'https://images.unsplash.com/photo-1587398147684-e5c2e3414bff?w=400', stock: 20 },
  { id: 7, name: 'New York Yankees Home Jersey', category: 'Baseball', price: 65.00, image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400', stock: 18 },
  { id: 8, name: 'Manchester United Home Kit', category: 'Football', price: 75.00, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400', stock: 25 }
]

const mockCategories = [
  { id: 1, name: 'Football', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
  { id: 2, name: 'Basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
  { id: 3, name: 'Baseball', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400' },
  { id: 4, name: 'Soccer', image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400' }
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  
  const searchQuery = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    let filtered = mockProducts

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    setFilteredProducts(filtered)
  }, [searchQuery, category])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Wear Your Pride
              </h2>
              <p className="text-xl text-blue-100">
                The Latest Kits are Here. Free shipping on all orders.
              </p>
              <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg">
                Shop Now
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600"
                alt="Featured Jersey"
                className="rounded-lg shadow-2xl max-w-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             category ? `${category} Jerseys` : 
             'Featured Products'}
          </h2>
          {(searchQuery || category) && (
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
              Clear Filters
            </Link>
          )}
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-white rounded-lg my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories.map(cat => (
            <Link
              key={cat.id}
              to={`/?category=${cat.name.toLowerCase()}`}
              className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition"
            >
              <div className="aspect-square">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">20% Off All Premier League Jerseys</h2>
          <p className="text-xl mb-6 text-blue-100">Limited time offer. Grab your favorite team's kit now!</p>
          <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg">
            Shop Sale
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}