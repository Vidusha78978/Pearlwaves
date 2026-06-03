import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaMobileAlt, FaCloud, FaBug, FaShieldAlt } from 'react-icons/fa'
import styles from './Services.module.css'

export default function Services() {
  const serviceDetails = [
    {
      id: 1,
      icon: FaCode,
      title: 'Web Development',
      subtitle: 'HTML, CSS, React & WordPress',
      description: 'Creating responsive, modern websites with cutting-edge technologies. From static sites to dynamic web applications, we deliver solutions that engage users and drive results.',
      features: ['Responsive Design', 'SEO Optimized', 'Performance Focused', 'Modern Stack', 'Mobile First', 'Accessibility']
    },
    {
      id: 2,
      icon: FaDatabase,
      title: 'Software Development',
      subtitle: 'Full-Stack Solutions',
      description: 'Custom software solutions tailored to your business needs. We leverage the latest technologies and best practices to build scalable, maintainable systems.',
      features: ['Architecture Design', 'Database Optimization', 'API Development', 'Integration', 'Security', 'Testing']
    },
    {
      id: 3,
      icon: FaMobileAlt,
      title: 'Mobile App Development',
      subtitle: 'iOS & Android Solutions',
      description: 'Native and cross-platform mobile applications that provide exceptional user experiences. From concept to deployment, we handle every step.',
      features: ['Native Development', 'Cross-Platform', 'UI/UX Design', 'Performance', 'App Store Deployment', 'Maintenance']
    },
    {
      id: 4,
      icon: FaCloud,
      title: 'Web Applications',
      subtitle: 'Progressive Web Apps',
      description: 'Progressive web applications that work seamlessly across devices. Fast, reliable, and engaging - PWAs that bridge web and mobile.',
      features: ['Offline Support', 'Real-time Updates', 'Push Notifications', 'App-like Experience', 'Fast Loading', 'Installable']
    },
    {
      id: 5,
      icon: FaBug,
      title: 'Quality Assurance',
      subtitle: 'Testing & Debugging',
      description: 'Comprehensive testing and quality assurance to ensure your products meet the highest standards of performance and reliability.',
      features: ['Manual Testing', 'Automated Testing', 'Performance Testing', 'Security Testing', 'Bug Fixing', 'Documentation']
    },
    {
      id: 6,
      icon: FaShieldAlt,
      title: 'Security & Maintenance',
      subtitle: 'Long-term Support',
      description: 'Ongoing support, security updates, and maintenance to keep your applications running smoothly and securely.',
      features: ['Security Audits', 'Updates & Patches', '24/7 Monitoring', 'Backup Solutions', 'Performance Optimization', 'Support']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className={styles.services}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={styles.hero}
      >
        <div className="container">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Comprehensive digital solutions designed to transform your business
          </motion.p>
        </div>
      </motion.section>

      <section className={styles.servicesSection}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.servicesGrid}
          >
            {serviceDetails.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`card ${styles.serviceCard}`}
              >
                <div className={styles.serviceIcon}>
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p className={styles.subtitle}>{service.subtitle}</p>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.features}>
                  {service.features.map((feature, idx) => (
                    <span key={idx} className={styles.featureTag}>
                      {feature}
                    </span>
                  ))}
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
        className={styles.cta}
      >
        <div className="container text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Let's Bring Your Ideas to Life
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contact our team to discuss your project requirements
          </motion.p>
          <motion.a
            href="/contact"
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </div>
      </motion.section>
    </div>
  )
}
