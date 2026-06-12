import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { profileApi } from '../utils/supabaseClient'
import SEO from '../components/SEO'
import styles from './Profile.module.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Load user profile on mount
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const loadProfile = async () => {
      try {
        const { data, error: profileError } = await profileApi.getProfile(user.id)
        if (profileError) throw profileError

        if (data) {
          setFormData({
            fullName: data.full_name || '',
            email: data.email || user.email,
            phone: data.phone || '',
            location: data.location || '',
            bio: data.bio || ''
          })
        } else {
          setFormData(prev => ({
            ...prev,
            email: user.email
          }))
        }
      } catch (err) {
        console.error('Error loading profile:', err)
        setFormData(prev => ({
          ...prev,
          email: user.email
        }))
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return
    }

    setSaving(true)

    try {
      const updateData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio
      }

      const { error: updateError } = await profileApi.updateProfile(user.id, updateData)
      if (updateError) throw updateError

      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.loadingSpinner}
        >
          Loading profile...
        </motion.div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <SEO 
        title="My Profile" 
        description="Manage your Pearl Waves account profile securely." 
        robots="noindex, nofollow"
        url="/profile"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.profileCard}
      >
        <div className={styles.header}>
          <h1>My Profile</h1>
          <button
            className={styles.closeBtn}
            onClick={() => navigate('/')}
          >
            ✕
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.errorMessage}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.successMessage}
          >
            ✓ {success}
          </motion.div>
        )}

        {!isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.profileDisplay}
          >
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Full Name</label>
                <p>{formData.fullName || 'Not set'}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <p>{formData.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone</label>
                <p>{formData.phone || 'Not set'}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Location</label>
                <p>{formData.location || 'Not set'}</p>
              </div>
              <div className={styles.infoItemFull}>
                <label>Bio</label>
                <p>{formData.bio || 'No bio added'}</p>
              </div>

              <div className={styles.memberSince}>
                <label>Member Since</label>
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <motion.button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className={styles.profileForm}
          >
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                placeholder="your@email.com"
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className={styles.formButtonGroup}>
              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
                disabled={saving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  )
}
