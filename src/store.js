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
          if (!error) set({ products: data })
        } catch (error) {
          console.error('Error fetching products:', error)
        }
        set({ loading: false })
      },

      // Fetch categories from Supabase
      fetchCategories: async () => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('*')
          if (!error) set({ categories: data })
        } catch (error) {
          console.error('Error fetching categories:', error)
        }
      },

      // Add to cart
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id && item.size === product.size)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            )
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: product.quantity || 1 }] })
        }
      },

      // Remove from cart
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },

      // Update quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
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
          if (!error && data.user) {
            set({ user: data.user })
            return { success: true, user: data.user }
          }
          return { success: false, error }
        } catch (error) {
          console.error('Sign up error:', error)
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
          if (!error && data.user) {
            set({ user: data.user })
            return { success: true, user: data.user }
          }
          return { success: false, error }
        } catch (error) {
          console.error('Sign in error:', error)
          return { success: false, error }
        }
      },

      // Sign out
      signOut: async () => {
        try {
          await supabase.auth.signOut()
          set({ user: null, cart: [] })
        } catch (error) {
          console.error('Sign out error:', error)
        }
      },

      // Check session
      checkSession: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            set({ user: session.user })
          }
        } catch (error) {
          console.error('Session check error:', error)
        }
      }
    }),
    {
      name: 'jersey-shop-storage',
      partialize: (state) => ({ 
        cart: state.cart,
        user: state.user 
      })
    }
  )
)