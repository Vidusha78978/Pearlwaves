import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: '🛍️',
      description: 'Full-featured e-commerce platform with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: '💳',
      description: 'Secure mobile banking application for iOS and Android',
      tech: ['React Native', 'Firebase', 'Security']
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'web',
      image: '📊',
      description: 'Real-time analytics dashboard with data visualization',
      tech: ['React', 'D3.js', 'Python', 'PostgreSQL']
    },
    {
      id: 4,
      title: 'Social Media App',
      category: 'mobile',
      image: '📱',
      description: 'Cross-platform social networking application',
      tech: ['Flutter', 'Firebase', 'Real-time DB']
    },
    {
      id: 5,
      title: 'CRM Software',
      category: 'software',
      image: '👥',
      description: 'Enterprise CRM system with advanced features',
      tech: ['Vue.js', 'Python', 'PostgreSQL', 'Docker']
    },
    {
      id: 6,
      title: 'Content Management System',
      category: 'web',
      image: '📝',
      description: 'WordPress-based CMS with custom plugins',
      tech: ['WordPress', 'PHP', 'MySQL', 'JavaScript']
    },
    {
      id: 7,
      title: 'Fitness Tracking App',
      category: 'mobile',
      image: '💪',
      description: 'Health and fitness tracking application',
      tech: ['React Native', 'HealthKit', 'Cloud API']
    },
    {
      id: 8,
      title: 'AI Chatbot Solution',
      category: 'software',
      image: '🤖',
      description: 'Intelligent chatbot powered by AI/ML',
      tech: ['Python', 'NLP', 'WebSocket', 'React']
    }
  ]

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'software', label: 'Software' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className={styles.portfolio}>
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
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Showcasing our best work and successful client projects
          </motion.p>
        </div>
      </motion.section>

      <section className={styles.portfolioSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={styles.filterButtons}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                className={`btn ${filter === cat.value ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setFilter(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className={styles.projectsGrid}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="card"
              >
                <div className={styles.projectImage}>{project.image}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.tech}>
                  {project.tech.map((t, idx) => (
                    <span key={idx} className={styles.techTag}>{t}</span>
                  ))}
                </div>
                <motion.button
                  className="btn btn-primary btn-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginTop: '1rem' }}
                >
                  View Project
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
