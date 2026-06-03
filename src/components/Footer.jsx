import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Web Development', path: '/services' },
        { label: 'Software Development', path: '/services' },
        { label: 'Mobile Apps', path: '/services' },
        { label: 'Web Apps', path: '/services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Blog', path: '/resources' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' }
      ]
    }
  ]

  const socialIcons = [
    { icon: FaFacebook, link: '#' },
    { icon: FaTwitter, link: '#' },
    { icon: FaLinkedin, link: '#' },
    { icon: FaInstagram, link: '#' },
    { icon: FaGithub, link: '#' }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={styles.footer}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.section}
          >
            <div className={styles.branding}>
              <img src="/logo.jpg" alt="Pearl Waves Logo" className={styles.brandingLogo} />
              <h3>Pearl Waves</h3>
              <p>Creating digital excellence through innovative web and software solutions.</p>
              <div className={styles.socials}>
                {socialIcons.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    className={styles.socialIcon}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * (index + 2) }}
              viewport={{ once: true }}
              className={styles.section}
            >
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className={styles.divider}
        />

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Pearl Waves. All rights reserved.</p>
          <p>Crafted with ❤️ for digital excellence</p>
        </div>
      </div>
    </motion.footer>
  )
}
