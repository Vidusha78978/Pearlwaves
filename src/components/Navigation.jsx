import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Media', path: '/media' },
    { label: 'Resources', path: '/resources' },
  ]

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
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <span>Pearl Waves</span>
        </Link>

        <ul className={`${styles.menu} ${mobileOpen ? styles.active : ''}`}>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setMobileOpen(false)}
            >
              <Link to={item.path} className={styles.menuLink}>
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className={styles.authButtons}>
          <Link to="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
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
