import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiArrowLeft, FiLogIn } from 'react-icons/fi'

/**
 * Unauthorized (401) Page
 * Shown when an unauthenticated user tries to access a protected route.
 * Tells the user they need to log in and provides a link to the login page.
 */
export default function Unauthorized() {
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
        style={{
          textAlign: 'center',
          maxWidth: '480px',
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b6b20, #ff6b6b08)',
            border: '2px solid #ff6b6b40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <FiLock size={40} style={{ color: '#ff6b6b' }} />
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
            color: '#ff6b6b',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Error 401
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#e8e8f0',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          Authentication Required
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
          You need to be signed in to access this page. Please log in to your
          account or create a new one to get started.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/login"
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
            <FiLogIn size={16} />
            Sign In
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
