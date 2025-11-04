import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useStore } from '../store'
import { shallow } from 'zustand/shallow'

export default function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart, shallow)

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
    console.log(`${product.name} added to cart!`) // replace with toast later
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-2 left-2 bg-yellow-500 text-blue-900 text-xs font-bold px-2 py-1 rounded">
          {product.category}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate" title={product.name}>
          <Link to={`/product/${product.id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-blue-900">
            ${Number(product.price || 0).toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="p-2 bg-gray-100 rounded-full hover:bg-yellow-500 hover:text-blue-900 text-gray-600 transition"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
