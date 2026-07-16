import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBell, FiLogOut, FiUser, FiMenu, FiX, FiZap } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const notifRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    if (!user) return
    api.get<any[]>('/api/notifications')
      .then(res => setNotifications(Array.isArray(res) ? res : []))
      .catch(() => {})
  }, [user])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowMenu(false)
  }

  return (
    <nav style={{ background: '#09090f', borderBottom: '1px solid #1e1e30', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiZap style={{ color: '#08080f', width: 18, height: 18 }} />
          </div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FundRise</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hidden-mobile">
          <NavLink to="/explore" style={({ isActive }) => ({ color: isActive ? '#00d4aa' : '#9090b0', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'all 0.2s' })}>Explore Campaigns</NavLink>

          {!user ? (
            <>
              <Link to="/login" style={{ color: '#9090b0', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 1rem' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
              <a href="https://github.com/jumana-rahman/A11-FundRise-Client" target="_blank" rel="noreferrer" style={{ color: '#7070a0', textDecoration: 'none', fontSize: '0.8rem', padding: '0.4rem 0.8rem', border: '1px solid #2a2a40', borderRadius: '0.5rem' }}>Join as Dev</a>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ color: '#9090b0', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 1rem' }}>Dashboard</Link>

              <div style={{ background: '#1a1a2e', border: '1px solid #00d4aa30', borderRadius: 8, padding: '0.3rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FiZap style={{ color: '#00d4aa', width: 14, height: 14 }} />
                <span style={{ color: '#00d4aa', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{user.credits}</span>
              </div>

              <div ref={notifRef} style={{ position: 'relative' }}>
                <button onClick={() => setShowNotifs(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '0.4rem', color: '#9090b0', display: 'flex' }}>
                  <FiBell style={{ width: 20, height: 20 }} />
                  {unreadCount > 0 && (
                    <span style={{ position: 'absolute', top: 0, right: 0, background: '#ff6b6b', color: '#fff', width: 16, height: 16, borderRadius: '50%', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{unreadCount}</span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifs && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="notification-popup">
                      <div style={{ padding: '1rem', borderBottom: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem' }}>Notifications</span>
                        {unreadCount > 0 && <span style={{ background: '#ff6b6b20', color: '#ff6b6b', borderRadius: 99, fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>{unreadCount} new</span>}
                      </div>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#7070a0', fontSize: '0.85rem' }}>No notifications yet</div>
                      ) : notifications.slice(0, 8).map((n: any) => (
                        <div key={n._id} style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #1a1a28', background: n.read ? 'transparent' : '#00d4aa05' }}>
                          <p style={{ fontSize: '0.8rem', color: n.read ? '#7070a0' : '#c8c8d8', lineHeight: 1.5, margin: 0 }}>{n.message}</p>
                          <span style={{ fontSize: '0.7rem', color: '#4a4a65', marginTop: '0.25rem', display: 'block' }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowMenu(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={user.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} alt={user.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00d4aa30' }} />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#13131e', border: '1px solid #1e1e30', borderRadius: '0.75rem', padding: '0.5rem', minWidth: 180, boxShadow: '0 20px 40px #00000060' }}>
                      <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #1e1e30', marginBottom: '0.25rem' }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{user.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#7070a0' }}>{user.role}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setShowMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', color: '#9090b0', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a2e')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}><FiUser size={14} /> Dashboard</Link>
                      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', width: '100%', transition: 'all 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = '#ff6b6b15')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}><FiLogOut size={14} /> Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="https://github.com/jumana-rahman/A11-FundRise-Client" target="_blank" rel="noreferrer" style={{ color: '#7070a0', textDecoration: 'none', fontSize: '0.8rem', padding: '0.4rem 0.8rem', border: '1px solid #2a2a40', borderRadius: '0.5rem' }}>Join as Dev</a>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9090b0', display: 'none' }} className="mobile-menu-btn">
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ borderTop: '1px solid #1e1e30', background: '#09090f', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/explore" onClick={() => setMobileOpen(false)} style={{ color: '#9090b0', textDecoration: 'none', padding: '0.5rem 0', fontSize: '0.875rem' }}>Explore Campaigns</Link>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} style={{ color: '#9090b0', textDecoration: 'none', padding: '0.5rem 0', fontSize: '0.875rem' }}>Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} style={{ color: '#00d4aa', textDecoration: 'none', padding: '0.5rem 0', fontSize: '0.875rem' }}>Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} style={{ color: '#9090b0', textDecoration: 'none', padding: '0.5rem 0', fontSize: '0.875rem' }}>Dashboard</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', textAlign: 'left', padding: '0.5rem 0', fontSize: '0.875rem' }}>Logout</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
