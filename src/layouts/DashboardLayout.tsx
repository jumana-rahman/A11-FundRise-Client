import { useState } from 'react'
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome, FiCompass, FiList, FiShoppingCart, FiCreditCard, FiLogOut,
  FiPlusCircle, FiUsers, FiFlag, FiZap, FiBell, FiChevronDown,
  FiMenu, FiX, FiDownload, FiCheckSquare, FiDollarSign,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { mockNotifications } from '../data/mockData'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const supporterNav: NavItem[] = [
  { label: 'Home', path: '/dashboard/supporter-home', icon: <FiHome size={16} /> },
  { label: 'Explore Campaigns', path: '/dashboard/explore', icon: <FiCompass size={16} /> },
  { label: 'My Contributions', path: '/dashboard/my-contributions', icon: <FiList size={16} /> },
  { label: 'Purchase Credit', path: '/dashboard/purchase-credit', icon: <FiShoppingCart size={16} /> },
  { label: 'Payment History', path: '/dashboard/payment-history', icon: <FiCreditCard size={16} /> },
]

const creatorNav: NavItem[] = [
  { label: 'Home', path: '/dashboard/creator-home', icon: <FiHome size={16} /> },
  { label: 'Add New Campaign', path: '/dashboard/add-campaign', icon: <FiPlusCircle size={16} /> },
  { label: 'My Campaigns', path: '/dashboard/my-campaigns', icon: <FiList size={16} /> },
  { label: 'Withdrawals', path: '/dashboard/withdrawals', icon: <FiDownload size={16} /> },
  { label: 'Payment History', path: '/dashboard/creator-payment-history', icon: <FiCreditCard size={16} /> },
]

const adminNav: NavItem[] = [
  { label: 'Home', path: '/dashboard/admin-home', icon: <FiHome size={16} /> },
  { label: 'Manage Users', path: '/dashboard/manage-users', icon: <FiUsers size={16} /> },
  { label: 'Manage Campaigns', path: '/dashboard/manage-campaigns', icon: <FiCheckSquare size={16} /> },
  { label: 'Withdrawal Requests', path: '/dashboard/withdrawal-requests', icon: <FiDollarSign size={16} /> },
  { label: 'Reports', path: '/dashboard/reports', icon: <FiFlag size={16} /> },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  const navItems = user.role === 'supporter' ? supporterNav : user.role === 'creator' ? creatorNav : adminNav
  const notifications = mockNotifications.filter(n => n.toEmail === user.email)
  const unread = notifications.filter(n => !n.read).length

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  const roleColor = user.role === 'admin' ? '#ff6b6b' : user.role === 'creator' ? '#a78bfa' : '#00d4aa'

  const Sidebar = () => (
    <div style={{ width: 256, minHeight: '100vh', background: '#09090f', borderRight: '1px solid #1a1a28', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1a1a28' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiZap style={{ color: '#08080f' }} size={18} />
          </div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FundRise</span>
        </Link>
      </div>

      {/* User info */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1a1a28' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
          <img src={user.photoUrl} alt={user.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${roleColor}40` }} />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: '0.7rem', color: roleColor, textTransform: 'capitalize', fontWeight: 600 }}>{user.role}</div>
          </div>
        </div>
        <div style={{ background: '#13131e', border: `1px solid ${roleColor}25`, borderRadius: '0.5rem', padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiZap size={14} style={{ color: '#00d4aa' }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#00d4aa', fontSize: '0.9rem' }}>{user.credits}</span>
          <span style={{ fontSize: '0.75rem', color: '#5a5a78' }}>credits</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ fontSize: '0.7rem', color: '#3a3a55', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>Menu</div>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={() => setSidebarOpen(false)}>
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <div style={{ borderTop: '1px solid #1a1a28', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
          <Link to="/" className="sidebar-link" style={{ color: '#7070a0' }}>← Back to Site</Link>
          <button onClick={handleLogout} className="sidebar-link" style={{ color: '#ff6b6b' }}>
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </nav>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#08080f' }}>
      {/* Desktop sidebar */}
      <div style={{ display: 'none' }} className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: '#00000080', zIndex: 40 }} />
            <motion.div initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50 }}>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ background: '#09090f', borderBottom: '1px solid #1a1a28', padding: '0 1.5rem', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9090b0' }}>
              <FiMenu size={20} />
            </button>
            <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.9rem', color: '#7070a0' }}>Dashboard</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Credits pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#13131e', border: '1px solid #00d4aa25', borderRadius: 8, padding: '0.3rem 0.75rem' }}>
              <FiZap size={13} style={{ color: '#00d4aa' }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#00d4aa', fontSize: '0.82rem' }}>{user.credits}</span>
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifs(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7070a0', position: 'relative', display: 'flex', padding: 4 }}>
                <FiBell size={19} />
                {unread > 0 && <span style={{ position: 'absolute', top: 0, right: 0, background: '#ff6b6b', color: '#fff', width: 15, height: 15, borderRadius: '50%', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{unread}</span>}
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="notification-popup" onClick={() => setShowNotifs(false)}>
                    <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #1e1e30', fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem' }}>Notifications</div>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: '#5a5a78', fontSize: '0.85rem' }}>All caught up!</div>
                    ) : notifications.map(n => (
                      <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #16162a', background: n.read ? 'transparent' : '#00d4aa05' }}>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: n.read ? '#6060a0' : '#c0c0d8', lineHeight: 1.5 }}>{n.message}</p>
                        <span style={{ fontSize: '0.68rem', color: '#3a3a55' }}>{new Date(n.time).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User */}
            <img src={user.photoUrl} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${roleColor}40` }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowX: 'hidden' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-sidebar { display: block !important; }
        }
      `}</style>
    </div>
  )
}
