import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStore } from '../store'

export default function Cart() {
  const cart = useStore(state => state.cart)
  const updateQuantity = useStore(state => state.updateQuantity)
  const removeFromCart = useStore(state => state.removeFromCart)
  const getCartTotal = useStore(state => state.getCartTotal)
  const clearCart = useStore(state => state.clearCart)

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    alert('Proceeding to checkout...')
    // Navigate to checkout page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <Link
              to="/"
              className="inline-block bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-semibold text-gray-800 hover:text-blue-600 block mb-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        {item.size && (
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        )}
                        <p className="text-lg font-bold text-blue-900 mt-2">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-200 rounded transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-200 rounded transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-bold text-gray-800 mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 italic">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-blue-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-500 text-blue-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="block w-full text-center text-blue-600 hover:text-blue-800 font-semibold py-2"
                >
                  Continue Shopping
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3 text-center">We accept</p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">VISA</div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">MASTERCARD</div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">AMEX</div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">PAYPAL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}