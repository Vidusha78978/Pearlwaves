import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Media.module.css'

export default function Media() {
  const { userRole, loading } = useAuth()

  const mediaItems = [
    { id: 1, type: 'image', title: 'Project Showcase 1', emoji: '🖼️' },
    { id: 2, type: 'image', title: 'Team Meeting', emoji: '👥' },
    { id: 3, type: 'image', title: 'Office Space', emoji: '🏢' },
    { id: 4, type: 'image', title: 'Client Presentation', emoji: '📊' },
    { id: 5, type: 'video', title: 'Product Demo', emoji: '🎬' },
    { id: 6, type: 'image', title: 'Team Building', emoji: '🎉' },
    { id: 7, type: 'image', title: 'Code Review', emoji: '💻' },
    { id: 8, type: 'video', title: 'Tutorial Video', emoji: '📹' }
  ]

  if (loading) return null;
  if (userRole !== 'developer') return <Navigate to="/" replace />;

  return (
    <div className={styles.media}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.hero}
      >
        <div className="container text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Media Gallery
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Behind the scenes and project highlights
          </motion.p>
        </div>
      </motion.section>

      <section className={styles.gallerySection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className={styles.gallery}
          >
            {mediaItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className={styles.galleryItem}
              >
                <div className={styles.itemContent}>
                  <span className={styles.emoji}>{item.emoji}</span>
                  {item.type === 'video' && <span className={styles.badge}>Video</span>}
                </div>
                <p>{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
