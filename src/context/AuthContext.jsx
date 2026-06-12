import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, authApi, profileApi } from '../utils/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUserRole = async (userId) => {
    if (!userId) {
      setUserRole(null)
      return
    }
    try {
      const { data } = await profileApi.getProfile(userId)
      setUserRole(data?.role || 'subscriber')
    } catch (err) {
      console.error('Error fetching role:', err)
      setUserRole('subscriber')
    }
  }

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const currentUser = session?.user || null
        setUser(currentUser)
        if (currentUser) {
          await fetchUserRole(currentUser.id)
        } else {
          setUserRole(null)
        }
      } catch (err) {
        console.error('Error checking user:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)
      if (currentUser) {
        await fetchUserRole(currentUser.id)
      } else {
        setUserRole(null)
      }
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
      if (data.user) {
        await fetchUserRole(data.user.id)
      }
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
      setUserRole(null)
      return { error: null }
    } catch (err) {
      const errorMsg = err.message || 'Logout failed'
      setError(errorMsg)
      return { error: errorMsg }
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { data, error } = await authApi.resetPasswordForEmail(email)
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Failed to send reset code'
      setError(errorMsg)
      return { data: null, error: errorMsg }
    }
  }

  const verifyResetOtp = async (email, token) => {
    try {
      setError(null)
      const { data, error } = await authApi.verifyOtp(email, token, 'recovery')
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Invalid or expired code'
      setError(errorMsg)
      return { data: null, error: errorMsg }
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      setError(null)
      const { data, error } = await authApi.updatePassword(newPassword)
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Failed to update password'
      setError(errorMsg)
      return { data: null, error: errorMsg }
    }
  }

  return (
    <AuthContext.Provider value={{ user, userRole, loading, error, register, login, logout, resetPassword, verifyResetOtp, updatePassword }}>
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
