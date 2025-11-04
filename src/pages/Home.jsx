import { useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store'

export default function Home() {
  const [searchParams] = useSearchParams()
  
  // FIX: Select each piece of state individually to prevent infinite loops
  const products = useStore(state => state.products)
  const categories = useStore(state => state.categories)
  const fetchProducts = useStore(state => state.fetchProducts)
  const fetchCategories = useStore(state => state.fetchCategories)
  const loading = useStore(state => state.loading)

  const searchQuery = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  // Fetch data on component mount
  // We can safely add the stable functions from Zustand to the array
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  // Memoize filtered products to avoid re-calculating on every render
  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (category) {
      // Assuming product.category is a string name that matches category.name
      // If product.category is an ID, you'd match on category.id
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    }
    return filtered
  }, [products, searchQuery, category])

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
        
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
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
          {categories.length > 0 ? (
            categories.map(cat => (
              <Link
                key={cat.id}
                to={`/?category=${cat.name.toLowerCase()}`}
                className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition"
              >
                <div className="aspect-square">
                  <img
                    src={cat.image} // Make sure your Supabase 'categories' table has an 'image' column
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    // Add a fallback image
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400/60a5fa/FFFFFF?text=Category'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Loading categories...</p>
          )}
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

