import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const authApi = {
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Portfolio functions
export const portfolioApi = {
  getProjects: async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  addProject: async (project) => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert([project])
    return { data, error }
  }
}

// Contact functions
export const contactApi = {
  submitContact: async (contactData) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contactData])
    return { data, error }
  }
}

// Media functions
export const mediaApi = {
  getMedia: async () => {
    const { data, error } = await supabase
      .from('media_gallery')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  }
}
