import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function ResetPassword() {
  const [step, setStep] = useState(1) // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { resetPassword, verifyResetOtp, updatePassword } = useAuth()

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email')
      return
    }
    setError('')
    setLoading(true)

    try {
      const { error: resetError } = await resetPassword(email)
      if (resetError) throw new Error(resetError)
      setStep(2)
    } catch (err) {
      setError(err.message || 'Failed to send reset code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    if (!code) {
      setError('Please enter the verification code')
      return
    }
    setError('')
    setLoading(true)

    try {
      const { error: verifyError } = await verifyResetOtp(email, code)
      if (verifyError) throw new Error(verifyError)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Invalid or expired code.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    setError('')
    setLoading(true)

    try {
      const { error: updateError } = await updatePassword(password)
      if (updateError) throw new Error(updateError)
      navigate('/login', { state: { message: 'Password updated successfully. Please log in.' } })
    } catch (err) {
      setError(err.message || 'Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.authForm}
      >
        <div className={styles.header}>
          <h1>Reset Password</h1>
          <p>
            {step === 1 && 'Enter your email to receive a recovery code'}
            {step === 2 && 'Enter the 6-digit code sent to your email'}
            {step === 3 && 'Enter your new password'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendCode} className={styles.form}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending Code...' : 'Send Recovery Code'}
            </motion.button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className={styles.form}>
            <div className="form-group">
              <label htmlFor="code">Verification Code</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </motion.button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStep(1)}>Go Back</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleUpdatePassword} className={styles.form}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </motion.button>
          </form>
        )}

        <p className={styles.footer}>
          Remember your password? <Link to="/login">Sign in here</Link>
        </p>
      </motion.div>
    </div>
  )
}
