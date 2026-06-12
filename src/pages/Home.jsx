import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCode, FaMobileAlt, FaRocket, FaPalette, FaLaptopCode, FaPenNib, FaWhatsapp } from 'react-icons/fa'
import styles from './Home.module.css'
import SEO from '../components/SEO'

export default function Home() {
  const services = [
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Modern, responsive websites built with React, HTML5, CSS3, and WordPress'
    },
    {
      icon: FaRocket,
      title: 'Software Development',
      description: 'Scalable solutions crafted with cutting-edge technologies and best practices'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: FaPalette,
      title: 'Web Apps',
      description: 'Progressive web applications with rich user interfaces and real-time features'
    }
  ]

  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className={styles.home}>
      <SEO 
        title="Home"
        description="Pearl Waves - Modern Web Development, Software Development, Mobile App & Web App Solutions for your business."
        url="/"
      />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={styles.hero}
      >
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={styles.heroText}
            >
              <h1>Welcome to Pearl Waves</h1>
              <p>
                We craft stunning digital experiences through innovative web development, 
                powerful software solutions, and cutting-edge mobile applications.
              </p>
              <div className={styles.heroButtons}>
                <Link to="/services" className="btn btn-primary btn-lg">
                  Explore Services
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  Get Started
                </Link>
              </div>
            </motion.div>

            <div className={styles.heroVisual}>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={styles.heroEmoji}
              >
                🌊
              </motion.div>

              <motion.div 
                className={`${styles.floatingTag} ${styles.tag1}`}
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                title="Web Design"
              >
                <FaLaptopCode size={30} />
              </motion.div>
              
              <motion.div 
                className={`${styles.floatingTag} ${styles.tag2}`}
                animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                title="Graphic Design"
              >
                <FaPenNib size={30} />
              </motion.div>

              <motion.div 
                className={`${styles.floatingTag} ${styles.tag3}`}
                animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                title="Software Development"
              >
                <FaCode size={30} />
              </motion.div>

              <motion.div 
                className={`${styles.floatingTag} ${styles.tag4}`}
                animate={{ y: [0, 15, 0], x: [0, 15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                title="Mobile App Development"
              >
                <FaMobileAlt size={30} />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className={styles.scrollIndicator}
        >
          ↓ Scroll to explore
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.stats}
      >
        <div className={styles.container}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.statsGrid}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className={styles.statCard}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.services}
      >
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={styles.sectionHeader}
          >
            <h2>Our Services</h2>
            <p>Comprehensive digital solutions tailored to your business needs</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.servicesGrid}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card"
              >
                <div className={styles.serviceIcon}>
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                  <Link to="/services" className={styles.learnMore}>
                    Learn More →
                  </Link>
                  <a 
                    href={`https://wa.me/94760411245?text=${encodeURIComponent(`Hello! I would like to start the ${service.title} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <FaWhatsapp /> Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className={styles.ctaSection}
          >
            <h3>Ready to transform your business?</h3>
            <p>Let's create something amazing together</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
