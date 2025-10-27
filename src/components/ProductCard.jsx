import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Subscribed with: ${email}`)
    setEmail('')
  }

  return (
    <footer className="bg-blue-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-blue-200 text-sm">
              Your one-stop shop for authentic sports jerseys from around the world. 
              Quality and affordability guaranteed.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-blue-200 text-sm mb-4">Subscribe to exclusive offers and news.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg flex-1 text-gray-800 text-sm"
              />
              <button 
                type="submit"
                className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-yellow-500 transition">📘</a>
              <a href="#" className="text-2xl hover:text-yellow-500 transition">🐦</a>
              <a href="#" className="text-2xl hover:text-yellow-500 transition">📸</a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-900 mt-8 pt-8 text-center text-sm text-blue-300">
          © 2025 Jersey Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}