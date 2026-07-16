import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiArrowLeft, FiSearch } from 'react-icons/fi'

/**
 * Not Found (404) Page
 * Shown when the user navigates to a URL that doesn't match any route.
 * Displays a fun animated 404 page with a link back to home.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08080f',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: '480px' }}
      >
        {/* Big 404 number with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
          style={{ position: 'relative', marginBottom: '1rem' }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '8rem',
              fontWeight: 900,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #00d4aa30, #00a8ff30)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>

          {/* Floating icon inside the number */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1a2e, #13131e)',
                border: '1px solid #1e1e30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiMapPin size={28} style={{ color: '#00d4aa' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Status code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#00d4aa',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Page Not Found
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2rem',
            fontWeight: 800,
            color: '#e8e8f0',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          Lost in the Void
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '1rem',
            color: '#7070a0',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
          Double-check the URL or head back to find what you need.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/explore"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #00d4aa, #00a8ff)',
              color: '#08080f',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              padding: '0.75rem 1.75rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'opacity 0.2s, transform 0.1s',
            }}
          >
            <FiSearch size={16} />
            Explore Campaigns
          </Link>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: '#00d4aa',
              border: '1px solid #00d4aa',
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              padding: '0.7rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
          >
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
