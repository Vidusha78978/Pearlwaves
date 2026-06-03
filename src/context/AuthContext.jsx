import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, authApi } from '../utils/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (err) {
        console.error('Error checking user:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const register = async (email, password, fullName) => {
    try {
      setError(null)
      const { data, error: signUpError } = await authApi.signUp(email, password, { fullName })
      if (signUpError) throw signUpError
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Registration failed'
      setError(errorMsg)
      return { data: null, error: errorMsg }
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const { data, error: signInError } = await authApi.signIn(email, password)
      if (signInError) throw signInError
      setUser(data.user)
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      return { data: null, error: errorMsg }
    }
  }

  const logout = async () => {
    try {
      setError(null)
      const { error: signOutError } = await authApi.signOut()
      if (signOutError) throw signOutError
      setUser(null)
      return { error: null }
    } catch (err) {
      const errorMsg = err.message || 'Logout failed'
      setError(errorMsg)
      return { error: errorMsg }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
