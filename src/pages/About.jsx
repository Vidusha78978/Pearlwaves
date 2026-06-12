import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaHandshake, FaTrophy, FaLaptopCode } from 'react-icons/fa'
import styles from './About.module.css'
import SEO from '../components/SEO'

export default function About() {
  const coreValues = [
    {
      icon: FaLightbulb,
      title: 'Innovative Solutions',
      description: 'We leverage cutting-edge technologies to build progressive web applications and custom software tailored to your specific business needs.'
    },
    {
      icon: FaLaptopCode,
      title: 'Digital Excellence',
      description: 'From responsive website design to robust backend architecture, our web development services ensure unparalleled digital experiences.'
    },
    {
      icon: FaHandshake,
      title: 'Client-Centric Approach',
      description: 'We partner closely with our clients, providing transparent communication and dedicated support throughout the entire software development lifecycle.'
    },
    {
      icon: FaTrophy,
      title: 'Award-Winning Quality',
      description: 'Our mobile app developers and QA engineers adhere to the highest industry standards, delivering scalable, secure, and bug-free solutions.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={styles.hero}
      >
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.heroContent}
          >
            <h1>About <span className={styles.highlight}>Pearl Waves</span></h1>
            <p className={styles.subtitle}>
              Your Trusted Partner for Custom Software and Web Development Services
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.missionContent}
          >
            <h2>Our Mission to Drive Digital Transformation</h2>
            <p>
              At Pearl Waves, our mission is to empower businesses with high-performance <strong>custom software solutions</strong>, 
              <strong> responsive web applications</strong>, and <strong>native mobile apps</strong>. We bridge the gap between 
              visionary ideas and technological execution. By focusing on scalable architectures, SEO-optimized front-end 
              designs, and robust security, we ensure that our digital products not only look stunning but rank high and perform flawlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Why Choose Us */}
      <section className={styles.valuesSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={styles.sectionHeader}
          >
            <h2>Why Choose Pearl Waves?</h2>
            <p>Delivering measurable results through expert technology consulting and engineering.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.valuesGrid}
          >
            {coreValues.map((value, index) => (
              <motion.article key={index} variants={itemVariants} className={`card ${styles.valueCard}`}>
                <div className={styles.iconWrapper}>
                  <value.icon />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.ctaSection}
      >
        <div className="container text-center">
          <h2>Ready to Scale Your Business?</h2>
          <p>Let's collaborate to build scalable, SEO-friendly digital platforms.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Schedule a Free Consultation
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}