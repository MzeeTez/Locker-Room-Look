import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Settings, LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStore } from '../store'

export default function Profile() {
  const user = useStore(state => state.user)
  // Get the real signOut function from the store
  const signOut = useStore(state => state.signOut) 
  const setUser = useStore(state => state.setUser) // Keep setUser for profile updates
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState({
    // Use user metadata if available, otherwise fallback
    fullName: user?.user_metadata?.full_name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    birthdate: '1990-01-01'
  })

  const [isEditing, setIsEditing] = useState(false)

  // Navigation side effect is correct
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // In a real app, you'd send this to your backend API or Supabase user update
    setUser({ ...user, user_metadata: { ...user.user_metadata, full_name: profileData.fullName }, email: profileData.email })
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    // Use the correct signOut function
    signOut()
    // No need to navigate, the useEffect will catch the user change
  }

  // Don't render anything if the user is not logged in (avoids flicker)
  if (!user) {
    return null
  }

  // Mock data for orders
  const orders = [
    { id: '1001', date: '2025-01-15', total: 120.00, status: 'Delivered', items: 2 },
    { id: '1002', date: '2025-01-20', total: 75.50, status: 'Shipped', items: 1 },
    { id: '1003', date: '2025-01-25', total: 200.00, status: 'Processing', items: 3 }
  ]

  // Helper to get user initials
  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="text-center pb-4 border-b">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-3">
                  {getInitials(profileData.fullName)}
                </div>
                <h3 className="font-bold text-gray-800">{profileData.fullName}</h3>
                <p className="text-sm text-gray-600 break-words">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-lg font-semibold">
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                  <Package className="w-5 h-5" />
                  Orders
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="mt-4 sm:mt-0 px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-semibold text-sm"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* --- START OF CORRECTED SECTION --- */}
<div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2 text-gray-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email" 
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2 text-gray-500" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"  
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2 text-gray-500" />
                    Birthdate
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    value={profileData.birthdate}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-gray-500" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                {/* --- END OF CORRECTED SECTION --- */}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 p-6 sm:p-8 border-b border-gray-200">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 hover:text-blue-900 cursor-pointer">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.items}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-800">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}