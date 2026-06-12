import { motion } from 'framer-motion'
import { FaBook, FaVideo, FaFileAlt, FaCode } from 'react-icons/fa'
import SEO from '../components/SEO'
import styles from './Resources.module.css'

export default function Resources() {
  const resources = [
    {
      id: 1,
      icon: FaBook,
      title: 'Web Development Guide',
      description: 'Comprehensive guide to modern web development practices',
      type: 'Guide',
      color: '#0066ff'
    },
    {
      id: 2,
      icon: FaVideo,
      title: 'React Essentials',
      description: 'Video tutorials covering React fundamentals and advanced concepts',
      type: 'Video',
      color: '#00d4ff'
    },
    {
      id: 3,
      icon: FaCode,
      title: 'Code Snippets Library',
      description: 'Reusable code snippets and templates for common tasks',
      type: 'Code',
      color: '#ff006e'
    },
    {
      id: 4,
      icon: FaFileAlt,
      title: 'API Documentation',
      description: 'Detailed API documentation and integration examples',
      type: 'Documentation',
      color: '#ffa500'
    },
    {
      id: 5,
      icon: FaVideo,
      title: 'Mobile Development Tutorial',
      description: 'Step-by-step guide to building mobile applications',
      type: 'Video',
      color: '#00d084'
    },
    {
      id: 6,
      icon: FaBook,
      title: 'Best Practices E-book',
      description: 'Industry best practices and coding standards',
      type: 'E-book',
      color: '#0066ff'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className={styles.resources}>
      <SEO 
        title="Resources" 
        description="Access helpful resources, learning materials, and tutorials provided by Pearl Waves."
        url="/resources"
      />
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
            Resources & Learning
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore our curated collection of guides, tutorials, and documentation
          </motion.p>
        </div>
      </motion.section>

      <section className={styles.resourcesSection}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.resourcesGrid}
          >
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="card"
              >
                <div
                  className={styles.resourceIcon}
                  style={{ color: resource.color }}
                >
                  <resource.icon />
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className={styles.footer}>
                  <span className={styles.type}>{resource.type}</span>
                  <motion.button
                    className="btn btn-primary btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Access →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.newsletter}
      >
        <div className="container text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Stay Updated
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter for the latest tips and resources
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className={styles.newsletter_form}
          >
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
