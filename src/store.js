import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from './supabaseClient'

export const useStore = create(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      cart: [],
      loading: false,
      user: null,

      // Fetch products from Supabase
      fetchProducts: async () => {
        set({ loading: true })
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
          if (error) throw error
          if (data) set({ products: data })
        } catch (error) {
          console.error('Error fetching products:', error.message)
        } finally {
          set({ loading: false })
        }
      },

      // Fetch categories from Supabase
      fetchCategories: async () => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('*')
          if (error) throw error
          if (data) set({ categories: data })
        } catch (error) {
          console.error('Error fetching categories:', error.message)
        }
      },

      // --- PROPER CART LOGIC (ID-based) ---

      // Add to cart
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          // Item exists, update quantity
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            )
          })
        } else {
          // New item, add to cart
          set({ cart: [...cart, { ...product, quantity: product.quantity || 1 }] })
        }
      },

      // Remove from cart
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },

      // Update quantity
      updateQuantity: (productId, quantity) => {
        const newQuantity = Math.max(0, quantity)

        if (newQuantity === 0) {
          // Remove item if quantity is 0
          get().removeFromCart(productId)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
            )
          })
        }
      },

      // Get cart total
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      // Clear cart
      clearCart: () => set({ cart: [] }),

      // --- AUTH ---

      // Set user
      setUser: (user) => set({ user }),

      // Sign up with Supabase
      signUp: async (email, password, fullName) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName
              }
            }
          })
          if (error) throw error
          if (data.user) {
            set({ user: data.user })
            return { success: true, user: data.user }
          }
          return { success: false, error: { message: 'Signup failed.'} }
        } catch (error) {
          console.error('Sign up error:', error.message)
          return { success: false, error }
        }
      },

      // Sign in with Supabase
      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          if (error) throw error
          if (data.user) {
            set({ user: data.user })
            return { success: true, user: data.user }
          }
          return { success: false, error: { message: 'Sign in failed.' } }
        } catch (error) {
          console.error('Sign in error:', error.message)
          return { success: false, error }
        }
      },

      // Sign out
      signOut: async () => {
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          set({ user: null, cart: [] }) // Clear user and cart on sign out
        } catch (error) {
          console.error('Sign out error:', error.message)
        }
      },

      // Check session
      checkSession: async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession()
          if (error) throw error
          if (session?.user) {
            set({ user: session.user })
          } else {
            set({ user: null })
          }
        } catch (error) {
          console.error('Session check error:', error.message)
          set({ user: null })
        }
      }
    }),
    {
      name: 'jersey-shop-storage',
      // Persist only the cart and user
      partialize: (state) => ({ 
        cart: state.cart,
        user: state.user 
      })
    }
  )
)
