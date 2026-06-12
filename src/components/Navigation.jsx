import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, userRole, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    ...(userRole === 'developer' ? [{ label: 'Media', path: '/media' }] : []),
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ]

  const handleLogout = async () => {
    const { error } = await logout()
    if (!error) {
      setProfileOpen(false)
      navigate('/')
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.navbar}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <motion.img
            src="/logo.jpg"
            alt="Pearl Waves Logo"
            className={styles.logoIcon}
          />
          <span>Pearl Waves</span>
        </Link>

        <ul className={`${styles.menu} ${mobileOpen ? styles.active : ''}`}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setMobileOpen(false)}
              >
                <Link 
                  to={item.path} 
                  className={`${styles.menuLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {item.label}
                </Link>
              </motion.li>
            )
          })}
        </ul>

        <div className={styles.authButtons}>
          {user ? (
            <div className={styles.userMenu}>
              <motion.button
                className={styles.userBtn}
                onClick={() => setProfileOpen(!profileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser className={styles.authIcon} /> <span className={styles.authText}>{user.email?.split('@')[0]}</span>
              </motion.button>
              
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.profileDropdown}
                >
                  <div className={styles.profileHeader}>
                    <p><strong>Logged in as:</strong></p>
                    <p>{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem', textDecoration: 'none' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    <FaUser style={{ marginRight: '0.5rem' }} /> View Profile
                  </Link>
                  <motion.button
                    className="btn btn-secondary btn-sm"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%' }}
                  >
                    <FaSignOutAlt /> Logout
                  </motion.button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={`btn btn-secondary btn-sm ${styles.authBtn}`}>
                <FaSignInAlt className={styles.authIcon} />
                <span className={styles.authText}>Login</span>
              </Link>
              <Link to="/register" className={`btn btn-primary btn-sm ${styles.authBtn}`}>
                <FaUserPlus className={styles.authIcon} />
                <span className={styles.authText}>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.nav>
  )
}
