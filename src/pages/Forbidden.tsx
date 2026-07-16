import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShieldOff, FiArrowLeft, FiHome } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

/**
 * Forbidden (403) Page
 * Shown when an authenticated user tries to access a page their role doesn't allow.
 * For example: a supporter trying to access admin pages, or an admin trying to
 * access creator-only features.
 *
 * If the user has a different role, it suggests the correct dashboard.
 */
export default function Forbidden() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Determine where the user should go based on their role
  const getDashboardPath = () => {
    if (!user) return '/login'
    if (user.role === 'admin') return '/dashboard/admin-home'
    if (user.role === 'creator') return '/dashboard/creator-home'
    return '/dashboard/supporter-home'
  }

  const getRoleLabel = () => {
    if (!user) return ''
    if (user.role === 'admin') return 'Admin'
    if (user.role === 'creator') return 'Creator'
    return 'Supporter'
  }

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
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffd93d20, #ffd93d08)',
            border: '2px solid #ffd93d40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <FiShieldOff size={40} style={{ color: '#ffd93d' }} />
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
            color: '#ffd93d',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Error 403
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
          Access Forbidden
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
            marginBottom: '1rem',
          }}
        >
          You don't have permission to access this page. Your current role (
          <span style={{ color: '#ffd93d', fontWeight: 600 }}> {getRoleLabel()} </span>
          ) is not authorized for this section.
        </motion.p>

        {/* Role badge hint */}
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{
              display: 'inline-block',
              background: '#13131e',
              border: '1px solid #1e1e30',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              marginBottom: '2rem',
              fontSize: '0.85rem',
              color: '#9090b0',
            }}
          >
            Signed in as{' '}
            <span style={{ color: '#00d4aa', fontWeight: 600 }}>{user.email}</span>
            {' '}({getRoleLabel()})
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => navigate(getDashboardPath())}
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
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'opacity 0.2s, transform 0.1s',
            }}
          >
            <FiHome size={16} />
            Go to My Dashboard
          </button>

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
