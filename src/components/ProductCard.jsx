import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
        hovered ? 'shadow-lg scale-[1.02]' : ''
      }`}
    >
      <div className="relative bg-gray-100 aspect-[4/5] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            hovered ? 'scale-105' : ''
          }`}
        />
      </div>
      <div className="p-4 text-left">
        <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
