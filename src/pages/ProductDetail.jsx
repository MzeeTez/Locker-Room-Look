import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Truck, Shield, RefreshCw } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStore } from '../store'

// Mock product data - replace with Supabase
const mockProducts = [
  { 
    id: 1, 
    name: 'Los Angeles Lakers 2024 City Edition', 
    category: 'Basketball', 
    price: 120.00, 
    image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800',
    description: 'Official NBA Lakers City Edition jersey featuring premium materials and authentic team branding.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    rating: 4.5,
    reviews: 128,
    stock: 12
  },
  { 
    id: 2, 
    name: 'Team Name Away Jersey', 
    category: 'Football', 
    price: 51.50, 
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    description: 'High-quality away jersey with breathable fabric and official team crest.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 85,
    stock: 8
  }
]

export default function ProductDetail() {
  const { id } = useParams()
  const addToCart = useStore(state => state.addToCart)
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Simulate fetching product - replace with Supabase query
    // parseInt(id) is important as params are strings
    const foundProduct = mockProducts.find(p => p.id === parseInt(id))
    setProduct(foundProduct) // Will be 'undefined' if not found
    
    // Reset size/quantity when product changes
    setSelectedSize('')
    setQuantity(1)
  }, [id])

  // Handles both initial loading (product is null) and product not found (product is undefined)
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-4 text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Go Home
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Handler for add to cart button
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.')
      return
    }
    // Add the selected product, size, and quantity to the Zustand store
    addToCart({ ...product, selectedSize, quantity })
    // Optional: Show a "product added" toast/notification here
    alert('Product added to cart!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Product Image */}
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg shadow-lg aspect-square"
            />
          </div>

          {/* Product Info */}
          <div>
            <Link to={`/`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {product.category}
            </Link>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            
            {/* Price */}
            <p className="mt-4 text-3xl text-gray-900">${product.price.toFixed(2)}</p>

            {/* Rating */}
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="mt-6 text-base text-gray-700">{product.description}</p>

            {/* Sizes */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 border rounded-md text-sm font-medium
                      ${selectedSize === size 
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500' 
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="mt-2 block w-24 pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {/* Create options from 1 up to the stock, max of 10 */}
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">{product.stock} in stock</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Why Shop With Us?</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            <div className="flex">
              <Truck className="h-6 w-6 flex-shrink-0 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Fast Shipping</h3>
                <p className="mt-1 text-sm text-gray-600">Free 2-day shipping on all orders over $50.</p>
              </div>
            </div>
            <div className="flex">
              <Shield className="h-6 w-6 flex-shrink-0 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Secure Checkout</h3>
                <p className="mt-1 text-sm text-gray-600">Your payment information is 100% secure.</p>
              </div>
            </div>
            <div className="flex">
              <RefreshCw className="h-6 w-6 flex-shrink-0 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                <p className="mt-1 text-sm text-gray-600">30-day return policy, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}