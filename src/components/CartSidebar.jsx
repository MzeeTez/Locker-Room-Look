import { Link } from 'react-router-dom'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useStore } from '../store'

export default function CartSidebar({ showCart, setShowCart }) {
  const cart = useStore(state => state.cart)
  const updateQuantity = useStore(state => state.updateQuantity)
  const removeFromCart = useStore(state => state.removeFromCart)
  const getCartTotal = useStore(state => state.getCartTotal)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
            <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Shopping Cart ({cartItemsCount})</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-blue-800 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-blue-900 font-bold mb-2">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-900">${getCartTotal().toFixed(2)}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setShowCart(false)}
                  className="block w-full bg-yellow-500 text-blue-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition text-center"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}